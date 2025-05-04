
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header({ title }: { title: string }) {
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            className="pl-10 w-[250px] bg-gray-50" 
            placeholder="Search..." 
          />
        </div>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            2
          </span>
        </Button>
      </div>
    </header>
  );
}
