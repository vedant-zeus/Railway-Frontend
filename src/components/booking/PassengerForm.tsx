
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Passenger {
  name: string;
  age: string;
  gender: string;
  berth: string;
}

export function PassengerForm() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingInfo = location.state;
  
  const initialPassengers = Array(Number(bookingInfo?.passengers || 1))
    .fill(null)
    .map(() => ({ name: "", age: "", gender: "", berth: "" }));
  
  const [passengers, setPassengers] = useState<Passenger[]>(initialPassengers);
  const [contact, setContact] = useState({ email: "", phone: "" });

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleContactChange = (field: "email" | "phone", value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation logic could be added here
    const bookingDetails = {
      ...bookingInfo,
      passengers,
      contact,
      trainNumber: "12301",
      trainName: "Rajdhani Express",
      departureTime: "16:55",
      arrivalTime: "10:00",
      fare: calculateFare(bookingInfo?.class, passengers.length)
    };
    
    navigate("/booking/confirmation", { state: bookingDetails });
  };

  const calculateFare = (travelClass: string, numPassengers: number) => {
    // Simple fare calculation based on class
    const baseFare = {
      general: 250,
      sleeper: 500,
      ac3: 1200,
      ac2: 1800,
      ac1: 2500
    }[travelClass || 'sleeper'] || 500;
    
    return baseFare * numPassengers;
  };

  if (!bookingInfo) {
    toast({
      title: "Error",
      description: "Booking information is missing. Please start over.",
      variant: "destructive",
    });
    navigate("/booking");
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Passenger Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="text-lg font-medium">Journey Details</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-md">
              <div>
                <span className="text-sm font-medium block">From - To</span>
                <span>{bookingInfo.from} - {bookingInfo.to}</span>
              </div>
              <div>
                <span className="text-sm font-medium block">Date</span>
                <span>{bookingInfo.date instanceof Date ? bookingInfo.date.toLocaleDateString() : 'Invalid date'}</span>
              </div>
              <div>
                <span className="text-sm font-medium block">Class</span>
                <span>
                  {bookingInfo.class === 'ac1' ? 'AC 1st Class' :
                   bookingInfo.class === 'ac2' ? 'AC 2-Tier' :
                   bookingInfo.class === 'ac3' ? 'AC 3-Tier' :
                   bookingInfo.class === 'sleeper' ? 'Sleeper' : 'General'}
                </span>
              </div>
            </div>
          </div>

          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-4 border-b pb-4 last:border-0">
              <div className="text-lg font-medium">Passenger {index + 1}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor={`name-${index}`} className="font-medium text-sm">Full Name</label>
                  <Input
                    id={`name-${index}`}
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={`age-${index}`} className="font-medium text-sm">Age</label>
                  <Input
                    id={`age-${index}`}
                    type="number"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor={`gender-${index}`} className="font-medium text-sm">Gender</label>
                  <Select
                    value={passenger.gender}
                    onValueChange={(value) => handlePassengerChange(index, "gender", value)}
                    required
                  >
                    <SelectTrigger id={`gender-${index}`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor={`berth-${index}`} className="font-medium text-sm">Berth Preference</label>
                  <Select
                    value={passenger.berth}
                    onValueChange={(value) => handlePassengerChange(index, "berth", value)}
                  >
                    <SelectTrigger id={`berth-${index}`}>
                      <SelectValue placeholder="Select berth preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lower">Lower</SelectItem>
                      <SelectItem value="middle">Middle</SelectItem>
                      <SelectItem value="upper">Upper</SelectItem>
                      <SelectItem value="side-lower">Side Lower</SelectItem>
                      <SelectItem value="side-upper">Side Upper</SelectItem>
                      <SelectItem value="any">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <div className="text-lg font-medium">Contact Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="font-medium text-sm">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="font-medium text-sm">Phone</label>
                <Input
                  id="phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Continue to Payment</Button>
        </form>
      </CardContent>
    </Card>
  );
}
