import { useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Station {
  id: string;
  name: string;
  location: string;
  platforms: number;
  status: "active" | "maintenance" | "closed";
  trainsPerDay: number;
}

export default function Stations() {
  const [searchQuery, setSearchQuery] = useState("");

  const stations: Station[] = [
    { id: "ndls", name: "New Delhi Railway Station", location: "New Delhi, Delhi", platforms: 16, status: "active", trainsPerDay: 168 },
    { id: "cstm", name: "Chhatrapati Shivaji Terminus", location: "Mumbai, Maharashtra", platforms: 18, status: "active", trainsPerDay: 142 },
    { id: "hwh", name: "Howrah Junction", location: "Kolkata, West Bengal", platforms: 23, status: "active", trainsPerDay: 135 },
    { id: "mas", name: "Chennai Central", location: "Chennai, Tamil Nadu", platforms: 12, status: "maintenance", trainsPerDay: 62 },
    { id: "sc", name: "Secunderabad Junction", location: "Hyderabad, Telangana", platforms: 10, status: "active", trainsPerDay: 96 },
    { id: "adi", name: "Ahmedabad Junction", location: "Ahmedabad, Gujarat", platforms: 8, status: "active", trainsPerDay: 74 },
    { id: "jp", name: "Jaipur Junction", location: "Jaipur, Rajasthan", platforms: 6, status: "closed", trainsPerDay: 0 },
    { id: "bbs", name: "Bhubaneswar Station", location: "Bhubaneswar, Odisha", platforms: 6, status: "active", trainsPerDay: 58 },
  ];

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Stations">
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="mb-6 bg-gradient-to-br from-blue-50/60 via-indigo-100/50 to-purple-200/60 backdrop-blur-lg border border-indigo-200/40 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-indigo-900">
              Search Stations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-700" size={18} />
              <Input
                className="pl-10 border-indigo-300/50 focus:border-indigo-500 focus:ring-indigo-400 bg-white/70 backdrop-blur-sm shadow-sm"
                placeholder="Search by station name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="bg-gradient-to-br from-blue-50/50 via-indigo-100/50 to-purple-200/50 backdrop-blur-xl border border-indigo-200/40 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gradient-to-r from-indigo-100/60 via-purple-100/60 to-blue-50/60">
                <TableRow>
                  <TableHead className="text-indigo-900 font-semibold">Station Name</TableHead>
                  <TableHead className="text-indigo-900 font-semibold">Location</TableHead>
                  <TableHead className="text-indigo-900 font-semibold">Platforms</TableHead>
                  <TableHead className="text-indigo-900 font-semibold">Status</TableHead>
                  <TableHead className="text-right text-indigo-900 font-semibold">Trains/Day</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStations.map((station) => (
                  <motion.tr
                    key={station.id}
                    className="cursor-pointer hover:bg-indigo-50/60 transition-all duration-300"
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(238,242,255,0.8)" }}
                  >
                    <TableCell className="font-medium text-gray-800">{station.name}</TableCell>
                    <TableCell className="text-gray-700">{station.location}</TableCell>
                    <TableCell className="text-gray-700">{station.platforms}</TableCell>
                    <TableCell>
                      <StationStatusBadge status={station.status} />
                    </TableCell>
                    <TableCell className="text-right text-gray-700">{station.trainsPerDay}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
}

function StationStatusBadge({ status }: { status: Station["status"] }) {
  const statusConfig = {
    active: {
      text: "Active",
      className: "bg-green-100/80 text-green-800 border-green-200 backdrop-blur-sm",
    },
    maintenance: {
      text: "Maintenance",
      className: "bg-amber-100/80 text-amber-800 border-amber-200 backdrop-blur-sm",
    },
    closed: {
      text: "Closed",
      className: "bg-red-100/80 text-red-800 border-red-200 backdrop-blur-sm",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`rounded-lg px-2 py-1 font-medium shadow-sm ${config.className}`}
    >
      {config.text}
    </Badge>
  );
}
