import React from "react";
import styled from "styled-components";
import FilterItem from "./FilterItem";

const Wrapper = styled.nav`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface FilterListProps {
  documents: { data: () => { tags: string } }[];
  query: React.Dispatch<
    React.SetStateAction<
      firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    >
  >;
  collection: { where: Function };
}

const FilterList: React.FC<FilterListProps> = ({
  documents,
  query,
  collection,
}) => {
  const tags: string[] = [];
  documents.map(
    (document) =>
      document.data().tags.indexOf("") === -1 && tags.push(document.data().tags)
  );

  const applyFilters = (element: HTMLInputElement) => {
    const filterName = element.parentElement!.id;
    if (filterName === "tags") {
      query(
        collection.where(
          `${filterName}`,
          "array-contains",
          `${element.innerText}`
        )
      );
    } else
      query(
        collection.where(
          `${filterName}`,
          "==",
          `${element.innerText.toLowerCase()}`
        )
      );
  };

  return (
    <Wrapper>
      <FilterItem
        filterName="Time"
        filterUnits={["Small", "Medium", "High"]}
        applyFilters={applyFilters}
      />
      <FilterItem
        filterName="Interest"
        filterUnits={["Small", "Medium", "High"]}
        applyFilters={applyFilters}
      />
      <FilterItem
        filterName="Tags"
        filterUnits={tags}
        applyFilters={applyFilters}
      />
    </Wrapper>
  );
};

export default FilterList;
