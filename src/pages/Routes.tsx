
import { MainLayout } from "@/components/layout/MainLayout";
import { RouteMap, Station } from "@/components/routes/RouteMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Routes() {
  // Updated routes data with Indian railway routes
  const routes = [
    {
      id: "route-1",
      name: "Rajdhani Express",
      stations: [
        { id: "ndls", name: "New Delhi", timeFromOrigin: "00:00" },
        { id: "cnb", name: "Kanpur Central", timeFromOrigin: "04:35" },
        { id: "ald", name: "Prayagraj Junction", timeFromOrigin: "06:45" },
        { id: "mgs", name: "Mughal Sarai Junction", timeFromOrigin: "08:15" },
        { id: "gaya", name: "Gaya Junction", timeFromOrigin: "10:30" },
        { id: "dhanbad", name: "Dhanbad Junction", timeFromOrigin: "12:45" },
        { id: "hwh", name: "Howrah Junction", timeFromOrigin: "16:10" },
      ]
    },
    {
      id: "route-2",
      name: "Shatabdi Express",
      stations: [
        { id: "ndls", name: "New Delhi", timeFromOrigin: "00:00" },
        { id: "meerut", name: "Meerut City", timeFromOrigin: "01:30" },
        { id: "mzn", name: "Muzaffarnagar", timeFromOrigin: "02:15" },
        { id: "saharanpur", name: "Saharanpur", timeFromOrigin: "03:25" },
        { id: "ddn", name: "Dehradun", timeFromOrigin: "05:45" },
      ]
    },
    {
      id: "route-3",
      name: "Duronto Express",
      stations: [
        { id: "cstm", name: "Mumbai CSMT", timeFromOrigin: "00:00" },
        { id: "pune", name: "Pune Junction", timeFromOrigin: "03:30" },
        { id: "solapur", name: "Solapur", timeFromOrigin: "07:15" },
        { id: "sc", name: "Secunderabad Junction", timeFromOrigin: "13:45" },
        { id: "bza", name: "Vijayawada Junction", timeFromOrigin: "17:30" },
        { id: "mas", name: "Chennai Central", timeFromOrigin: "22:15" },
      ]
    }
  ];

  return (
    <MainLayout title="Train Routes">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Search Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search by route name or station..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {routes.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{route.name}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Details</Button>
                  <Button size="sm" variant="outline">Schedule</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="map" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="map">Route Map</TabsTrigger>
                  <TabsTrigger value="info">Route Info</TabsTrigger>
                </TabsList>
                <TabsContent value="map">
                  <RouteMap stations={route.stations} />
                </TabsContent>
                <TabsContent value="info">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Total Distance</p>
                      <p>{route.id === "route-1" ? "1,532 km" : route.id === "route-2" ? "284 km" : "1,642 km"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Duration</p>
                      <p>{route.stations[route.stations.length - 1].timeFromOrigin}</p>
                    </div>
                    <div>
                      <p className="font-medium">Operating Days</p>
                      <p>{route.id === "route-1" ? "Daily" : route.id === "route-2" ? "Except Sunday" : "Monday, Wednesday, Friday"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
