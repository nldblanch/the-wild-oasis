import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { FilterOption, SearchOptions } from "../types";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterButtonType {
  active: boolean;
}
const FilterButton = styled.button<FilterButtonType>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: SearchOptions;
  options: FilterOption[];
}
function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: FilterOption["value"]) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          onClick={() => handleClick(value)}
          active={value === currentFilter}
          disabled={value === currentFilter}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
