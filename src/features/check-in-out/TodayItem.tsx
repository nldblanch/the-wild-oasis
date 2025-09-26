import styled from "styled-components";
import { StaysTodayActivityType } from "../../types";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { BREAKPOINTS } from "../../utils/constants";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 0;
  }
`;

const DesktopLayout = styled.div`
  display: contents;

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
`;

const FlexRow = styled.div`
  display: none;

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0 1.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    justify-content: space-between;
  }
`;

const MobileLayout = styled.div`
  display: none;

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    align-items: center;
    justify-content: center;
  }
`;

const Guest = styled.div`
  font-weight: 500;

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const Nights = styled.div`
  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.2rem;
    color: var(--color-grey-600);
  }
`;

interface TodayItemProps {
  activity: StaysTodayActivityType;
}

function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, num_of_nights } = activity;
  return (
    <StyledTodayItem>
      {/* Desktop layout */}
      <DesktopLayout>
        {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
        {status === "checked-in" && <Tag type="blue">Departing</Tag>}
        <Flag src={guests.country_flag} alt={`Flag of ${guests.nationality}`} />
        <Guest>{guests.full_name}</Guest>
        <Nights>
          {num_of_nights ?? 0} night{(num_of_nights ?? 0) > 1 && "s"}
        </Nights>
        {status === "unconfirmed" && (
          <Button
            size="small"
            variation="primary"
            as={Link}
            to={`/checkin/${id}`}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton bookingId={id} />}
      </DesktopLayout>

      <MobileLayout>
        <FlexRow>
          {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
          {status === "checked-in" && <Tag type="blue">Departing</Tag>}
          <Nights>
            {num_of_nights ?? 0} night{(num_of_nights ?? 0) > 1 && "s"}
          </Nights>
        </FlexRow>
        <FlexRow>
          <Guest>{guests.full_name}</Guest>
          {status === "unconfirmed" && (
            <Button
              size="small"
              variation="primary"
              as={Link}
              to={`/checkin/${id}`}
            >
              Check in
            </Button>
          )}
          {status === "checked-in" && <CheckoutButton bookingId={id} />}
        </FlexRow>
      </MobileLayout>
    </StyledTodayItem>
  );
}

export default TodayItem;
