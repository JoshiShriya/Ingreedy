// 1. Install dependencies: 
//    npm install express cors openai dotenv

require('dotenv').config();  // For securely loading the .env file
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

// 2. Configure your OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

// 3. Create a POST endpoint for generating recipes
app.post('/generateRecipes', async (req, res) => {
  try {
    // Inventory items from the client
    const { inventory } = req.body; 
    if (!inventory || !Array.isArray(inventory)) {
      return res.status(400).json({ error: 'Invalid inventory array.' });
    }

    // Create a prompt for ChatGPT
    const prompt = `
      I have the following ingredients in my pantry: ${inventory.join(', ')}.
      Please give me 5 recipe ideas that use these items. 
      Provide the name of each recipe plus a short description.
    `;

    // Call ChatGPT (gpt-3.5-turbo or gpt-4, depending on your plan)
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract the generated text
    const generatedText = completion.data.choices[0].message.content;
    // For convenience, just return the entire text block. 
    // Or parse it if you want to do more structured data.
    res.json({ recipes: generatedText });
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({ error: 'Error generating recipes' });
  }
});

// 4. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
