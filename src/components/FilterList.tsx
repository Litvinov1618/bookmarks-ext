import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  width: 300px;
  margin-bottom: 10px;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Filter = styled.div`
  width: 90px;
  height: 100%;
  border: 1px solid #e95656;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;

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

const FilterItem = styled.div`
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

interface FilterListProps {
  documents: { data: () => { tags: string } }[];
  query: React.Dispatch<
    React.SetStateAction<
      firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    >
  >;
  collection: any;
}

const FilterList: React.FC<FilterListProps> = ({
  documents,
  query,
  collection,
}) => {
  const [tags, setTags] = useState<string[]>(["Loading"]);
  useEffect(() => {
    if (documents.length !== 0) {
      const documentsTags: string[] = [];
      documents.map(
        (document) =>
          document.data().tags.indexOf("") === -1 &&
          documentsTags.push(document.data().tags)
      );
      setTags(documentsTags);
    }
  }, [documents]);
  const filters = {
    readTime: ["Small", "Medium", "High"],
    interest: ["Small", "Medium", "High"],
    tags,
  };

  const handleFilterItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    applyFilters(event.target as HTMLInputElement);
  };

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
      <Filter id="time">
        <FilterName>Read Time</FilterName>
        {filters.readTime.map((filterItem) => (
          <FilterItem key={filterItem} onClick={handleFilterItem}>
            {filterItem}
          </FilterItem>
        ))}
      </Filter>
      <Filter id="interest">
        <FilterName>Interest</FilterName>
        {filters.interest.map((filterItem) => (
          <FilterItem key={filterItem} onClick={handleFilterItem}>
            {filterItem}
          </FilterItem>
        ))}
      </Filter>
      <Filter id="tags">
        <FilterName>Tags</FilterName>
        {filters.tags.map((filterItem) => (
          <FilterItem key={filterItem} onClick={handleFilterItem}>
            {filterItem}
          </FilterItem>
        ))}
      </Filter>
    </Wrapper>
  );
};

export default FilterList;
