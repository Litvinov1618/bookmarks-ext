import { useState, useEffect } from "react";
import firebase from "./firebase";
import { BookmarkDocument } from "../../interfaces";
import useFirestoreCollectionTags from "./useFirestoreCollectionTags";

const useFirestoreCollection = (collectionName = "pages", immediate = true) => {
  /** @type {[Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>, React.Dispatch<React.SetStateAction<Array<firebase.firestore.DocumentData>>>]} */
  const [documentPages, setDocumentPages] = useState<any[]>([]);
  const [collection] = useState(() =>
    firebase.firestore().collection(collectionName)
  );
  const [query, setQuery] = useState(collection);
  const [ready, setReadyState] = useState(false);

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

  const addPage = async (pageInfo: BookmarkDocument) => {
    return await collection
      .add(pageInfo)
      .then(() => console.log("Page Added!"))
      .catch((error) => alert(error));
  };

  const removePage = async (bookmarkId: string) => {
    return await collection
      .doc(bookmarkId)
      .delete()
      .then(() => console.log("Page Deleted!"))
      .catch((error) => alert(error));
  };

  const { removeTag } = useFirestoreCollectionTags(false);
  const archivePage = async (pageId: string, pageInfo: BookmarkDocument) => {
    return firebase
      .firestore()
      .runTransaction(async () => {
        pageInfo.archived = true;
        await collection.doc(pageId).update(pageInfo);
        if (pageInfo.tags.join() !== "") await removeTag(pageInfo.tags);
      })
      .then(() => console.log("Transaction completed!"))
      .catch((error) => console.log("Transaction failed with error: ", error));
  };

  return {
    documentPages,
    collection,
    ready,
    query: setQuery,
    addPage,
    removePage,
    archivePage,
  };
};

export default useFirestoreCollection;
