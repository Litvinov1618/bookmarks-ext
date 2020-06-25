import { useState, useEffect } from "react";
import firebase from "./firebase";
import { BookmarkDocument } from "../../interfaces";

const useFirestoreCollection = (collectionName = "pages", immediate = true) => {
  /** @type {[Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>, React.Dispatch<React.SetStateAction<Array<firebase.firestore.DocumentData>>>]} */
  const [documents, setDocuments] = useState<any[]>([]);
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
          setDocuments(snapshot.docs);
        },
        (error) => {
          console.error("Cannot load Firestore collection", error);
        }
      );
  }, [query, immediate]);

  const add = (pageInfo: BookmarkDocument) => {
    collection.add(pageInfo);
  };

  const remove = (pageId: string) => {
    collection.doc(pageId).delete();
  };

  return { documents, collection, ready, query: setQuery, add, remove };
};

export default useFirestoreCollection;
