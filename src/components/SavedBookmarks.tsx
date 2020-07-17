import React from "react";
import FilterList from "./FiltersList";
import BookmarkList from "./BookmarksList";
import useFirestorePagesCollection from "./Firebase/useFirestorePagesCollection";
import LoadingIcon from "./Icons/LoadingIcon";

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const SavedBookmarks = () => {
  const {
    documentPages,
    ready,
    query,
    collection,
    archivePage,
    removePage,
    switchPages,
    archivedPagesMode,
  } = useFirestorePagesCollection(true);

  if (!ready) return <LoadingIcon speed={1} color={mainColor} />;

  return (
    <>
      <FilterList query={query} collection={collection} />
      <BookmarkList
        documentPages={documentPages}
        removePage={removePage}
        archivePage={archivePage}
        switchPages={switchPages}
        archivedPagesMode={archivedPagesMode}
      />
    </>
  );
};

export default SavedBookmarks;
