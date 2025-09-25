import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar
} from "react-icons/hi2";
import { BookingsAfterDateType, StaysAfterDateType } from "../../types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
interface StatsProps {
  bookings?: BookingsAfterDateType[];
  confirmedStays?: StaysAfterDateType[];
  numDays: number;
  cabinCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings: number = bookings?.length ?? 0;

  const sales =
    bookings?.reduce(
      (acc, { total_price = 0 }) =>
        acc + (typeof total_price === "number" ? total_price : 0),
      0
    ) || 0;

  const checkins = confirmedStays?.length ?? 0;

  const occupation =
    confirmedStays?.reduce(
      (acc, { num_of_nights = 0 }) =>
        acc + (typeof num_of_nights === "number" ? num_of_nights : 0),
      0
    ) || 0;

  const totalPossibleNights = numDays * cabinCount;
  const occupancyRate =
    totalPossibleNights > 0
      ? ((occupation / totalPossibleNights) * 100).toFixed(2)
      : "0.00";
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={occupancyRate + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
