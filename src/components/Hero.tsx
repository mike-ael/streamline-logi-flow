import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-logistics.jpg";

const Hero = () => {
  const features = [
    "Real-time tracking",
    "Nationwide coverage",
    "24/7 customer support"
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="StreamLine Logistics - Professional freight and cargo services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-sm font-medium text-white mb-6 backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 500+ Companies
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Streamline Your
              <span className="block bg-gradient-to-r from-secondary to-secondary-hover bg-clip-text text-transparent">
                Logistics Operations
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Reliable freight transportation, advanced tracking, and supply chain management 
              solutions to keep your business moving forward efficiently.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold shadow-hero group"
              >
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
              >
                Track Shipment
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="lg:flex justify-center hidden">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-hero">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Our Impact
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">500K+</div>
                  <div className="text-white/80">Shipments Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
                  <div className="text-white/80">On-Time Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-white/80">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;