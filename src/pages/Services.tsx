import { Truck, Warehouse, Globe, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Freight Transportation",
      description: "Reliable ground, air, and ocean freight services with real-time tracking and competitive rates.",
      features: ["Ground Transport", "Air Freight", "Ocean Shipping", "Express Delivery"]
    },
    {
      icon: Warehouse,
      title: "Warehousing Solutions",
      description: "State-of-the-art storage facilities with inventory management and distribution services.",
      features: ["Climate Control", "Inventory Management", "Pick & Pack", "Cross Docking"]
    },
    {
      icon: Globe,
      title: "Supply Chain Management",
      description: "End-to-end supply chain optimization to reduce costs and improve efficiency.",
      features: ["Route Optimization", "Demand Planning", "Vendor Management", "Cost Analysis"]
    },
    {
      icon: Shield,
      title: "Secure Logistics",
      description: "High-security transportation for valuable and sensitive cargo with full insurance coverage.",
      features: ["Armed Transport", "GPS Tracking", "Insurance Coverage", "Secure Facilities"]
    },
    {
      icon: Clock,
      title: "Same-Day Delivery",
      description: "Urgent shipments delivered within hours across major metropolitan areas.",
      features: ["Rush Delivery", "Local Coverage", "Priority Handling", "Real-time Updates"]
    },
    {
      icon: Users,
      title: "Dedicated Account Management",
      description: "Personalized service with dedicated account managers for enterprise clients.",
      features: ["Personal Account Manager", "Custom Solutions", "24/7 Support", "Performance Reports"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive logistics solutions designed to meet your business needs, 
              from small packages to complex supply chain operations.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-gradient-primary rounded-lg group-hover:shadow-md transition-all duration-200">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/50">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team of logistics experts can design a tailored solution 
                that fits your specific requirements and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary shadow-md">
                  Get Custom Quote
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;