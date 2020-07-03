import React, { useState } from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";
import { BookmarkDocument } from "../interfaces";
import { ReactComponent as DoneButton } from "../img/done_button.svg";
import { ReactComponent as DeleteButton } from "../img/delete_button.svg";
import LoadingIcon from "./LoadingIcon";

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
  documents: { data: () => BookmarkDocument; id: string }[];
  ready: boolean;
  archive: (pageId: string, pageInfo: BookmarkDocument) => void;
  remove: (pageId: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  documents,
  archive,
  remove,
  ready,
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
    <>
      {!ready && <LoadingIcon speed={1} color="#e95656" />}
      {ready && (
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
          <ArchivedPagesButton onClick={handleClick}>
            Archived pages
          </ArchivedPagesButton>
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
      )}
    </>
  );
};

export default BookmarkList;
