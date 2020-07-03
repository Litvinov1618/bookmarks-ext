import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";

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
      <FilterList documents={documents} query={query} collection={collection} />
      <BookmarkList
        documents={documents}
        ready={ready}
        archive={archive}
        remove={remove}
      />
    </>
  );
};

export default SavedBookmarks;
