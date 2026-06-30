from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def summarize_file(filepath):

    with open(filepath, "r", encoding="utf-8") as file:
        code = file.read()
    prompt = f"""
    You are a senior software engineer.
    Explain the following Python file.
    Include:
    1. Purpose of the file
    2. Main functions or classes
    3. Important dependencies
    4. Possible improvements
    Keep the explanation under 150 words.
    Code:
    {code}
    """
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    )
    return response.text


        
if __name__ == "__main__":

    summary = summarize_file("main.py")

    print(summary)