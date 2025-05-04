
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookedTickets } from "@/services/ticketService";

export default function TicketAvailability() {
  const bookedTickets = getBookedTickets();
  
  return (
    <MainLayout title="Ticket Availability">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Current Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookedTickets.length === 0 ? (
              <p className="text-muted-foreground">No tickets have been booked yet.</p>
            ) : (
              <div className="space-y-4">
                <p>Total bookings: {bookedTickets.length}</p>
                
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookedTickets.map((ticket, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{ticket.trainNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ticket.date.toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ticket.from} → {ticket.to}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ticket.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ticket.seats}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
