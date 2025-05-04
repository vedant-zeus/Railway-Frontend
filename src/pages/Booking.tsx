
import { MainLayout } from "@/components/layout/MainLayout";
import { BookingForm } from "@/components/booking/BookingForm";

export default function Booking() {
  return (
    <MainLayout title="Book Train Tickets">
      <div className="max-w-4xl mx-auto">
        <BookingForm />
      </div>
    </MainLayout>
  );
}
