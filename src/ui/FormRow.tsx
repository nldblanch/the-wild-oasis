import styled from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    max-width: 50rem;
    margin: 0 auto;
  }

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowProps =
  | {
      variant?: "default";
      label: string;
      children: React.ReactElement<{ id: string }>;
      error: string | undefined;
    }
  | {
      variant: "buttons";
      label?: string;
      children: React.ReactNode;
      error?: string;
    };

function FormRow({ label, children, error, variant }: FormRowProps) {
  if (variant === "buttons") {
    return <StyledFormRow>{children}</StyledFormRow>;
  }
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.defaultProps = {
  variant: "default"
};

export default FormRow;
