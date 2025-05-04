
import { MainLayout } from "@/components/layout/MainLayout";
import { PassengerForm } from "@/components/booking/PassengerForm";

export default function BookingPassengers() {
  return (
    <MainLayout title="Passenger Details">
      <div className="max-w-4xl mx-auto">
        <PassengerForm />
      </div>
    </MainLayout>
  );
}
