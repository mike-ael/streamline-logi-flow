import { useState } from "react";
import { Search, Package, Truck, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Tracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  // Mock tracking data for demonstration
  const mockTrackingData = {
    "SL123456789": {
      id: "SL123456789",
      status: "In Transit",
      origin: "Los Angeles, CA",
      destination: "New York, NY",
      estimatedDelivery: "December 30, 2024",
      currentLocation: "Chicago, IL",
      progress: 60,
      timeline: [
        { 
          status: "Package Picked Up", 
          location: "Los Angeles, CA", 
          timestamp: "Dec 27, 2024 - 9:00 AM",
          completed: true
        },
        { 
          status: "In Transit", 
          location: "Phoenix, AZ", 
          timestamp: "Dec 27, 2024 - 6:30 PM",
          completed: true
        },
        { 
          status: "In Transit", 
          location: "Chicago, IL", 
          timestamp: "Dec 28, 2024 - 11:45 AM",
          completed: true
        },
        { 
          status: "Out for Delivery", 
          location: "New York, NY", 
          timestamp: "Dec 30, 2024 - 8:00 AM",
          completed: false
        },
        { 
          status: "Delivered", 
          location: "New York, NY", 
          timestamp: "Dec 30, 2024 - 2:00 PM",
          completed: false
        }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      const result = mockTrackingData[trackingId] || null;
      setTrackingResult(result);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-success text-success-foreground";
      case "In Transit": return "bg-primary text-primary-foreground";
      case "Out for Delivery": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Track Your Shipment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your tracking number to get real-time updates on your shipment status and location.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-center">Enter Tracking Number</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="e.g., SL123456789"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8 bg-gradient-primary shadow-md">
                  <Search className="h-5 w-5 mr-2" />
                  Track
                </Button>
              </form>
              
              {/* Sample tracking numbers for demo */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Try this sample tracking number:</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setTrackingId("SL123456789")}
                >
                  SL123456789
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Package className="h-6 w-6 text-primary" />
                      Tracking ID: {trackingResult.id}
                    </CardTitle>
                    <Badge className={getStatusColor(trackingResult.status)}>
                      {trackingResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">From: {trackingResult.origin}</p>
                          <p className="font-medium">To: {trackingResult.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Current Location</p>
                          <p className="font-medium">{trackingResult.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                          <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>Progress</span>
                          <span>{trackingResult.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${trackingResult.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle>Shipment Timeline</CardTitle>
                  <CardDescription>
                    Track the journey of your package from pickup to delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {trackingResult.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6 last:pb-0">
                        {/* Timeline dot */}
                        <div className="relative">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            event.completed 
                              ? 'bg-primary border-primary' 
                              : 'bg-background border-muted-foreground'
                          }`}>
                            {event.completed && <CheckCircle className="w-2 h-2 text-primary-foreground" />}
                          </div>
                          {index < trackingResult.timeline.length - 1 && (
                            <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${
                              event.completed ? 'bg-primary' : 'bg-muted'
                            }`} />
                          )}
                        </div>
                        
                        {/* Event details */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {event.status}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {trackingResult === null && trackingId && (
            <Card className="shadow-lg border-border/50 border-destructive/20">
              <CardContent className="pt-6 text-center">
                <p className="text-destructive font-medium">
                  No shipment found with tracking number: {trackingId}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Please check your tracking number and try again.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tracking;