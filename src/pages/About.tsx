import { Award, Users, Globe, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const About = () => {
  const stats = [
    { number: "25+", label: "Years of Experience", icon: Award },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Countries Served", icon: Globe },
    { number: "99.9%", label: "On-Time Delivery", icon: TrendingUp }
  ];

  const values = [
    {
      title: "Reliability",
      description: "We deliver on our promises, ensuring your cargo reaches its destination safely and on time."
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge technology to provide real-time tracking and efficient logistics solutions."
    },
    {
      title: "Customer Focus",
      description: "Your success is our priority. We provide personalized service and dedicated support."
    },
    {
      title: "Sustainability",
      description: "Committed to environmentally responsible practices that reduce our carbon footprint."
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
              About StreamLine Logistics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For over 25 years, we've been the trusted partner for businesses 
              looking to optimize their supply chain and logistics operations.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-md transition-all duration-200">
                <CardContent className="pt-6">
                  <div className="inline-flex p-3 bg-gradient-primary rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 1999, StreamLine Logistics began as a small family business with a simple mission: 
                  to provide reliable, efficient, and cost-effective logistics solutions for businesses of all sizes.
                </p>
                <p>
                  Over the years, we've grown from a local operation to a nationwide network, but we've never 
                  lost sight of our core values: treating every client like family and every shipment like it's our own.
                </p>
                <p>
                  Today, we're proud to serve over 500 companies across 50 countries, with a team of dedicated 
                  professionals who are passionate about moving your business forward.
                </p>
              </div>
            </div>
            <div className="lg:order-first">
              <Card className="bg-gradient-primary p-8 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  To streamline global commerce by providing innovative, reliable, and sustainable 
                  logistics solutions that empower businesses to grow and succeed in the modern marketplace.
                </p>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and shape the way we serve our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Leadership Team</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our experienced leadership team brings decades of logistics expertise and industry knowledge.
            </p>
            
            <Card className="bg-card border-border/50 p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Meet Our Team?</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with our logistics experts to discuss how we can help optimize your supply chain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-primary-foreground font-medium rounded-md hover:shadow-md transition-all duration-200"
                  >
                    Schedule a Consultation
                  </a>
                  <a 
                    href="/services" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-all duration-200"
                  >
                    View Our Services
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;