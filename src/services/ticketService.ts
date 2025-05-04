
// A simple in-memory ticket reservation system
// In a production app, this would be backed by a database

interface BookedTicket {
  trainNumber: string;
  date: Date;
  from: string;
  to: string;
  seats: number;
  class: string;
}

// In-memory store of booked tickets
const bookedTickets: BookedTicket[] = [];

export const checkTicketAvailability = (
  trainNumber: string,
  date: Date,
  from: string,
  to: string, 
  numPassengers: number,
  travelClass: string
): { available: boolean; remainingSeats: number } => {
  // In a real application, this would query a database
  // For this demo, we'll assume each train has 50 seats per class
  const MAX_SEATS = 50;
  
  // Find existing bookings for this train/date/class
  const existingBookings = bookedTickets.filter(
    ticket => 
      ticket.trainNumber === trainNumber &&
      ticket.date.toDateString() === date.toDateString() &&
      ticket.from === from &&
      ticket.to === to &&
      ticket.class === travelClass
  );
  
  // Calculate total booked seats
  const bookedSeats = existingBookings.reduce((total, booking) => total + booking.seats, 0);
  
  // Calculate remaining seats
  const remainingSeats = MAX_SEATS - bookedSeats;
  
  // Check if enough seats are available for the requested booking
  return {
    available: remainingSeats >= numPassengers,
    remainingSeats
  };
};

export const bookTickets = (
  trainNumber: string,
  date: Date,
  from: string,
  to: string,
  numPassengers: number,
  travelClass: string
): boolean => {
  // Check availability first
  const { available } = checkTicketAvailability(
    trainNumber,
    date,
    from,
    to,
    numPassengers,
    travelClass
  );
  
  if (!available) {
    return false;
  }
  
  // If available, create the booking
  bookedTickets.push({
    trainNumber,
    date,
    from,
    to,
    seats: numPassengers,
    class: travelClass
  });
  
  return true;
};

// For debugging/testing
export const getBookedTickets = () => [...bookedTickets];
