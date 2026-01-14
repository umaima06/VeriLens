from openai import OpenAI
import os
import json


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
        
        # if bias_score < 10 and not biased_phrases:
        #     return {
        #         "reasoning": "The article uses largely neutral language with minimal emotional or biased framing.",
        #         "counter_perspective": "Alternative interpretations are limited because the article presents factual information without strong opinion.",
        #         "neutral_rewrite": "The article already uses neutral language."
        #     }

        prompt = f"""
You are a neutral media literacy expert.

Analyze the article and return STRICT JSON in this format:

{{
  "bias_reasoning": "Explain bias, emotional framing, and credibility.",
  "counter_perspective": "Describe an alternative interpretation.",
  "neutral_rewrite": "Rewrite 70%-80% of the article to be neutral and factual."
}}

Provide the response in EXACTLY this structure:

1. Bias & Emotional Framing
- Explain whether the article shows bias or emotional manipulation.
- Refer explicitly to biased phrases if relevant.

2. Language & Credibility Impact
- Explain how word choice, tone, or framing may affect trustworthiness.

3. Counter-Perspective
- Briefly describe how an opposing or alternative viewpoint
- might interpret the same issue differently.
- Do NOT argue — just explain.

4. "neutral_rewrite":
"Rewrite the article in a neutral, factual manner.
Preserve all factual claims.
Remove emotional language, judgment, and persuasion.
Do NOT summarize.
Target length: 75–85% of the original article."

5. Reader Caution Summary
- Bullet points of what readers should be cautious about.

Rules:
- Be neutral, factual, and non-political.
- Do not invent facts.
- Do not take sides.

Rules:
- Neutral and factual
- No opinions
- No markdown
- No headings
- No extra text
- Do not include anything outside JSON

Article:
{text}

Sentiment: {sentiment}
Bias Score: {bias_score}/100
Biased Phrases: {phrases}
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            response_format={"type": "json_object"}
            )

        content = response.choices[0].message.content
        data = json.loads(content)
        
        return {
            "reasoning": data.get("bias_reasoning", ""),
            "counter_perspective": data.get("counter_perspective", ""),
            "neutral_rewrite": data.get("neutral_rewrite", "")
        }

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
    