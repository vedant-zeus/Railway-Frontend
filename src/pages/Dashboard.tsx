
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
          value="218" 
          icon={<TrainFront size={18} />} 
          description="+12% from last month" 
        />
        <StatCard 
          title="Total Routes" 
          value="358" 
          icon={<Route size={18} />} 
          description="4 routes added this week" 
        />
        <StatCard 
          title="Total Stations" 
          value="7,325" 
          icon={<Map size={18} />} 
        />
        <StatCard 
          title="Today's Bookings" 
          value="214,528" 
          icon={<Calendar size={18} />} 
          description="+8% from yesterday" 
        />
        <StatCard 
          title="Passengers" 
          value="2.4M" 
          icon={<Users size={18} />} 
          description="Monthly average" 
        />
        <StatCard 
          title="Staff on Duty" 
          value="23,451" 
          icon={<User size={18} />} 
        />
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Active Trains</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrainStatusCard 
          trainNumber="12301"
          origin="Howrah Junction"
          destination="New Delhi"
          departureTime="16:55"
          arrivalTime="10:00"
          status="on-time"
          platform="9"
        />
        <TrainStatusCard 
          trainNumber="12952"
          origin="New Delhi"
          destination="Mumbai Central"
          departureTime="17:40"
          arrivalTime="08:35"
          status="delayed"
          platform="3"
        />
        <TrainStatusCard 
          trainNumber="12259"
          origin="Sealdah"
          destination="New Delhi"
          departureTime="14:30"
          arrivalTime="06:25"
          status="on-time"
          platform="5"
        />
        <TrainStatusCard 
          trainNumber="12308"
          origin="New Delhi"
          destination="Jodhpur"
          departureTime="19:40"
          arrivalTime="07:55"
          status="cancelled"
        />
      </div>
    </MainLayout>
  );
}
