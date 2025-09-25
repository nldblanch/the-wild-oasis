import styled, { css } from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

interface RowProps {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
    @media screen and (max-width: ${BREAKPOINTS.desktop}) {
    flex-direction: column;
    gap: 1.2rem;
  }
`;

Row.defaultProps = {
  type: "vertical"
};

export default Row;
