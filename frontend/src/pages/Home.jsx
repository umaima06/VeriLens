import HeroSection from "../components/HeroSection";
import ArticleInput from "../components/ArticleInput";

export default function Home() {
  const handleAnalyze = ({ mode, value }) => {
    console.log(mode, value);
    // Later: API call
  };

  return (
    <div className="grid grid-cols-2 gap-12 px-10 py-16 bg-[#fafafa]">
      <HeroSection />
      <ArticleInput onAnalyze={handleAnalyze} />
    </div>
  );
}
