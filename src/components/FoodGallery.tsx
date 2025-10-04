import tacosImage from "@/assets/food-tacos-grid.jpg";
import burgerImage from "@/assets/food-burger.jpg";
import friesImage from "@/assets/food-fries-loaded.jpg";
import saladImage from "@/assets/food-salad.jpg";
import burritoImage from "@/assets/food-burrito.jpg";
import dessertImage from "@/assets/food-dessert.jpg";

const FoodGallery = () => {
  const items = [
    { image: tacosImage, title: "Tacos", accent: "hsl(var(--primary))" },
    { image: burgerImage, title: "Burgers", accent: "hsl(var(--accent))" },
    { image: saladImage, title: "Salades", accent: "hsl(var(--neon-green))" },
    { image: friesImage, title: "Frites", accent: "hsl(var(--neon-pink))" },
    { image: burritoImage, title: "Burritos", accent: "hsl(var(--primary))" },
    { image: dessertImage, title: "Desserts", accent: "hsl(var(--accent))" },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Neon accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-foreground uppercase">
            Nos armes de
            <span className="block text-primary">persuasion massives</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-bold uppercase tracking-wide">
            Des saveurs qui parlent fort 💣
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              style={{ 
                boxShadow: `0 0 30px ${item.accent}33, 0 0 60px ${item.accent}1a`
              }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 
                  className="text-3xl md:text-4xl font-black uppercase tracking-wider"
                  style={{ color: item.accent }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Hover Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${item.accent}22 0%, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </section>
  );
};

export default FoodGallery;
