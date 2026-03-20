import Topbar from "../components/topbar";
import Hero from "../components/hero";
import Features from "../components/features";
import MasterPlan from "../components/master-plan";
import Footer from "../components/footer";
import PolygonMeshBackground from "../components/polygon-mesh-background";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Hero />
      <div className="relative">
        <PolygonMeshBackground />
        <Features />
        <MasterPlan />
        <Footer />
      </div>
    </div>
  );
}
