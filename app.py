from fastapi import FastAPI
from pydantic import BaseModel
import openai
import requests
from bs4 import BeautifulSoup

app = FastAPI()

# Set up OpenAI API key
openai.api_key = "your-openai-api-key"

# Data model for input
class Ingredients(BaseModel):
    ingredients: list[str]

def refine_query_with_ai(ingredients):
    prompt = (
        "I have the following ingredients: "
        f"{', '.join(ingredients)}. Suggest a concise search query to find recipes that use these ingredients."
    )
    response = openai.ChatCompletion.create(
        model="gpt-4", messages=[{"role": "user", "content": prompt}], max_tokens=50
    )
    return response['choices'][0]['message']['content'].strip()

@app.post("/search-recipes")
def search_recipes(data: Ingredients):
    query = refine_query_with_ai(data.ingredients)
    url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch data."}

    soup = BeautifulSoup(response.text, 'html.parser')
    results = [
        {"title": g.find('h3').text, "link": g.find('a')['href']}
        for g in soup.find_all('div', class_='tF2Cxc')
    ]
    return {"query": query, "results": results}
