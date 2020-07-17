import React from "react";
import styled from "styled-components";
import BookmarkItem from "./PresentationComponents/BookmarkItem";
import { BookmarkDocument } from "../interfaces";
import { ReactComponent as DoneButton } from "../img/done_button.svg";
import { ReactComponent as DeleteButton } from "../img/delete_button.svg";

const Wrapper = styled.main`
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ArchivedPagesButton = styled.button`
  margin: 0 auto 5px auto;

  background-color: white;
  border-radius: 28px;
  border: 1px solid grey;
  display: inline-block;
  cursor: pointer;
  color: grey;
  font-family: Arial;
  font-size: 15px;
  padding: 1px 15px;
  text-decoration: none;
  outline: none;
`;

interface BookmarkListProps {
  documentPages: { data: () => BookmarkDocument; id: string }[];
  archivePage: (pageId: string, pageInfo: BookmarkDocument) => void;
  removePage: (pageId: string) => void;
  switchPages: () => void;
  archivedPagesMode: Boolean;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  documentPages,
  archivePage,
  removePage,
  switchPages,
  archivedPagesMode,
}) => {
  const handleClick = () => {
    switchPages();
  };

  return (
    <>
      <Wrapper>
        {documentPages.map((page) => (
          <BookmarkItem
            pageInfo={page.data()}
            key={page.id}
            pageId={page.id}
            close={archivedPagesMode ? removePage : archivePage}
            closeButtonIcon={archivedPagesMode ? DeleteButton : DoneButton}
          />
        ))}
        <ArchivedPagesButton onClick={handleClick}>
          Archived pages
        </ArchivedPagesButton>
      </Wrapper>
    </>
  );
};

export default BookmarkList;
