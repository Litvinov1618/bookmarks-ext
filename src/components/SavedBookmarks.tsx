import React from "react";
import FilterList from "./FilterList";
import BookmarkList from "./BookmarkList";
import useFirestoreCollection from "./Firebase/useFirestoreCollectionPages";
import useFirestoreCollectionTags from "./Firebase/useFirestoreCollectionTags";
import LoadingIcon from "./Icons/LoadingIcon";
import { BookmarkDocument } from "../interfaces";
import firebase from "./Firebase/firebase";

const mainColor = process.env.REACT_APP_MAIN_COLOR;

const SavedBookmarks = () => {
  const {
    documentPages,
    ready,
    query,
    collection,
    archivePage,
    removePage,
  } = useFirestoreCollection("pages");

  const { removeTag } = useFirestoreCollectionTags(false);
  const archivePageAndDeleteTags = (
    pageId: string,
    pageInfo: BookmarkDocument
  ) => {
    firebase
      .firestore()
      .runTransaction(async () => {
        await archivePage(pageId, pageInfo).then(() => alert("pageArchived"));
        if (pageInfo.tags.join() !== "")
          await removeTag(pageInfo.tags).then(() => alert("tag removed!"));
      })
      .then(() => console.log("Transaction completed!"))
      .catch((error) => alert(error));
  };

  return (
    <>
      {!ready && <LoadingIcon speed={1} color={mainColor} />}
      {ready && (
        <>
          <FilterList query={query} collection={collection} />
          <BookmarkList
            documentPages={documentPages}
            archivePage={archivePageAndDeleteTags}
            removePage={removePage}
          />
        </>
      )}
    </>
  );
};

export default SavedBookmarks;
