import { Store, Package, Truck } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Store,
      title: "Sur place",
      description: "Ambiance conviviale, service rapide",
      color: "hsl(var(--primary))",
    },
    {
      icon: Package,
      title: "À emporter",
      description: "Commandez et récupérez votre repas",
      color: "hsl(var(--accent))",
    },
    {
      icon: Truck,
      title: "Livraison",
      description: "Uber Eats • Deliveroo • Just Eat",
      color: "hsl(var(--neon-green))",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase">
            Commandez
            <span className="block text-primary">comme vous voulez</span>
          </h2>
          <p className="text-2xl text-muted-foreground font-bold">
            Trois façons de vous régaler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl border-2 border-border hover:border-[var(--service-color)] bg-card transition-all duration-300"
              style={{ "--service-color": service.color } as React.CSSProperties}
            >
              {/* Icon */}
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  backgroundColor: service.color,
                  boxShadow: `0 0 30px ${service.color}66`
                }}
              >
                <service.icon 
                  className="h-10 w-10" 
                  style={{ 
                    color: service.color === "hsl(var(--accent))" || service.color === "hsl(var(--neon-green))" ? "black" : "white"
                  }}
                />
              </div>

              {/* Content */}
              <h3 
                className="text-3xl font-black mb-4 text-center uppercase"
                style={{ color: service.color }}
              >
                {service.title}
              </h3>
              <p className="text-center text-muted-foreground text-lg">
                {service.description}
              </p>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${service.color}11 0%, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Delivery Partners */}
        <div className="mt-20 text-center">
          <p className="text-xl text-muted-foreground mb-8 font-bold uppercase tracking-wider">
            Livraison disponible via
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="text-[hsl(var(--neon-green))] font-black text-3xl">UBER EATS</div>
            <div className="text-accent font-black text-3xl">DELIVEROO</div>
            <div className="text-primary font-black text-3xl">JUST EAT</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
