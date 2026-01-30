import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Hero />
      <Features />
      <Roadmap />
      <Footer />
    </div>
  );
}
