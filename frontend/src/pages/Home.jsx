import HeroSection from "../components/HeroSection";
import SubmitArticleCard from "../components/SubmitArticleCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-green-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 container mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-12 gap-20 items-center">

          {/* LEFT SIDE – HERO */}
          <div className="lg:col-span-6">
            <HeroSection />
          </div>

          {/* RIGHT SIDE – SUBMIT CARD */}
          <div className="lg:col-span-6">
            <SubmitArticleCard />
          </div>

        </div>

      </div>
    </div>
  );
}