import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { BREAKPOINTS } from "../utils/constants";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media screen and (max-width: ${BREAKPOINTS.laptop}) {
    display: none !important;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      {import.meta.env.DEV && <Uploader />}
    </StyledSidebar>
  );
}

export default Sidebar;
