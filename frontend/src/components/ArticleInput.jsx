import { useState } from "react";
import Button from "./button";

export default function ArticleInput({ onAnalyze }) {
  const [mode, setMode] = useState("text");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAnalyze({ mode, value });
  };

  return (
    <div className="bg-white rounded-2xl border p-8">
      <h3 className="text-2xl font-serif mb-6">Submit Article</h3>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === "text" ? "secondary" : "outline"}
          className="flex-1"
          onClick={() => setMode("text")}
        >
          Paste Text
        </Button>

        <Button
          variant={mode === "url" ? "secondary" : "outline"}
          className="flex-1"
          onClick={() => setMode("url")}
        >
          URL
        </Button>
      </div>

      {/* Input */}
      {mode === "text" ? (
        <textarea
        rows={10}
        className="w-full border rounded-md p-3"
        placeholder="Paste your article text here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />

      ) : (
        <Input
          placeholder="https://example.com/article"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      {mode === "url" && (
        <p className="text-xs text-gray-500 mt-2">
          We’ll extract and analyze the article content automatically.
        </p>
      )}

      {/* CTA */}
      <Button
        className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white"
        onClick={handleSubmit}
      >
        Analyze Article
      </Button>
    </div>
  );
}
