import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";

const SavedBookmarks = () => {
  const {
    documents,
    ready,
    remove,
    query,
    collection,
  } = useFirestoreCollection("pages");

  return (
    <>
      {ready && (
        <>
          <FilterList
            documents={documents}
            query={query}
            collection={collection}
          />
          <BookmarkList documents={documents} ready={ready} remove={remove} />
        </>
      )}
    </>
  );
};

export default SavedBookmarks;
