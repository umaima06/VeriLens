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

  // ✅ DEFINE THE FUNCTION FIRST
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
  }finally {
  setLoading(false);
}
  };

  // ✅ AUTO-RUN WHEN PAGE LOADS
  useEffect(() => {
    if (!content) return;

    handleAnalyze({
      mode: type === "url" ? "url" : "text",
      value: content
    });
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8">
        {loading && (
          <p className="text-center text-gray-500">Analyzing article…</p>
        )}

        {analysis && (
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            {/* LEFT */}
            <div className="lg:col-span-7 overflow-y-auto pr-2">
              <SentimentBreakdown
                sentiment={analysis?.sentiment || "Unknown"}
                biasScore={analysis?.bias_score ?? 0}
              />    
              <AIAnalysis
              reasoning={analysis?.ai_reasoning || "No explanation available."}
              rewrite={analysis?.neutral_rewrite || "No rewrite available."}
              />

            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5">
              {articleText ? (
                <ChatPanel articleText={articleText} />
              ) : (
              <p className="text-gray-400 text-sm">No article loaded</p>
             )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;
