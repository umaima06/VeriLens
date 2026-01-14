from transformers import pipeline

print("Downloading models...")

# Sentiment
pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

# Zero-shot (CORRECT model)
pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

print("Models downloaded and cached.")
