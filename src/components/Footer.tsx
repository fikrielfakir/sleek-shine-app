import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-foreground py-16 border-t-2 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Story */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black mb-6 uppercase">
              TACOS <span className="text-primary">AVENUE</span>
            </h3>
            <p className="text-xl font-bold text-accent mb-4 uppercase tracking-wide">
              Le vrai goût français
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Depuis 2020, nous apportons les saveurs authentiques de la street food française dans votre quartier. 
              Des tacos généreux, des burgers juteux, et des ingrédients toujours frais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black mb-6 text-xl uppercase tracking-wide">Menu</h4>
            <ul className="space-y-3">
              <li>
                <a href="#menu" className="text-muted-foreground hover:text-primary transition-[var(--transition-smooth)] font-bold uppercase text-sm">
                  Nos Tacos
                </a>
              </li>
              <li>
                <a href="#menu" className="text-muted-foreground hover:text-accent transition-[var(--transition-smooth)] font-bold uppercase text-sm">
                  Burgers
                </a>
              </li>
              <li>
                <a href="#menu" className="text-muted-foreground hover:text-[hsl(var(--neon-green))] transition-[var(--transition-smooth)] font-bold uppercase text-sm">
                  Salades
                </a>
              </li>
              <li>
                <a href="#menu" className="text-muted-foreground hover:text-[hsl(var(--neon-pink))] transition-[var(--transition-smooth)] font-bold uppercase text-sm">
                  Desserts
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-6 text-xl uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="font-semibold">hello@tacosavenue.fr</li>
              <li className="font-semibold">+33 1 23 45 67 89</li>
              <li className="font-bold text-primary uppercase text-sm">Ouvert 7j/7</li>
              <li className="text-sm">11h - 23h</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground font-bold uppercase tracking-wide">
              Suivez-nous sur les réseaux
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
              >
                <Facebook className="h-6 w-6 text-primary hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 20px hsl(var(--accent) / 0.3)" }}
              >
                <Instagram className="h-6 w-6 text-accent hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-[hsl(var(--neon-pink))]/20 flex items-center justify-center hover:bg-[hsl(var(--neon-pink))] hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 20px hsl(var(--neon-pink) / 0.3)" }}
              >
                <Twitter className="h-6 w-6 text-[hsl(var(--neon-pink))] hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-[hsl(var(--neon-green))]/20 flex items-center justify-center hover:bg-[hsl(var(--neon-green))] hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 20px hsl(var(--neon-green) / 0.3)" }}
              >
                <Youtube className="h-6 w-6 text-[hsl(var(--neon-green))] hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2025 Tacos Avenue. Tous droits réservés. 
            <span className="text-primary font-bold"> Made with ❤️ in France</span>
          </p>
        </div>
      </div>

      {/* Neon line accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-[hsl(var(--neon-green))]" />
    </footer>
  );
};

export default Footer;
