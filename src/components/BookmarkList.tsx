import React from "react";
import styled from "styled-components";
import BookmarkItem from "./BookmarkItem";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";
import { BookmarkDocument } from "../interfaces";

const Wrapper = styled.main`
  width: 300px;
  min-height: 224px;
`;

const Bookmarks: React.FC = () => {
  const { documents, ready, remove } = useFirestoreCollection("pages");

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

export default Bookmarks;
