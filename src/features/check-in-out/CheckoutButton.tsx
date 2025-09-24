import Button from "../../ui/Button";

interface CheckoutButtonProps {
  bookingId: number;
}
function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
