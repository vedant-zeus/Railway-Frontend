import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrainStatusCard } from "@/components/dashboard/TrainStatusCard";
import { Button } from "@/components/ui/button";
import { Calendar, Map, Route, Ticket, TrainFront, User, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      {/* Background Gradient */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 rounded-xl p-6 shadow-inner overflow-hidden">
        
        {/* Decorative glowing circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 drop-shadow-sm">
            System Overview
          </h1>
          <Link to="/booking">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Ticket size={18} />
              Book Tickets
            </Button>
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            { title: "Active Trains", value: "218", icon: <TrainFront size={18} />, desc: "+12% from last month" },
            { title: "Total Routes", value: "358", icon: <Route size={18} />, desc: "4 routes added this week" },
            { title: "Total Stations", value: "7,325", icon: <Map size={18} /> },
            { title: "Today's Bookings", value: "214,528", icon: <Calendar size={18} />, desc: "+8% from yesterday" },
            { title: "Passengers", value: "2.4M", icon: <Users size={18} />, desc: "Monthly average" },
            { title: "Staff on Duty", value: "23,451", icon: <User size={18} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.desc}
              />
            </motion.div>
          ))}
        </div>

        {/* Active Trains Section */}
        <h2 className="text-2xl font-bold mt-10 mb-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
          Active Trains
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {[
            { num: "12301", o: "Howrah Junction", d: "New Delhi", dep: "16:55", arr: "10:00", s: "on-time", p: "9" },
            { num: "12952", o: "New Delhi", d: "Mumbai Central", dep: "17:40", arr: "08:35", s: "delayed", p: "3" },
            { num: "12259", o: "Sealdah", d: "New Delhi", dep: "14:30", arr: "06:25", s: "on-time", p: "5" },
            { num: "12308", o: "New Delhi", d: "Jodhpur", dep: "19:40", arr: "07:55", s: "cancelled" },
          ].map((train, i) => (
            <motion.div
              key={train.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="transition-all duration-300"
            >
              <TrainStatusCard
                trainNumber={train.num}
                origin={train.o}
                destination={train.d}
                departureTime={train.dep}
                arrivalTime={train.arr}
                status={train.s}
                platform={train.p}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
