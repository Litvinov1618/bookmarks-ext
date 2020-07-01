import React, { useState } from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";
import { BookmarkDocument } from "../interfaces";
import { ReactComponent as DoneButton } from "../img/done_button.svg";
import { ReactComponent as DeleteButton } from "../img/delete_button.svg";

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

const ArchivedPagesWrapper = styled.header`
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 20px;
  color: grey;
  height: 25px;
  width: 130px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

interface BookmarkListProps {
  documents: { data: () => BookmarkDocument; id: string }[];
  ready: boolean;
  archive: (pageId: string, pageInfo: BookmarkDocument) => void;
  remove: (pageId: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  documents,
  archive,
  remove,
}) => {
  const activePages: { data: () => BookmarkDocument; id: string }[] = [];
  const archivedPages: { data: () => BookmarkDocument; id: string }[] = [];
  documents.forEach((document) => {
    if (document.data().archived === false) activePages.push(document);
    else archivedPages.push(document);
  });
  const [showArchivedPages, setShowArchivedPages] = useState(false);
  const handleClick = () => {
    if (showArchivedPages) setShowArchivedPages(false);
    else setShowArchivedPages(true);
  };
  return (
    <Wrapper>
      {activePages.map((page) => (
        <BookmarkItem
          pageInfo={page.data()}
          key={page.id}
          pageId={page.id}
          close={archive}
          closeButtonIcon={DoneButton}
        />
      ))}
      <ArchivedPagesWrapper onClick={handleClick}>
        Archived pages
      </ArchivedPagesWrapper>
      {showArchivedPages &&
        archivedPages.map((page) => (
          <BookmarkItem
            pageInfo={page.data()}
            key={page.id}
            pageId={page.id}
            close={remove}
            closeButtonIcon={DeleteButton}
          />
        ))}
    </Wrapper>
  );
};

export default BookmarkList;
