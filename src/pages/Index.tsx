import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuShowcase from "@/components/MenuShowcase";
import About from "@/components/About";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section id="home">
          <Hero />
        </section>
        <section id="menu">
          <MenuShowcase />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="locations">
          <Locations />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
