import styled, { css } from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

interface FormProps {
  type?: "modal" | "regular";
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        width: 100%;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular"
};

export default Form;
