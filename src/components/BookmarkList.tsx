import React from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";
import { BookmarkDocument } from "../interfaces";

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

interface BookmarkListProps {
  documents: any[];
  ready: boolean;
  remove: (pageId: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  documents,
  ready,
  remove,
}) => {
  return (
    <Wrapper>
      {!ready && <span>Loading...</span>}
      {documents.map((document) => (
        <BookmarkItem
          pageInfo={document.data() as BookmarkDocument}
          key={document.id}
          pageId={document.id}
          remove={remove}
        />
      ))}
    </Wrapper>
  );
};

export default BookmarkList;
