import Navbar from "@/components/layout/Navbar";
import Dashboard from "./game/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Dashboard />
    </div>
  );
}
