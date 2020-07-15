import React from "react";
import styled from "styled-components";
import InterestIcon from "../Icons/InterestIcon";
import TimeIcon from "../Icons/TimeIcon";

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const Filter = styled.div`
  width: 90px;
  background-color: white;
  z-index: 9999;
  border: 1px solid ${mainColor};
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
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: string;
}

const FilterItem: React.FC<FilterItemProps> = ({
  filterName,
  filterUnits,
  setFilter,
  currentFilter,
}) => {
  const handleFilterItem = (filterItem: string) => {
    setFilter(filterItem);
  };

  return (
    <Wrapper>
      <Filter id={`${filterName.toLowerCase()}`}>
        <FilterName>{currentFilter || filterName}</FilterName>
        {filterUnits.map((filterItem) => (
          <FilterUnit
            key={filterItem}
            onClick={() => handleFilterItem(filterItem)}
          >
            {filterName === "Time" && (
              <TimeIcon status={filterItem.toLowerCase()} />
            )}
            {filterName === "Interest" && (
              <InterestIcon status={filterItem.toLowerCase()} />
            )}
            {filterName === "Tags" && filterItem}
          </FilterUnit>
        ))}
      </Filter>
    </Wrapper>
  );
};

export default FilterItem;
