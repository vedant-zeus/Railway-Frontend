
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { Calendar, Map, Route, TrainFront, User, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Active Trains" 
          value="42" 
          icon={<TrainFront size={18} />} 
          description="+12% from last month" 
        />
        <StatCard 
          title="Total Routes" 
          value="128" 
          icon={<Route size={18} />} 
          description="4 routes added this week" 
        />
        <StatCard 
          title="Total Stations" 
          value="78" 
          icon={<Map size={18} />} 
        />
        <StatCard 
          title="Today's Bookings" 
          value="1,284" 
          icon={<Calendar size={18} />} 
          description="+8% from yesterday" 
        />
        <StatCard 
          title="Passengers" 
          value="24.8k" 
          icon={<Users size={18} />} 
          description="Monthly average" 
        />
        <StatCard 
          title="Staff on Duty" 
          value="312" 
          icon={<User size={18} />} 
        />
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Active Trains</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrainStatusCard 
          trainNumber="EX2103"
          origin="New York"
          destination="Boston"
          departureTime="08:30 AM"
          arrivalTime="12:45 PM"
          status="on-time"
          platform="4A"
        />
        <TrainStatusCard 
          trainNumber="LC7845"
          origin="Chicago"
          destination="Detroit"
          departureTime="09:15 AM"
          arrivalTime="11:50 AM"
          status="delayed"
          platform="2B"
        />
        <TrainStatusCard 
          trainNumber="HF5423"
          origin="San Francisco"
          destination="Los Angeles"
          departureTime="10:00 AM"
          arrivalTime="04:30 PM"
          status="on-time"
          platform="8C"
        />
        <TrainStatusCard 
          trainNumber="RE3267"
          origin="Washington DC"
          destination="Philadelphia"
          departureTime="11:45 AM"
          arrivalTime="01:30 PM"
          status="cancelled"
        />
      </div>
    </MainLayout>
  );
}
