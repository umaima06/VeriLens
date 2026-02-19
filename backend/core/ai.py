from google import genai
import os
import json

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-2.5-flash"


def generate_bias_explanation(text, sentiment, bias_score, biased_phrases):
    try:
        phrases = [p.get("phrase") for p in biased_phrases if "phrase" in p]

        prompt = f"""
You are a neutral media literacy expert.

Analyze the article and return STRICT JSON in this format:

{{
  "bias_reasoning": "Explain bias, emotional framing, and credibility.",
  "counter_perspective": "Describe an alternative interpretation.",
  "neutral_rewrite": "Rewrite 70%-80% of the article to be neutral and factual."
}}

Rules:
- Output valid JSON only
- No markdown
- No headings
- No extra text

Article:
{text}

Sentiment: {sentiment}
Bias Score: {bias_score}/100
Biased Phrases: {phrases}
"""

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        raw = response.text.strip()
        print("RAW GEMINI OUTPUT:\n", raw)

        data = json.loads(raw)

        return {
            "reasoning": data.get("bias_reasoning", ""),
            "counter_perspective": data.get("counter_perspective", ""),
            "neutral_rewrite": data.get("neutral_rewrite", "")
        }

    except Exception as e:
        return {
            "reasoning": "",
            "counter_perspective": "",
            "neutral_rewrite": "",
            "error": str(e)
        }


def generate_chat_response(article_text, user_question, sentiment, bias_score, biased_phrases, history):
    try:
        history_text = ""
        for turn in history:
            history_text += f"User: {turn['user']}\nAssistant: {turn['assistant']}\n"

        prompt = f"""
You are VeriLens Chat — an interactive fact-checking assistant.

Rules:
- Answer ONLY using the article
- 3–6 sentences max
- Be neutral
- If evidence is missing, say so clearly

Conversation history:
{history_text}

Article:
{article_text}

User question:
{user_question}
"""

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:
        return f"AI chat unavailable: {str(e)}"
