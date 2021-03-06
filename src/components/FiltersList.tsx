import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterItem from "./PresentationComponents/FilterItem";
import useFirestoreTagsCollection from "./Firebase/useFirestoreTagsCollection";

const Wrapper = styled.nav`
  width: 300px;
  height: 30px;
  margin-bottom: 3px;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ClearFiltersButton = styled.button`
  margin: 0 auto;

  background-color: white;
  outline: none;
  border-radius: 28px;
  border: 1px solid grey;
  display: inline-block;
  cursor: pointer;
  color: grey;
  font-family: Arial;
  font-size: 15px;
  padding: 1px 15px;
  text-decoration: none;
`;

interface FilterListProps {
  query: Function;
  collection: { where: Function };
}

const FilterList: React.FC<FilterListProps> = ({ query, collection }) => {
  const [timeFilter, setTimeFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");

  useEffect(() => {
    let newCollection = collection;
    if (timeFilter) {
      newCollection = newCollection.where(
        "time",
        "==",
        timeFilter.toLowerCase()
      );
    }
    if (interestFilter) {
      newCollection = newCollection.where(
        "interest",
        "==",
        interestFilter.toLowerCase()
      );
    }
    if (tagsFilter) {
      newCollection = newCollection.where(
        "tags",
        "array-contains",
        `${tagsFilter}`
      );
    }
    query(newCollection);
  }, [timeFilter, collection, interestFilter, tagsFilter, query]);

  const clearFilters = () => {
    setTimeFilter("");
    setInterestFilter("");
    setTagsFilter("");
  };

  const { documentTags } = useFirestoreTagsCollection(true);

  return (
    <>
      <Wrapper>
        <FilterItem
          filterName="Time"
          filterUnits={["Small", "Medium", "High"]}
          setFilter={setTimeFilter}
          currentFilter={timeFilter}
        />
        <FilterItem
          filterName="Interest"
          filterUnits={["Small", "Medium", "High"]}
          setFilter={setInterestFilter}
          currentFilter={interestFilter}
        />
        <FilterItem
          filterName="Tags"
          filterUnits={Object.keys(documentTags)}
          setFilter={setTagsFilter}
          currentFilter={tagsFilter}
        />
      </Wrapper>
      <ClearFiltersButton onClick={clearFilters}>
        Clear filters
      </ClearFiltersButton>
    </>
  );
};

export default FilterList;
