
import { MainLayout } from "@/components/layout/MainLayout";
import { RouteMap, Station } from "@/components/routes/RouteMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Routes() {
  // Mocked routes data
  const routes = [
    {
      id: "route-1",
      name: "East Coast Express",
      stations: [
        { id: "nyc", name: "New York City", timeFromOrigin: "00:00" },
        { id: "ph", name: "Philadelphia", timeFromOrigin: "01:30" },
        { id: "bm", name: "Baltimore", timeFromOrigin: "02:45" },
        { id: "wdc", name: "Washington DC", timeFromOrigin: "03:30" },
        { id: "rc", name: "Richmond", timeFromOrigin: "05:15" },
        { id: "char", name: "Charlotte", timeFromOrigin: "08:00" },
        { id: "atl", name: "Atlanta", timeFromOrigin: "10:30" },
      ]
    },
    {
      id: "route-2",
      name: "West Coast Line",
      stations: [
        { id: "sea", name: "Seattle", timeFromOrigin: "00:00" },
        { id: "por", name: "Portland", timeFromOrigin: "03:25" },
        { id: "eug", name: "Eugene", timeFromOrigin: "05:10" },
        { id: "sac", name: "Sacramento", timeFromOrigin: "09:45" },
        { id: "sf", name: "San Francisco", timeFromOrigin: "11:15" },
        { id: "sj", name: "San Jose", timeFromOrigin: "12:00" },
        { id: "la", name: "Los Angeles", timeFromOrigin: "16:30" },
      ]
    },
    {
      id: "route-3",
      name: "Midwest Connector",
      stations: [
        { id: "chi", name: "Chicago", timeFromOrigin: "00:00" },
        { id: "mil", name: "Milwaukee", timeFromOrigin: "01:30" },
        { id: "mad", name: "Madison", timeFromOrigin: "02:45" },
        { id: "min", name: "Minneapolis", timeFromOrigin: "05:00" },
        { id: "dlt", name: "Duluth", timeFromOrigin: "07:15" },
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
                      <p>1,245 km</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Duration</p>
                      <p>{route.stations[route.stations.length - 1].timeFromOrigin}</p>
                    </div>
                    <div>
                      <p className="font-medium">Operating Days</p>
                      <p>Monday to Friday</p>
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
