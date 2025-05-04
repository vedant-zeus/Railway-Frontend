
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Map, Route, TrainFront, User, Users } from "lucide-react";

type NavItem = {
  name: string;
  to: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    to: "/",
    icon: TrainFront,
  },
  {
    name: "Schedules",
    to: "/schedules",
    icon: Calendar,
  },
  {
    name: "Routes",
    to: "/routes",
    icon: Route,
  },
  {
    name: "Stations",
    to: "/stations",
    icon: Map,
  },
  {
    name: "Passengers",
    to: "/passengers",
    icon: Users,
  },
  {
    name: "Staff",
    to: "/staff",
    icon: User,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div
      className={cn(
        "bg-sidebar h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-lg">
            Rail Route
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground"
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

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  collapsed && "justify-center"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-bold">
            A
          </div>
          {!collapsed && (
            <div className="text-sidebar-foreground">
              <div className="font-medium text-sm">Admin User</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
