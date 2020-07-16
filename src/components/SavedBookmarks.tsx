import React from "react";
import FilterList from "./FiltersList";
import BookmarkList from "./BookmarksList";
import useFirestorePagesCollection from "./Firebase/useFirestorePagesCollection";
import useFirestoreTagsCollection from "./Firebase/useFirestoreTagsCollection";
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
  } = useFirestorePagesCollection(true);

  const { removeTag } = useFirestoreTagsCollection(false);
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

  if (!ready) return <LoadingIcon speed={1} color={mainColor} />;

  return (
    <>
      <FilterList query={query} collection={collection} />
      <BookmarkList
        documentPages={documentPages}
        archivePage={archivePageAndDeleteTags}
        removePage={removePage}
      />
    </>
  );
};

export default SavedBookmarks;
