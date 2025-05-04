import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Ticket, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { bookTickets, checkTicketAvailability } from "@/services/ticketService";

export function BookingConfirmation() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [ticketAvailability, setTicketAvailability] = useState<{
    available: boolean;
    remainingSeats: number;
    checked: boolean;
  }>({ available: true, remainingSeats: 0, checked: false });
  
  const pnrNumber = "PNR" + Math.floor(Math.random() * 9000000 + 1000000);
  
  if (!bookingDetails) {
    toast({
      title: "Error",
      description: "Booking information is missing. Please start over.",
      variant: "destructive",
    });
    navigate("/booking");
    return null;
  }
  
  // Check ticket availability if not already checked
  if (!ticketAvailability.checked) {
    const numPassengers = bookingDetails.passengers?.length || 0;
    const result = checkTicketAvailability(
      bookingDetails.trainNumber, 
      bookingDetails.date instanceof Date ? bookingDetails.date : new Date(), 
      bookingDetails.from,
      bookingDetails.to,
      numPassengers,
      bookingDetails.class
    );
    
    setTicketAvailability({
      ...result,
      checked: true
    });
  }
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Check availability again at time of booking (to handle race conditions)
    const numPassengers = bookingDetails.passengers?.length || 0;
    const success = bookTickets(
      bookingDetails.trainNumber, 
      bookingDetails.date instanceof Date ? bookingDetails.date : new Date(), 
      bookingDetails.from,
      bookingDetails.to,
      numPassengers,
      bookingDetails.class
    );
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      if (success) {
        setIsBooked(true);
        toast({
          title: "Booking Successful",
          description: `Your booking (PNR: ${pnrNumber}) has been confirmed!`,
        });
      } else {
        toast({
          title: "Booking Failed",
          description: "These tickets are no longer available. Please select a different train or travel date.",
          variant: "destructive",
        });
      }
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isBooked ? "Booking Confirmed!" : "Booking Summary"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!ticketAvailability.available && !isBooked ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Sorry, these tickets are no longer available. Only {ticketAvailability.remainingSeats} seats left, but you need {bookingDetails.passengers?.length || 0}.
            </AlertDescription>
          </Alert>
        ) : null}
      
        {isBooked ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Ticket Confirmed</h3>
                <p className="text-green-700 mt-1">Your journey is booked and ready!</p>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Ticket className="mr-2" />
                <h3 className="font-bold text-lg">PNR: {pnrNumber}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Train</p>
                  <p className="font-medium">{bookingDetails.trainNumber} - {bookingDetails.trainName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString() : 'Invalid date'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{bookingDetails.from}</p>
                  <p className="text-sm">{bookingDetails.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{bookingDetails.to}</p>
                  <p className="text-sm">{bookingDetails.arrivalTime}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Passenger Details</h4>
                <div className="space-y-2">
                  {bookingDetails.passengers.map((passenger: any, i: number) => (
                    <div key={i} className="border-b pb-2 last:border-0">
                      <p className="font-medium">{passenger.name} ({passenger.gender === 'male' ? 'M' : passenger.gender === 'female' ? 'F' : 'O'}, {passenger.age})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Train</p>
                  <p className="font-semibold">{bookingDetails.trainNumber} - {bookingDetails.trainName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString() : 'Invalid date'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-semibold">{bookingDetails.from}</p>
                  <p className="text-sm">{bookingDetails.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-semibold">{bookingDetails.to}</p>
                  <p className="text-sm">{bookingDetails.arrivalTime}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-semibold">
                  {bookingDetails.class === 'ac1' ? 'AC 1st Class' :
                   bookingDetails.class === 'ac2' ? 'AC 2-Tier' :
                   bookingDetails.class === 'ac3' ? 'AC 3-Tier' :
                   bookingDetails.class === 'sleeper' ? 'Sleeper' : 'General'}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Passenger Details</h4>
              <div className="space-y-3">
                {bookingDetails.passengers.map((passenger: any, i: number) => (
                  <div key={i} className="flex justify-between border-b pb-2 last:border-0">
                    <p>{passenger.name}</p>
                    <p>{passenger.gender === 'male' ? 'Male' : passenger.gender === 'female' ? 'Female' : 'Other'}, {passenger.age}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Base fare</p>
                  <p>₹{(bookingDetails.fare * 0.9).toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>GST (10%)</p>
                  <p>₹{(bookingDetails.fare * 0.1).toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <p>Total Amount</p>
                  <p>₹{bookingDetails.fare.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isBooked ? (
          <div className="w-full flex flex-col space-y-2">
            <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={handlePayment}
            disabled={isProcessing || !ticketAvailability.available}
          >
            {isProcessing ? "Processing..." : ticketAvailability.available ? `Pay ₹${bookingDetails.fare.toFixed(2)}` : "Tickets Unavailable"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
