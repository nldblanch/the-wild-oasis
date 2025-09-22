import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
interface Position {
  x: number;
  y: number;
}
interface StyledListType {
  position: Position;
}
const StyledList = styled.ul<StyledListType>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
interface MenusContextType {
  openId: string;
  open: React.Dispatch<React.SetStateAction<string>>;
  close: React.DispatchWithoutAction;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

interface MenusProps {
  children: React.ReactNode;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close: React.DispatchWithoutAction = () => setOpenId("");
  const open: React.Dispatch<React.SetStateAction<string>> = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

interface ToggleProps {
  id: string | number;
}
function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Open must be used within a Menus");
  const { openId, close, open, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const rect = e.currentTarget.closest("button")?.getBoundingClientRect();
    setPosition(() => {
      if (!rect) return null;

      return {
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8
      };
    });
    const stringId = String(id);
    openId === "" || openId !== stringId ? open(stringId) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: string | number;
  children: React.ReactNode;
}
function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Open must be used within a Menus");
  const { openId, close, position } = context;
  const ref = useOutsideClick<HTMLUListElement>(close, true);
  const stringId = String(id);
  if (openId !== stringId) return null;

  return createPortal(
    <StyledList ref={ref} position={position ?? { x: 20, y: 20 }}>
      {children}
    </StyledList>,
    document.body
  );
}

interface ButtonProps {
  children: React.ReactNode;
  icon: React.ReactElement;
  onClick?: () => void;
}
function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Open must be used within a Menus");
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
