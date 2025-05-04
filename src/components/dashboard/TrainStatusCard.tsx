
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TrainStatus = "on-time" | "delayed" | "cancelled";

interface TrainStatusCardProps {
  trainNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: TrainStatus;
  platform?: string;
}

export function TrainStatusCard({
  trainNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  status,
  platform,
}: TrainStatusCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{origin} → {destination}</CardTitle>
          <p className="text-sm text-muted-foreground">Train #{trainNumber}</p>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Departure</p>
            <p className="font-medium">{departureTime}</p>
          </div>
          <div className="flex-1 mx-4 h-px bg-gray-100"></div>
          <div>
            <p className="text-sm text-muted-foreground">Arrival</p>
            <p className="font-medium">{arrivalTime}</p>
          </div>
          {platform && (
            <div className="ml-6 pl-6 border-l">
              <p className="text-sm text-muted-foreground">Platform</p>
              <p className="font-medium">{platform}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: TrainStatus }) {
  const statusConfig = {
    "on-time": { text: "On Time", className: "bg-green-100 text-green-800 border-green-200" },
    "delayed": { text: "Delayed", className: "bg-amber-100 text-amber-800 border-amber-200" },
    "cancelled": { text: "Cancelled", className: "bg-red-100 text-red-800 border-red-200" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.text}
    </Badge>
  );
}
