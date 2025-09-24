import { isValidElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowVerticalProps =
  | {
      variant?: "default";
      label: string;
      children: React.ReactElement<{ id: string }>;
      error?: string;
    }
  | {
      variant: "buttons";
      children: React.ReactNode;
    };

function FormRowVertical(props: FormRowVerticalProps) {
  const { variant } = props || "default";
  if (variant === "buttons") {
    return <StyledFormRow>{props.children}</StyledFormRow>;
  }
  const { label, error, children } = props as {
    label: string;
    error: string | undefined;
    children: React.ReactElement<{ id: string }>;
  };
  return (
    <StyledFormRow>
      {isValidElement(children) && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
