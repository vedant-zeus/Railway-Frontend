import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const stations = [
  "New Delhi",
  "Mumbai Central",
  "Chennai Central",
  "Kolkata Howrah",
  "Bengaluru City",
  "Hyderabad Deccan",
  "Ahmedabad Junction",
  "Pune Junction",
  "Jaipur Junction",
  "Lucknow",
  "Kanpur Central",
  "Bhopal Junction",
  "Secunderabad",
];

export function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: new Date(),
    passengers: "1",
    class: "sleeper",
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/booking/passengers", { state: formData });
  };

  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-indigo-900 font-bold">
          Book Your Train Ticket
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="from" className="font-medium text-sm text-indigo-900">From</label>
              <Select 
                value={formData.from} 
                onValueChange={(value) => setFormData({...formData, from: value})}
                required
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Select departure station" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station} value={station}>
                      {station}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="to" className="font-medium text-sm text-indigo-900">To</label>
              <Select 
                value={formData.to} 
                onValueChange={(value) => setFormData({...formData, to: value})}
                required
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Select arrival station" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station} value={station}>
                      {station}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-sm text-indigo-900">Travel Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/70 backdrop-blur-sm hover:bg-white/90",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-indigo-700" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({...formData, date})}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm text-indigo-900">Passengers</label>
              <Select 
                value={formData.passengers} 
                onValueChange={(value) => setFormData({...formData, passengers: value})}
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6"].map((num) => (
                    <SelectItem key={num} value={num}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm text-indigo-900">Class</label>
              <Select 
                value={formData.class} 
                onValueChange={(value) => setFormData({...formData, class: value})}
              >
                <SelectTrigger className="bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                  <SelectItem value="ac3">AC 3-Tier</SelectItem>
                  <SelectItem value="ac2">AC 2-Tier</SelectItem>
                  <SelectItem value="ac1">AC 1st Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Search Trains
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
