from openai import OpenAI
import os


def get_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    return OpenAI(api_key=api_key)


def generate_bias_explanation(
    text: str,
    sentiment: dict,
    bias_score: int,
    biased_phrases: list
):
    try:
        client = get_client()
        phrases = [p.get("phrase") for p in biased_phrases if "phrase" in p]

        prompt = f"""
You are a media literacy expert.

Analyze the following news content and explain its credibility and bias
in a clear, neutral, and easy-to-understand manner.

Article Text:
{text}

Sentiment Analysis:
Positive: {sentiment['positive']}
Negative: {sentiment['negative']}
Neutral: {sentiment['neutral']}
Compound: {sentiment['compound']}

Bias Score: {bias_score}/100
Biased Phrases Detected: {phrases}

Explain:
1. Whether the article shows bias or emotional manipulation
2. How language affects credibility
3. What a reader should be cautious about

Keep the explanation factual and unbiased.
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"AI explanation unavailable: {str(e)}"


def generate_chat_response(
    article_text: str,
    user_question: str,
    sentiment: dict,
    bias_score: int,
    biased_phrases: list,
    history: list
):

    try:
        client = get_client()
        # 1️⃣ BUILD MESSAGES (SYSTEM + MEMORY)
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a neutral media literacy assistant. "
                    "Explain bias, credibility, and manipulation without political alignment."
                )
            }
        ]

        # 2️⃣ INJECT MEMORY (FOLLOW-UP QUESTIONS)
        for turn in history:
            messages.append({"role": "user", "content": turn["user"]})
            messages.append({"role": "assistant", "content": turn["assistant"]})

        # 3️⃣ CURRENT QUESTION WITH CONTEXT
        messages.append({
            "role": "user",
            "content": f"""
Article:
{article_text}

Sentiment: {sentiment}
Bias Score: {bias_score}/100
Biased Phrases: {[p.get("phrase") for p in biased_phrases]}

Question:
{user_question}
"""
        })

        # 4️⃣ CALL OPENAI (THIS REPLACES THE OLD PROMPT CALL)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.4
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"AI chat unavailable: {str(e)}"
    