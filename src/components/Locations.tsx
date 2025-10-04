import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

const Locations = () => {
  const locations = [
    {
      name: "Downtown",
      address: "123 Main Street, City Center",
      phone: "(555) 123-4567",
      hours: "Mon-Sun: 11am - 10pm",
    },
    {
      name: "Riverside",
      address: "456 River Road, Waterfront",
      phone: "(555) 234-5678",
      hours: "Mon-Sun: 11am - 10pm",
    },
    {
      name: "Uptown",
      address: "789 North Avenue, District 5",
      phone: "(555) 345-6789",
      hours: "Mon-Sun: 11am - 10pm",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your <span className="text-primary">Nearest Location</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Visit us at any of our convenient locations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <Card 
              key={index}
              className="hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] border-2 hover:border-primary"
            >
              <CardHeader>
                <CardTitle className="text-2xl">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{location.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{location.hours}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
