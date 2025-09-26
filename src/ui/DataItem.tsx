import styled from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  @media screen and (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

interface DataItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function DataItem({ icon, label, children }: DataItemProps) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
