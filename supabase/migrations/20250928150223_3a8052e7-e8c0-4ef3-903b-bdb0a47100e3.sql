-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shipments table
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE,
  customer_id UUID,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'delayed')),
  service_type TEXT NOT NULL,
  weight DECIMAL,
  estimated_delivery DATE,
  actual_delivery DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for shipments
CREATE POLICY "Customers can view their own shipments" 
ON public.shipments 
FOR SELECT 
USING (auth.uid() = customer_id OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('admin', 'staff')
));

CREATE POLICY "Admin and staff can manage all shipments" 
ON public.shipments 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('admin', 'staff')
));

CREATE POLICY "Admin and staff can insert shipments" 
ON public.shipments 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('admin', 'staff')
));

-- Create policies for contact messages
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin and staff can view all contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('admin', 'staff')
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Generate some sample tracking IDs function
CREATE OR REPLACE FUNCTION generate_tracking_id()
RETURNS TEXT AS $$
BEGIN
  RETURN 'SL' || LPAD((RANDOM() * 999999)::INT::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Insert sample shipments data
INSERT INTO public.shipments (tracking_id, origin, destination, status, service_type, weight, estimated_delivery) VALUES
('SL123456', 'New York, NY', 'Los Angeles, CA', 'in_transit', 'Express Freight', 1500.50, '2024-01-15'),
('SL789012', 'Chicago, IL', 'Miami, FL', 'delivered', 'Standard Shipping', 800.25, '2024-01-10'),
('SL345678', 'Dallas, TX', 'Seattle, WA', 'pending', 'Warehousing', 2200.75, '2024-01-20'),
('SL901234', 'Boston, MA', 'Denver, CO', 'delayed', 'Supply Chain', 1200.00, '2024-01-18');