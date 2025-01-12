# Ingreedy

Ingreedy is a web application designed to simplify meal planning and cooking by utilizing ingredients you already have in your pantry. It allows users to:

- Add pantry items manually or by uploading images.
- Manage their inventory of ingredients.
- Generate recipe ideas based on available ingredients, meal type, and skill level.
- Save favorite recipes for easy access later.

[Demo Video](https://youtu.be/k5D6dpmNcG4)

---

## Features

- **Inventory Management:** Keep track of the ingredients in your pantry.
- **Recipe Generation:** Receive tailored recipe suggestions based on your ingredients, cooking preferences, and skill level.
- **Favorite Recipes:** Save your favorite recipes for future reference.
- **AI-Powered Recipe Suggestions:** Uses OpenAI's GPT model to generate recipe ideas.
- **Image Analysis:** Identifies ingredients in uploaded images using the TensorFlow.js Coco-SSD object detection model.

---

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **AI Integration:** OpenAI GPT-3.5 Turbo
- **Image Recognition:** TensorFlow.js with the Coco-SSD model
- **Dependencies:** 
  - `cors` for enabling Cross-Origin Resource Sharing
  - `dotenv` for environment variable management
  - `express` for server-side application logic
  - `openai` for accessing AI capabilities
- **Styling:** Custom CSS with a user-friendly design
- **Storage:** LocalStorage for managing pantry items and favorites

---

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- An OpenAI API key (store it in a `.env` file as `OPENAI_API_KEY`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JoshiShriya/Ingreedy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Ingreedy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## Contributors

This project was created as part of **SheHacks9** by:

- Kenda Najjar
- Orayda Shagifa
- Shriya Joshi 
- Jasmine Vu

---