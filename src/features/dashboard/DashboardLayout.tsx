import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
// import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { BREAKPOINTS } from "../../utils/constants";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    grid-template-rows: auto auto 34rem auto;
    gap: 1.6rem;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    gap: 1.2rem;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    confirmedStays,
    numDays,
    isLoading: isLoadingStays
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins;

  return (
    <StyledDashboardLayout>
      {isLoading ? (
        <></>
      ) : (
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins?.length ?? 0}
        />
      )}
      <TodayActivity />
      {isLoadingStays ? (
        <></>
      ) : (
        <DurationChart confirmedStays={confirmedStays} />
      )}
      {isLoadingBookings ? (
        <></>
      ) : (
        <SalesChart bookings={bookings} numDays={numDays} />
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
