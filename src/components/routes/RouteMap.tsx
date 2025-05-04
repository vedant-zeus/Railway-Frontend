
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Station {
  id: string;
  name: string;
  timeFromOrigin: string;
}

interface RouteMapProps {
  stations: Station[];
  className?: string;
}

export function RouteMap({ stations, className }: RouteMapProps) {
  return (
    <Card className={cn("p-4", className)}>
      <CardContent className="p-0">
        <div className="flex flex-col space-y-1">
          {stations.map((station, index) => (
            <div key={station.id}>
              <div className="flex items-center gap-3">
                <div className="station-marker" />
                <div className="flex-1">
                  <p className="font-medium">{station.name}</p>
                  <p className="text-xs text-muted-foreground">{station.timeFromOrigin}</p>
                </div>
              </div>
              {index < stations.length - 1 && (
                <div className="ml-[6.5px] pl-[6.5px] h-8 flex items-center">
                  <div className="w-[1px] h-full bg-railway-blue-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
