import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookedTickets } from "@/services/ticketService";

export default function TicketAvailability() {
  const bookedTickets = getBookedTickets();

  return (
    <MainLayout title="Ticket Availability">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-200 py-10">
        <div className="max-w-4xl mx-auto">
          <Card className="w-full backdrop-blur-lg bg-white/70 shadow-xl border border-white/40">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-indigo-900">
                Current Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookedTickets.length === 0 ? (
                <p className="text-muted-foreground text-gray-600">
                  No tickets have been booked yet.
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-indigo-800 font-medium">
                    Total bookings: {bookedTickets.length}
                  </p>

                  <div className="overflow-x-auto rounded-lg border border-indigo-200 bg-white/60 shadow-sm">
                    <table className="min-w-full divide-y divide-indigo-200">
                      <thead className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                            Train
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                            Route
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                            Class
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                            Seats
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-100 bg-white/70">
                        {bookedTickets.map((ticket, index) => (
                          <tr
                            key={index}
                            className="hover:bg-indigo-50 transition-all"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                              {ticket.trainNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {ticket.date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {ticket.from} → {ticket.to}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {ticket.class}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {ticket.seats}
                            </td>
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
      </div>
    </MainLayout>
  );
}
