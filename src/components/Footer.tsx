import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-secondary-foreground/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              TACOS <span className="text-primary">AVENUE</span>
            </h3>
            <p className="text-secondary-foreground/80">
              Bringing authentic flavors to your neighborhood since 2020
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#locations" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                  Locations
                </a>
              </li>
              <li>
                <a href="#about" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Email: hello@tacosavenue.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Open 7 days a week</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-[var(--transition-smooth)]">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/20 text-center text-secondary-foreground/60">
          <p>&copy; 2024 Tacos Avenue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
