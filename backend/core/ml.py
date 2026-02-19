import re
import string
import json
import pickle
import numpy as np
import spacy
import os

# =========================
# LOAD EVERYTHING ONCE
# =========================

# Load models
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "topic_classifier.pkl"), "rb") as f:
    topic_classifier = pickle.load(f)

with open(os.path.join(BASE_DIR, "topic_vectorizer.pkl"), "rb") as f:
    topic_vectorizer = pickle.load(f)

with open(os.path.join(BASE_DIR, "ideology_classifier.pkl"), "rb") as f:
    ideology_classifier = pickle.load(f)

with open(os.path.join(BASE_DIR, "ideology_vectorizer.pkl"), "rb") as f:
    ideology_vectorizer = pickle.load(f)

with open(os.path.join(BASE_DIR, "narrative_frame_classifier.pkl"), "rb") as f:
    narrative_classifier = pickle.load(f)

with open(os.path.join(BASE_DIR, "narrative_vectorizer.pkl"), "rb") as f:
    narrative_vectorizer = pickle.load(f)

with open(os.path.join(BASE_DIR, "narrative_scaler.pkl"), "rb") as f:
    narrative_scaler = pickle.load(f)

# Load spaCy
nlp = spacy.load("en_core_web_sm")

# =========================
# CONFIG
# =========================

TOPIC_LABELS = {
    0: "World",
    1: "Sports",
    2: "Business",
    3: "Sci/Tech"
}

COUNTER_PHRASES = [
    "however", "on the other hand", "critics argue",
    "nevertheless", "in contrast", "opponents argue",
    "while others", "but"
]

CAUSAL_PHRASES = [
    "because", "due to", "as a result", "therefore",
    "led to", "results in", "caused by"
]

TOPIC_CONF_THRESHOLD = 0.55


# =========================
# UTIL FUNCTIONS
# =========================

def preprocess(text: str):
    text = text.lower()
    text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)
    return text.strip()


def detect_phrases(text: str, phrase_list: list):
    text_lower = text.lower()
    return [p for p in phrase_list if p in text_lower]


def extract_entities(text: str):
    doc = nlp(text)
    entities = [
        ent.text for ent in doc.ents
        if ent.label_ in ["PERSON", "ORG", "GPE", "NORP", "LOC"]
    ]
    return list(set(entities))


# =========================
# FEATURE 1
# =========================

def predict_feature1(text: str):

    cleaned = preprocess(text)

    # ----- Topic -----
    vec_topic = topic_vectorizer.transform([cleaned])
    topic_probs = topic_classifier.predict_proba(vec_topic)[0]
    topic_index = np.argmax(topic_probs)
    topic_conf = float(np.max(topic_probs))

    if topic_conf < TOPIC_CONF_THRESHOLD:
        predicted_topic = "Other"
    else:
        predicted_topic = TOPIC_LABELS.get(topic_index, "Other")

    # ----- Narrative -----
    vec_narr = narrative_vectorizer.transform([cleaned])
    vec_narr_scaled = narrative_scaler.transform(vec_narr)

    narr_probs = narrative_classifier.predict_proba(vec_narr_scaled)[0]
    narr_index = np.argmax(narr_probs)
    narr_conf = float(np.max(narr_probs))

    predicted_narrative = narrative_classifier.classes_[narr_index]

    return {
        "topic": predicted_topic,
        "topic_confidence": round(topic_conf, 3),
        "narrative_frame": predicted_narrative,
        "narrative_confidence": round(narr_conf, 3)
    }


# =========================
# FEATURE 2
# =========================

def predict_feature2(text: str):

    cleaned = preprocess(text)

    # ----- Ideology -----
    vec_ideo = ideology_vectorizer.transform([cleaned])
    ideo_probs = ideology_classifier.predict_proba(vec_ideo)[0]
    ideo_index = np.argmax(ideo_probs)
    ideo_conf = float(np.max(ideo_probs))

    ideology = ideology_classifier.classes_[ideo_index]

    # ----- Entity Extraction -----
    entities = extract_entities(text)
    stakeholder_count = len(entities)

    # ----- Phrase Detection -----
    counter_found = detect_phrases(text, COUNTER_PHRASES)
    causal_found = detect_phrases(text, CAUSAL_PHRASES)

    # ----- Robust Completeness Scoring -----
    score = 100
    gaps = []

    if ideology in ["left", "right"]:
        score -= 20
        gaps.append("Ideological leaning detected")

    if stakeholder_count < 3:
        score -= 20
        gaps.append("Low stakeholder diversity")

    if not counter_found:
        score -= 15
        gaps.append("Missing counter-arguments")

    if not causal_found:
        score -= 15
        gaps.append("Missing causal explanation")

    # Confidence penalty
    if ideo_conf > 0.85 and ideology != "center":
        score -= 10
        gaps.append("Strong ideological confidence")

    score = max(0, min(score, 100))

    return {
        "ideology": ideology,
        "ideology_confidence": round(ideo_conf, 3),
        "stakeholders": entities,
        "completeness_score": score,
        "coverage_gaps": gaps
    }
