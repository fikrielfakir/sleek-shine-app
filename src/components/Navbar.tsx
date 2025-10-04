import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Accueil", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b-2 border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-3xl font-black text-foreground uppercase tracking-tight">
            TACOS <span className="text-primary">AVENUE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-[var(--transition-smooth)] font-bold uppercase tracking-wide text-sm"
              >
                {link.name}
              </a>
            ))}
            <Link to="/order" data-testid="button-order">
              <Button variant="hero" size="default">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Commander
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t-2 border-primary/30">
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-[var(--transition-smooth)] font-bold uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link to="/order" className="w-full" data-testid="button-order-mobile">
                <Button variant="hero" size="default" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Commander
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
