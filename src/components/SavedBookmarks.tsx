import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";

const SavedBookmarks = () => {
  const { documents, ready, remove } = useFirestoreCollection("pages");

  return (
    <>
      <FilterList documents={documents} />
      <BookmarkList documents={documents} ready={ready} remove={remove} />
    </>
  );
};

export default SavedBookmarks;
