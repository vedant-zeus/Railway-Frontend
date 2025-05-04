
import { MainLayout } from "@/components/layout/MainLayout";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

export default function BookingConfirmationPage() {
  return (
    <MainLayout title="Booking Confirmation">
      <div className="max-w-4xl mx-auto">
        <BookingConfirmation />
      </div>
    </MainLayout>
  );
}
