import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useScreenSize } from "../../hooks/useScreenSize";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const screenSize = useScreenSize();

  if (isLoading || !bookings) return <Spinner />;

  if (!bookings.length) return <Empty resource={"bookings"} />;
  const isDesktop = screenSize === "desktop";
  const columns = isDesktop ? "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem" : "1fr";
  return (
    <Menus>
      <Table columns={columns}>
        {isDesktop && (
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>
        )}

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
