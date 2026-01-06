export default function OriginalArticle() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif">Original Article</h2>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
          Show Neutral
        </button>
      </div>

      <div className="border rounded-xl p-6 text-gray-700 leading-relaxed">
        January 6, 2026 — Paper The View From India...
        {/* Static text for now */}
      </div>
    </div>
  );
}
