import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import type { BookingSummary } from "../../types";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

interface BookingRowProps {
  booking: BookingSummary;
}
function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_of_nights,
    num_of_guests,
    total_price,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName }
  }
}: BookingRowProps) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver"
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date ?? ""))
            ? "Today"
            : formatDistanceFromNow(start_date ?? "")}{" "}
          &rarr; {num_of_nights} night stay
        </span>
        <span>
          {format(new Date(start_date ?? ""), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date ?? ""), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag
        type={status ? statusToTagName[status] : statusToTagName["unconfirmed"]}
      >
        {status?.replace("-", " ") ?? "unconfirmed"}
      </Tag>

      <Amount>{formatCurrency(total_price ?? 0)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
