
import { useState } from "react";
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

  // Updated stations data with Indian railway stations
  const stations: Station[] = [
    {
      id: "ndls",
      name: "New Delhi Railway Station",
      location: "New Delhi, Delhi",
      platforms: 16,
      status: "active",
      trainsPerDay: 168,
    },
    {
      id: "cstm",
      name: "Chhatrapati Shivaji Terminus",
      location: "Mumbai, Maharashtra",
      platforms: 18,
      status: "active",
      trainsPerDay: 142,
    },
    {
      id: "hwh",
      name: "Howrah Junction",
      location: "Kolkata, West Bengal",
      platforms: 23,
      status: "active",
      trainsPerDay: 135,
    },
    {
      id: "mas",
      name: "Chennai Central",
      location: "Chennai, Tamil Nadu",
      platforms: 12,
      status: "maintenance",
      trainsPerDay: 62,
    },
    {
      id: "sc",
      name: "Secunderabad Junction",
      location: "Hyderabad, Telangana",
      platforms: 10,
      status: "active",
      trainsPerDay: 96,
    },
    {
      id: "adi",
      name: "Ahmedabad Junction",
      location: "Ahmedabad, Gujarat",
      platforms: 8,
      status: "active",
      trainsPerDay: 74,
    },
    {
      id: "jp",
      name: "Jaipur Junction",
      location: "Jaipur, Rajasthan",
      platforms: 6,
      status: "closed",
      trainsPerDay: 0,
    },
    {
      id: "bbs",
      name: "Bhubaneswar Station",
      location: "Bhubaneswar, Odisha",
      platforms: 6,
      status: "active",
      trainsPerDay: 58,
    },
  ];

  // Filter stations based on search query
  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Stations">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Search Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search by station name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Trains/Day</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStations.map((station) => (
                <TableRow key={station.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{station.name}</TableCell>
                  <TableCell>{station.location}</TableCell>
                  <TableCell>{station.platforms}</TableCell>
                  <TableCell>
                    <StationStatusBadge status={station.status} />
                  </TableCell>
                  <TableCell className="text-right">{station.trainsPerDay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

function StationStatusBadge({ status }: { status: Station["status"] }) {
  const statusConfig = {
    active: { text: "Active", className: "bg-green-100 text-green-800 border-green-200" },
    maintenance: { text: "Maintenance", className: "bg-amber-100 text-amber-800 border-amber-200" },
    closed: { text: "Closed", className: "bg-red-100 text-red-800 border-red-200" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.text}
    </Badge>
  );
}
