import styled from "styled-components";
import { BREAKPOINTS } from "../../utils/constants";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    grid-column: span 2;
  }
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1.2rem;
    grid-template-columns: 4.8rem 1fr;
    column-gap: 1.2rem;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    grid-template-columns: 4rem 1fr;
    column-gap: 1rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    & svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1rem;
  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media screen and (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 2rem;
  }

  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.6rem;
  }
`;

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "grey" | "green" | "blue" | "yellow" | "silver" | "indigo" | "red";
}

function Stat({ icon, title, value, color }: StatProps) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
