import { Button } from "@/components/ui/button";
import { MapPin, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-tacos.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
            Experience
            <span className="block text-primary">Authentic Flavors</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Discover our signature tacos, burritos, and more. Fresh ingredients, bold flavors, unforgettable taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="text-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <MapPin className="mr-2 h-5 w-5" />
              Find Location
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
