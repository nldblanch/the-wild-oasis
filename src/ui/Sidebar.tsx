import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { BREAKPOINTS } from "../utils/constants";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledSidebar = styled.aside<{ $isOpen: boolean }>`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media screen and (max-width: ${BREAKPOINTS.desktop}) {
    transition: transform 0.3s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const Overlay = styled.div<{ $show: boolean }>`
  display: none;
  @media screen and (max-width: ${BREAKPOINTS.desktop}) {
    display: ${(props) => (props.$show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
  }
`;

const BurgerButton = styled.button`
  display: none;

  @media screen and (max-width: ${BREAKPOINTS.desktop}) {
    display: block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    border-radius: 0.5rem;
    padding: 0.8rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: var(--color-grey-50);
    }
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick<HTMLBaseElement>(() => setIsOpen(false), false);
  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <BurgerButton onClick={handleToggle}>
        <HiBars3 />
      </BurgerButton>
      <Overlay $show={isOpen} />
      <StyledSidebar ref={ref} $isOpen={isOpen}>
        <Logo />
        <MainNav onClick={handleToggle} />

        {import.meta.env.DEV && <Uploader />}
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
