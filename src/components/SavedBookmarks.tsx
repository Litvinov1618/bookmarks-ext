import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";
import LoadingIcon from "./Icons/LoadingIcon";

const SavedBookmarks = () => {
  const {
    documents,
    ready,
    query,
    collection,
    archive,
    remove,
  } = useFirestoreCollection("pages");

  return (
    <>
      {!ready && <LoadingIcon speed={1} color="#e95656" />}
      {ready && (
        <>
          <FilterList query={query} collection={collection} />
          <BookmarkList
            documents={documents}
            archive={archive}
            remove={remove}
          />
        </>
      )}
    </>
  );
};

export default SavedBookmarks;
