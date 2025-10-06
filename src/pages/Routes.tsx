import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { RouteMap } from "@/components/routes/RouteMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Routes() {
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
      ],
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
      ],
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
      ],
    },
  ];

  return (
    <MainLayout title="Train Routes">
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 rounded-xl p-6 shadow-inner overflow-hidden">
        {/* Glowing background orbs */}
        <div className="absolute -top-20 right-0 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-8"
        >
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text font-extrabold">
                Search Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10 bg-white/70 dark:bg-slate-700/50 border-none focus:ring-2 focus:ring-indigo-400 transition-all rounded-xl"
                  placeholder="Search by route name or station..."
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Routes List */}
        <div className="grid grid-cols-1 gap-6 relative z-10">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="transition-all duration-300"
            >
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
                      {route.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="map" className="w-full">
                    <TabsList className="mb-4 bg-white/50 dark:bg-slate-700/50 rounded-xl backdrop-blur-md">
                      <TabsTrigger
                        value="map"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all rounded-lg"
                      >
                        Route Map
                      </TabsTrigger>
                      <TabsTrigger
                        value="info"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all rounded-lg"
                      >
                        Route Info
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="map">
                      <RouteMap stations={route.stations} />
                    </TabsContent>

                    <TabsContent value="info">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Total Distance</p>
                          <p>
                            {route.id === "route-1"
                              ? "1,532 km"
                              : route.id === "route-2"
                              ? "284 km"
                              : "1,642 km"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Total Duration</p>
                          <p>{route.stations[route.stations.length - 1].timeFromOrigin}</p>
                        </div>
                        <div>
                          <p className="font-medium">Operating Days</p>
                          <p>
                            {route.id === "route-1"
                              ? "Daily"
                              : route.id === "route-2"
                              ? "Except Sunday"
                              : "Monday, Wednesday, Friday"}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
