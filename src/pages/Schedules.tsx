
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

  // Updated schedule data with Indian trains
  const schedules = [
    {
      trainNumber: "12301",
      origin: "Howrah Junction",
      destination: "New Delhi",
      departureTime: "16:55",
      arrivalTime: "10:00",
      status: "on-time",
      platform: "9",
    },
    {
      trainNumber: "12952",
      origin: "New Delhi",
      destination: "Mumbai Central",
      departureTime: "17:40",
      arrivalTime: "08:35",
      status: "delayed",
      platform: "3",
    },
    {
      trainNumber: "12259",
      origin: "Sealdah",
      destination: "New Delhi",
      departureTime: "14:30",
      arrivalTime: "06:25",
      status: "on-time",
      platform: "5",
    },
    {
      trainNumber: "12308",
      origin: "New Delhi",
      destination: "Jodhpur",
      departureTime: "19:40",
      arrivalTime: "07:55",
      status: "cancelled",
    },
    {
      trainNumber: "12951",
      origin: "Mumbai Central",
      destination: "New Delhi",
      departureTime: "17:40",
      arrivalTime: "08:15",
      status: "on-time",
      platform: "4",
    },
    {
      trainNumber: "12002",
      origin: "New Delhi",
      destination: "Bhopal",
      departureTime: "06:10",
      arrivalTime: "13:45",
      status: "delayed",
      platform: "1",
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
