import React from "react";
import styled from "styled-components";

const Filter = styled.div`
  width: 90px;
  background-color: white;
  z-index: 9999;
  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

const FilterName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
`;

const FilterUnit = styled.div`
  display: none;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  ${Filter}:hover & {
    display: block;
  }
`;

const Wrapper = styled.div`
  width: 90px;
  position: relative;
`;

interface FilterItemProps {
  filterName: string;
  filterUnits: string[];
  applyFilters: Function;
}

const FilterItem: React.FC<FilterItemProps> = ({
  filterName,
  filterUnits,
  applyFilters,
}) => {
  const handleFilterItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    applyFilters(event.target as HTMLInputElement);
  };

  return (
    <Wrapper>
      <Filter id={`${filterName.toLowerCase()}`}>
        <FilterName>{filterName}</FilterName>
        {filterUnits.map((filterItem) => (
          <FilterUnit key={filterItem} onClick={handleFilterItem}>
            {filterItem}
          </FilterUnit>
        ))}
      </Filter>
    </Wrapper>
  );
};

export default FilterItem;
