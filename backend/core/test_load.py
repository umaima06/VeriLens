import pickle

pickle.load(open("topic_classifier.pkl","rb"))
pickle.load(open("topic_vectorizer.pkl","rb"))
pickle.load(open("narrative_frame_classifier.pkl","rb"))
pickle.load(open("narrative_vectorizer.pkl","rb"))
pickle.load(open("narrative_scaler.pkl","rb"))
pickle.load(open("ideology_classifier.pkl","rb"))
pickle.load(open("ideology_vectorizer.pkl","rb"))

print("All models loaded successfully!")
