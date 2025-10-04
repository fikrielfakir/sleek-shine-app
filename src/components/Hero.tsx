import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Truck } from "lucide-react";
import heroImage from "@/assets/hero-tacos-dark.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-foreground leading-none">
            DÉGUSTEZ NOS
            <span className="block bg-gradient-to-r from-primary via-[hsl(var(--neon-pink))] to-accent bg-clip-text text-transparent animate-pulse">
              SAVOUREUX TACOS
            </span>
            <span className="block text-foreground">FRANÇAIS</span>
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 text-foreground/90 font-bold uppercase tracking-wider">
            En ligne • À emporter • En livraison
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="hero" size="lg" className="text-xl w-full sm:w-auto">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Commander en ligne
            </Button>
            <Button variant="neon" size="lg" className="text-xl w-full sm:w-auto">
              <Package className="mr-2 h-6 w-6" />
              À emporter
            </Button>
            <Button variant="outline" size="lg" className="text-xl w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-black">
              <Truck className="mr-2 h-6 w-6" />
              Livraison
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-[hsl(var(--neon-green))]" />
    </section>
  );
};

export default Hero;
