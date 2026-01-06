export default function AnalysisCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Sentiment" value="+87" desc="Positive / Optimistic" color="text-blue-600" />
      <Card title="Bias Level" value="87" desc="High bias detected" color="text-red-600" />
      <Card title="Credibility" value="83" desc="High credibility" color="text-green-600" />
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
