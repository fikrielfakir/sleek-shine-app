import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodGallery from "@/components/FoodGallery";
import MenuShowcase from "@/components/MenuShowcase";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section id="home">
          <Hero />
        </section>
        <section id="gallery">
          <FoodGallery />
        </section>
        <section id="menu">
          <MenuShowcase />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
