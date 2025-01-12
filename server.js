import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/generateRecipes", async (req, res) => {
    try {
        const { inventory, mealType, skillLevel } = req.body;

        if (!inventory || !Array.isArray(inventory)) {
            return res.status(400).json({ error: "Invalid inventory array." });
        }

        if (!mealType) {
            return res.status(400).json({ error: "Meal type is required." });
        }

        const prompt = `
        I have the following ingredients in my pantry: ${inventory.join(", ")}.
        I want to cook a ${mealType}. My cooking skill level is "${skillLevel || "not specified"}".
        Please give me 5 recipe ideas that use these items.
        Provide each recipe as:
        1. Recipe name
        2. Short description of the recipe
      `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
            temperature: 0.7,
        });

        const generatedText = response.choices[0].message.content;

        console.log('Generated Text:', generatedText); // Log raw text response

        const recipes = generatedText
            .split('\n\n') // Split by double newlines (assuming each recipe is separated by them)
            .map(recipeText => {
                const lines = recipeText.split('\n');
                return {
                    title: lines[0]?.trim() || "Unnamed Recipe",
                    description: lines.slice(1).join(' ').trim() || "No description available",
                };
            });

        console.log('Parsed Recipes:', recipes); // Log parsed recipes

        res.json({ recipes });
    } catch (error) {
        console.error("Error generating recipes:", error.message);
        res.status(500).json({ error: "Error generating recipes" });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
