import { useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Schedules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("today");

  const schedules = [
    { trainNumber: "12301", origin: "Howrah Junction", destination: "New Delhi", departureTime: "16:55", arrivalTime: "10:00", status: "on-time", platform: "9" },
    { trainNumber: "12952", origin: "New Delhi", destination: "Mumbai Central", departureTime: "17:40", arrivalTime: "08:35", status: "delayed", platform: "3" },
    { trainNumber: "12259", origin: "Sealdah", destination: "New Delhi", departureTime: "14:30", arrivalTime: "06:25", status: "on-time", platform: "5" },
    { trainNumber: "12308", origin: "New Delhi", destination: "Jodhpur", departureTime: "19:40", arrivalTime: "07:55", status: "cancelled" },
    { trainNumber: "12951", origin: "Mumbai Central", destination: "New Delhi", departureTime: "17:40", arrivalTime: "08:15", status: "on-time", platform: "4" },
    { trainNumber: "12002", origin: "New Delhi", destination: "Bhopal", departureTime: "06:10", arrivalTime: "13:45", status: "delayed", platform: "1" },
  ];

  const filteredSchedules = schedules.filter(
    (s) =>
      s.trainNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Train Schedules">
      {/* Animated Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          className="mb-6 bg-gradient-to-br from-blue-50/60 via-indigo-100/50 to-purple-200/60 backdrop-blur-lg border border-indigo-200/40 shadow-lg rounded-2xl"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-indigo-900">
              Search Schedules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-700" size={18} />
                <Input
                  className="pl-10 border-indigo-300/50 focus:border-indigo-500 focus:ring-indigo-400 bg-white/70 backdrop-blur-sm shadow-sm"
                  placeholder="Search by train number, origin, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-[180px]">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger id="date" className="bg-white/70 border-indigo-300/50 focus:ring-indigo-400">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-gradient-to-br from-blue-50/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-md shadow-md">
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md rounded-xl transition-all duration-300 hover:shadow-indigo-500/40"
                >
                  <Calendar size={16} /> Select Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Train Schedule Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {filteredSchedules.map((schedule) => (
          <motion.div
            key={schedule.trainNumber}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <TrainStatusCard
              trainNumber={schedule.trainNumber}
              origin={schedule.origin}
              destination={schedule.destination}
              departureTime={schedule.departureTime}
              arrivalTime={schedule.arrivalTime}
              status={schedule.status as "on-time" | "delayed" | "cancelled"}
              platform={schedule.platform}
            />
          </motion.div>
        ))}
      </motion.div>
    </MainLayout>
  );
}
