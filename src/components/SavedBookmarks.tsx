import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollectionPages";
import LoadingIcon from "./Icons/LoadingIcon";

const SavedBookmarks = () => {
  const {
    documentPages,
    ready,
    query,
    collection,
    archivePage,
    removePage,
  } = useFirestoreCollection("pages");

  return (
    <>
      {!ready && <LoadingIcon speed={1} color="#e95656" />}
      {ready && (
        <>
          <FilterList query={query} collection={collection} />
          <BookmarkList
            documentPages={documentPages}
            archivePage={archivePage}
            removePage={removePage}
          />
        </>
      )}
    </>
  );
};

export default SavedBookmarks;
