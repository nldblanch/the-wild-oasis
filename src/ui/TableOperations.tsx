import styled from "styled-components";
import { BREAKPOINTS } from "../utils/constants";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    flex-direction: column;
  }
`;

export default TableOperations;
