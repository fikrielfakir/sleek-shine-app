import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const handleWhatsAppOrder = () => {
    window.open("https://wa.me/33123456789?text=Bonjour, je souhaite passer une commande", "_blank");
  };

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase">
            Contactez
            <span className="block text-primary">-nous</span>
          </h2>
          <p className="text-2xl text-muted-foreground font-bold">
            Une question ? Une envie ? Écrivez-nous !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <Input 
                placeholder="Votre nom" 
                className="bg-card border-2 border-border focus:border-primary h-14 text-lg"
              />
            </div>
            <div>
              <Input 
                type="email"
                placeholder="Votre email" 
                className="bg-card border-2 border-border focus:border-primary h-14 text-lg"
              />
            </div>
            <div>
              <Textarea 
                placeholder="Votre message" 
                className="bg-card border-2 border-border focus:border-primary min-h-[160px] text-lg resize-none"
              />
            </div>
            <Button variant="hero" size="lg" className="w-full text-xl">
              Envoyer le message
            </Button>

            {/* WhatsApp Quick Order */}
            <div className="pt-6 border-t border-border">
              <Button 
                variant="neon" 
                size="lg" 
                className="w-full text-xl"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                Commander via WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-2xl border-2 border-border">
              <h3 className="text-3xl font-black mb-6 text-primary uppercase">
                Nos coordonnées
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Adresse</p>
                    <p className="text-muted-foreground">
                      123 Avenue des Tacos<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Téléphone</p>
                    <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--neon-green))]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-[hsl(var(--neon-green))]" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">WhatsApp</p>
                    <p className="text-muted-foreground">+33 6 12 34 56 78</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-2xl border-2 border-border overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-xl font-bold text-muted-foreground">
                    Carte interactive à venir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
