import { useState, useEffect } from "react";
import firebase from "./firebase";
import { BookmarkDocument } from "../../interfaces";
import useFirestoreTagsCollection from "./useFirestoreTagsCollection";

const useFirestorePagesCollection = (immediate = true) => {
  /** @type {[Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>, React.Dispatch<React.SetStateAction<Array<firebase.firestore.DocumentData>>>]} */
  const [documentPages, setDocumentPages] = useState<any[]>([]);
  const [collection] = useState(() => firebase.firestore().collection("pages"));
  const [currentPages, setCurrentPages] = useState(() =>
    collection.where("archived", "==", false)
  );
  const [query, setQuery] = useState(currentPages);
  const [ready, setReadyState] = useState(false);
  const [archivedPagesMode, setArchivedPagesMode] = useState(false);
  const { addTag, removeTag } = useFirestoreTagsCollection(false);

  useEffect(() => {
    if (immediate)
      query.onSnapshot(
        (snapshot) => {
          setReadyState(true);
          setDocumentPages(snapshot.docs);
        },
        (error) => {
          console.error("Cannot load Firestore collection", error);
        }
      );
  }, [query, immediate]);

  const switchPages = () => {
    if (archivedPagesMode) {
      setArchivedPagesMode(false);
      setCurrentPages(collection.where("archived", "==", false));
    } else {
      setArchivedPagesMode(true);
      setCurrentPages(collection.where("archived", "==", true));
    }
  };

  const addPage = (pageInfo: BookmarkDocument) => {
    return firebase
      .firestore()
      .runTransaction(async () => {
        await collection.add(pageInfo);
        if (pageInfo.tags.length) await addTag(pageInfo.tags);
      })
      .then(() => console.log("Transaction completed!"))
      .catch((error) => console.log("Transaction failed with error: ", error));
  };

  const removePage = (bookmarkId: string) => {
    return collection
      .doc(bookmarkId)
      .delete()
      .then(() => console.log("Page Deleted!"))
      .catch((error) => alert(error));
  };

  const archivePage = (pageId: string, pageInfo: BookmarkDocument) => {
    return firebase
      .firestore()
      .runTransaction(async () => {
        pageInfo.archived = true;
        await collection
          .doc(pageId)
          .update(pageInfo)
          .then(() => console.log("Transaction completed!"))
          .catch((error) =>
            console.log("Transaction failed with error: ", error)
          );
        if (pageInfo.tags.join() !== "")
          await removeTag(pageInfo.tags).then(() =>
            console.log("tag removed!")
          );
      })
      .then(() => console.log("Transaction completed!"))
      .catch((error) => alert(error));
  };

  return {
    documentPages,
    collection: currentPages,
    ready,
    query: setQuery,
    addPage,
    removePage,
    archivePage,
    switchPages,
    archivedPagesMode,
  };
};

export default useFirestorePagesCollection;
