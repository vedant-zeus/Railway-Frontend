import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Map, Route, Ticket, TrainFront, User, Users } from "lucide-react";

type NavItem = {
  name: string;
  to: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", to: "/", icon: TrainFront },
  { name: "Schedules", to: "/schedules", icon: Calendar },
  { name: "Book Tickets", to: "/booking", icon: Ticket },
  { name: "Routes", to: "/routes", icon: Route },
  { name: "Stations", to: "/stations", icon: Map },
  { name: "Passengers", to: "/passengers", icon: Users },
  { name: "Staff", to: "/staff", icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        // Gradient background and subtle border for contrast
        "bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-200 border-r border-indigo-200 h-screen flex flex-col transition-all duration-300 shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header / Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-200">
        {!collapsed && (
          <div className="text-indigo-800 font-bold text-lg tracking-wide">
            Rail Route
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-indigo-700 hover:bg-indigo-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-indigo-900 hover:bg-indigo-200/70 hover:text-indigo-800 transition-colors font-medium",
                    isActive &&
                      "bg-indigo-300/70 text-indigo-900 font-semibold shadow-sm",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / User Info */}
      <div className="p-4 border-t border-indigo-200 bg-indigo-50/50">
        <div
          className={cn("flex items-center gap-3", collapsed && "justify-center")}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          {!collapsed && (
            <div className="text-indigo-900">
              <div className="font-medium text-sm">Admin User</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
