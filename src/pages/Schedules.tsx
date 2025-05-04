
import { useState } from "react";
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

  // Mock schedule data
  const schedules = [
    {
      trainNumber: "EX2103",
      origin: "New York",
      destination: "Boston",
      departureTime: "08:30 AM",
      arrivalTime: "12:45 PM",
      status: "on-time",
      platform: "4A",
    },
    {
      trainNumber: "LC7845",
      origin: "Chicago",
      destination: "Detroit",
      departureTime: "09:15 AM",
      arrivalTime: "11:50 AM",
      status: "delayed",
      platform: "2B",
    },
    {
      trainNumber: "HF5423",
      origin: "San Francisco",
      destination: "Los Angeles",
      departureTime: "10:00 AM",
      arrivalTime: "04:30 PM",
      status: "on-time",
      platform: "8C",
    },
    {
      trainNumber: "RE3267",
      origin: "Washington DC",
      destination: "Philadelphia",
      departureTime: "11:45 AM",
      arrivalTime: "01:30 PM",
      status: "cancelled",
    },
    {
      trainNumber: "SP9012",
      origin: "Seattle",
      destination: "Portland",
      departureTime: "02:15 PM",
      arrivalTime: "04:45 PM",
      status: "on-time",
      platform: "1D",
    },
    {
      trainNumber: "NE4526",
      origin: "Boston",
      destination: "New York",
      departureTime: "03:30 PM",
      arrivalTime: "07:45 PM",
      status: "delayed",
      platform: "5B",
    }
  ];

  // Filter schedules based on search query
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.trainNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Train Schedules">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Search Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search by train number, origin, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger id="date">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="flex items-center gap-2">
                <Calendar size={16} /> Select Date
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredSchedules.map((schedule) => (
          <TrainStatusCard
            key={schedule.trainNumber}
            trainNumber={schedule.trainNumber}
            origin={schedule.origin}
            destination={schedule.destination}
            departureTime={schedule.departureTime}
            arrivalTime={schedule.arrivalTime}
            status={schedule.status as "on-time" | "delayed" | "cancelled"}
            platform={schedule.platform}
          />
        ))}
      </div>
    </MainLayout>
  );
}
