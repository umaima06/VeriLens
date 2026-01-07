import requests
from newspaper import Article

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

def extract_article_text(url: str) -> str:
    try:
        # 🔹 Step 1: Fetch HTML with browser headers
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()

        # 🔹 Step 2: Pass HTML to newspaper
        article = Article(url)
        article.set_html(response.text)
        article.parse()

        text = article.text.strip()

        if not text or len(text) < 200:
            raise ValueError("Article text too short or empty")

        return text

    except Exception as e:
        raise RuntimeError(f"Failed to extract article: {str(e)}")
