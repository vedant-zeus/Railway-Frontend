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
    const numPassengers = bookingDetails.passengers?.length || 0;
    const success = bookTickets(
      bookingDetails.trainNumber, 
      bookingDetails.date instanceof Date ? bookingDetails.date : new Date(), 
      bookingDetails.from,
      bookingDetails.to,
      numPassengers,
      bookingDetails.class
    );
    
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
    <Card className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-indigo-900 font-bold">
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
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-200 rounded-lg">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Check className="text-indigo-700 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-900">Ticket Confirmed</h3>
                <p className="text-indigo-800 mt-1">Your journey is booked and ready!</p>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <Ticket className="mr-2 text-indigo-700" />
                <h3 className="font-bold text-lg text-indigo-900">PNR: {pnrNumber}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-indigo-700/70">Train</p>
                  <p className="font-medium text-indigo-900">{bookingDetails.trainNumber} - {bookingDetails.trainName}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-700/70">Date</p>
                  <p className="font-medium text-indigo-900">
                    {bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString() : 'Invalid date'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-indigo-700/70">From</p>
                  <p className="font-medium text-indigo-900">{bookingDetails.from}</p>
                  <p className="text-sm text-indigo-800/80">{bookingDetails.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-700/70">To</p>
                  <p className="font-medium text-indigo-900">{bookingDetails.to}</p>
                  <p className="text-sm text-indigo-800/80">{bookingDetails.arrivalTime}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-indigo-900">Passenger Details</h4>
                <div className="space-y-2">
                  {bookingDetails.passengers.map((passenger: any, i: number) => (
                    <div key={i} className="border-b border-indigo-200 pb-2 last:border-0">
                      <p className="font-medium text-indigo-800">
                        {passenger.name} ({passenger.gender === 'male' ? 'M' : passenger.gender === 'female' ? 'F' : 'O'}, {passenger.age})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-indigo-700/70">Train</p>
                  <p className="font-semibold text-indigo-900">{bookingDetails.trainNumber} - {bookingDetails.trainName}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-700/70">Date</p>
                  <p className="font-semibold text-indigo-900">
                    {bookingDetails.date instanceof Date ? bookingDetails.date.toLocaleDateString() : 'Invalid date'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-indigo-700/70">From</p>
                  <p className="font-semibold text-indigo-900">{bookingDetails.from}</p>
                  <p className="text-sm text-indigo-800/80">{bookingDetails.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-700/70">To</p>
                  <p className="font-semibold text-indigo-900">{bookingDetails.to}</p>
                  <p className="text-sm text-indigo-800/80">{bookingDetails.arrivalTime}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-indigo-700/70">Class</p>
                <p className="font-semibold text-indigo-900">
                  {bookingDetails.class === 'ac1' ? 'AC 1st Class' :
                   bookingDetails.class === 'ac2' ? 'AC 2-Tier' :
                   bookingDetails.class === 'ac3' ? 'AC 3-Tier' :
                   bookingDetails.class === 'sleeper' ? 'Sleeper' : 'General'}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2 text-indigo-900">Passenger Details</h4>
              <div className="space-y-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl">
                {bookingDetails.passengers.map((passenger: any, i: number) => (
                  <div key={i} className="flex justify-between border-b border-indigo-200 pb-2 last:border-0">
                    <p className="text-indigo-900">{passenger.name}</p>
                    <p className="text-indigo-800/80">
                      {passenger.gender === 'male' ? 'Male' : passenger.gender === 'female' ? 'Female' : 'Other'}, {passenger.age}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2 text-indigo-900">Payment Details</h4>
              <div className="space-y-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex justify-between text-indigo-900">
                  <p>Base fare</p>
                  <p>₹{(bookingDetails.fare * 0.9).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-indigo-900">
                  <p>GST (10%)</p>
                  <p>₹{(bookingDetails.fare * 0.1).toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-indigo-200 pt-2 text-indigo-900">
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
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Return to Dashboard
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition" 
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
