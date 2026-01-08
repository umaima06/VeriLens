export default function AnalysisCards({ sentiment, bias, credibility }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Sentiment" value={sentiment?.compound ?? 0} desc="Overall tone" />
      <Card title="Bias Level" value={bias} desc="Detected bias" />
      <Card title="Credibility" value={credibility ?? 100 - bias} desc="Estimated trust" />
    </div>
  );
}

function Card({ title, value, desc, color }) {
  return (
    <div className="border rounded-xl p-5">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}
