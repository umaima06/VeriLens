import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SentimentBreakdown from "../components/SentimentBreakdown";
import AIAnalysis from "../components/AIAnalysis";
import ChatPanel from "../components/ChatPanel";
import { analyzeText, analyzeURL } from "../services/api";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(false);
  const [articleText, setArticleText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const location = useLocation();
  const { content, type } = location.state || {};

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No content provided for analysis.
      </div>
    );
  }

  const handleAnalyze = async ({ mode, value }) => {
    setLoading(true);

    try {
      const res =
        mode === "url"
          ? await analyzeURL(value)
          : await analyzeText(value);

      setArticleText(mode === "url" ? res.article_text : value);
      setAnalysis(res);
    } catch (err) {
      console.error("Analysis failed", err);
      alert("Analysis failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!content) return;

    handleAnalyze({
      mode: type === "url" ? "url" : "text",
      value: content,
    });
  }, [content]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8">
        {loading && (
          <p className="text-lg font-semibold text-white mb-3">
            Analyzing article…
          </p>
        )}

        {analysis && (
  <div className="space-y-16">

    {/* 🔥 GRADIENT HEADER SECTION */}
    <div className="relative rounded-3xl p-10 overflow-hidden bg-gradient-to-br from-emerald-600/20 via-zinc-900 to-zinc-950 border border-emerald-500/20">

      <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid md:grid-cols-3 gap-8">

        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
            Topic
          </p>
          <h2 className="text-3xl font-bold">
            {analysis?.signals?.topic}
          </h2>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
            Perspective
          </p>
          <h2 className="text-3xl font-bold text-emerald-300">
            {analysis?.signals?.ideology}
          </h2>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-3">
            Balance Score
          </p>

          <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-600"
              style={{
                width: `${analysis?.coverage_analysis?.completeness_score}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-zinc-400">
            {analysis?.coverage_analysis?.completeness_score}% Coverage
          </p>
        </div>

      </div>
    </div>


    {/* 🔥 MAIN GRID */}
    <div className="grid lg:grid-cols-12 gap-14">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-8 space-y-14">

        {/* AI Reasoning */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">
            AI Reasoning
          </h3>

          <div className="text-zinc-300 leading-relaxed text-lg border-l-2 border-emerald-500 pl-6">
            {analysis?.ai_layer?.reasoning}
          </div>
        </div>


        {/* Neutral Rewrite */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">
            Neutral Rewrite
          </h3>

          <div className="bg-zinc-900/40 p-8 rounded-2xl text-zinc-400 italic border border-zinc-800">
            {analysis?.ai_layer?.neutral_rewrite}
          </div>
        </div>


        {/* Coverage Gaps */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">
            Missing Perspectives
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {analysis?.coverage_analysis?.coverage_gaps?.map((gap, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-emerald-500/40 transition"
              >
                <p className="text-zinc-300 text-sm">{gap}</p>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* RIGHT CHAT */}
      <div className="lg:col-span-4 sticky top-24 h-fit">
        <ChatPanel articleText={articleText} />
      </div>

    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default AnalysisPage;