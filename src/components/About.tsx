import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Recipes",
      description: "Traditional recipes passed down through generations, made with love and care",
    },
    {
      icon: Sparkles,
      title: "Fresh Ingredients",
      description: "We source only the freshest, highest-quality ingredients for every dish",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in taste, quality, and customer satisfaction",
    },
  ];

  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            We're passionate about bringing you the best dining experience with every visit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index}
                className="bg-card/10 border-secondary-foreground/20 hover:bg-card/20 transition-[var(--transition-smooth)]"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-secondary-foreground/80">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
