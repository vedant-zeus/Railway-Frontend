
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrainFront } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-railway-blue-600">
          <TrainFront size={64} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! This station doesn't exist on our railway map.
        </p>
        <Button asChild className="bg-railway-blue-600 hover:bg-railway-blue-700">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
