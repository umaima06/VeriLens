import LayerCard from "./LayerCard";

export default function LayersSection() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <LayerCard
        layer="LAYER 1"
        title="ML Classification"
        description="Objective sentiment analysis and bias detection using pre-trained models. Fast, consistent, and explainable."
      />

      <LayerCard
        layer="LAYER 2"
        title="AI Reasoning"
        description="Gemini AI explains why content may be biased, highlights emotional manipulation, and rewrites articles neutrally."
      />

      <LayerCard
        layer="LAYER 3"
        title="Interactive Chat"
        description="Ask questions, explore specific claims, and get context-aware answers about the article’s credibility."
      />
    </div>
  );
}
