import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import { Truck, Shield, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: Truck,
      title: "Freight Transportation",
      description: "Reliable ground, air, and ocean freight with real-time tracking."
    },
    {
      icon: Shield,
      title: "Secure Logistics",
      description: "High-security transportation with full insurance coverage."
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "99.9% on-time delivery rate with 24/7 customer support."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account managers for enterprise clients."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose StreamLine Logistics?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine industry expertise with cutting-edge technology to deliver 
              exceptional logistics solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <div className="inline-flex p-4 bg-gradient-primary rounded-xl group-hover:shadow-md transition-all duration-200">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Streamline Your Operations?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that trust StreamLine Logistics for their supply chain needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary shadow-md group">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
