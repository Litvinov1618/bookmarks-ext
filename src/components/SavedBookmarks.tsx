import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollection";
import LoadingIcon from "./LoadingIcon";

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
      {!ready && <LoadingIcon speed={1} color="#e95656" />}
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
