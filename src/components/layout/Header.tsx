import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header({ title }: { title: string }) {
  return (
    <header className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-900 px-6 py-3 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-semibold text-indigo-100">{title}</h1>
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
            size={18}
          />
          <Input
            className="pl-10 w-[250px] bg-white/10 text-indigo-100 placeholder:text-indigo-300 border border-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            placeholder="Search..."
          />
        </div>

        {/* Notification Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-indigo-100 hover:bg-white/10 relative"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              2
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
