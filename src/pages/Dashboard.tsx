import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Truck, Package, Users, MessageSquare, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  company_name: string;
  phone: string;
  role: string;
}

interface Shipment {
  id: string;
  tracking_id: string;
  customer_id: string;
  origin: string;
  destination: string;
  status: string;
  service_type: string;
  weight: number;
  estimated_delivery: string;
  actual_delivery: string;
  notes: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newShipment, setNewShipment] = useState({
    origin: '',
    destination: '',
    service_type: '',
    weight: '',
    estimated_delivery: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchShipments();
      fetchMessages();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('shipments')
        .insert([{
          tracking_id: `SL${Math.random().toString().substr(2, 6)}`,
          origin: newShipment.origin,
          destination: newShipment.destination,
          service_type: newShipment.service_type,
          weight: parseFloat(newShipment.weight),
          estimated_delivery: newShipment.estimated_delivery,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Shipment created",
        description: "New shipment has been added successfully.",
      });

      setNewShipment({
        origin: '',
        destination: '',
        service_type: '',
        weight: '',
        estimated_delivery: ''
      });

      fetchShipments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateShipmentStatus = async (shipmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ status: newStatus })
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: "Shipment status has been updated.",
      });

      fetchShipments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'staff';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user?.email}
            </p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shipments.filter(s => s.status === 'in_transit').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Badge className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shipments.filter(s => s.status === 'delivered').length}
              </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messages.length}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {isAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Shipment
              </CardTitle>
              <CardDescription>
                Add a new shipment to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createShipment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                    placeholder="e.g., Los Angeles, CA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_type">Service Type</Label>
                  <Select value={newShipment.service_type} onValueChange={(value) => setNewShipment({...newShipment, service_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Express Freight">Express Freight</SelectItem>
                      <SelectItem value="Standard Shipping">Standard Shipping</SelectItem>
                      <SelectItem value="Warehousing">Warehousing</SelectItem>
                      <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newShipment.weight}
                    onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                    placeholder="e.g., 1500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
                  <Input
                    id="estimated_delivery"
                    type="date"
                    value={newShipment.estimated_delivery}
                    onChange={(e) => setNewShipment({...newShipment, estimated_delivery: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    Create Shipment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {isAdmin ? 'All Shipments' : 'My Shipments'}
            </CardTitle>
            <CardDescription>
              Track and manage shipment status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                  {isAdmin && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.tracking_id}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.service_type}</TableCell>
                    <TableCell>{shipment.estimated_delivery}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Select 
                          value={shipment.status} 
                          onValueChange={(value) => updateShipmentStatus(shipment.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {isAdmin && messages.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                Customer inquiries and quote requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{message.name}</h4>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                        {message.phone && (
                          <p className="text-sm text-muted-foreground">{message.phone}</p>
                        )}
                      </div>
                      <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                        {message.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}