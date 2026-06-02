import FloatingX from "@/components/core/FloatingX";
import Navbar from "@/components/core/Navbar";
import Community from "@/components/sections/Community";
import FinalCTA from "@/components/sections/FinalCTA";
import Gallery from "@/components/sections/Gallery";
import Games from "@/components/sections/Games";
import Hardware from "@/components/sections/Hardware";
import Hero from "@/components/sections/Hero";
import OnlineBooking from "@/components/sections/OnlineBooking";
import Pricing from "@/components/sections/Pricing";
import Stats from "@/components/sections/Stats";
import Tournaments from "@/components/sections/Tournaments";

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F0EC]">
      <Navbar />
      <FloatingX />

      <Hero />
      <Hardware />
      <Gallery />
      <OnlineBooking />
      <Games />
      <Pricing />
      <Stats />
      <Tournaments />
      <Community />
      <FinalCTA />
    </main>
  );
}
