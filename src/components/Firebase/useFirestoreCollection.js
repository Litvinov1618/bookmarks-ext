import { useState, useEffect } from 'react';
import firebase from './firebase';

const useFirestoreCollection = (immediate = true) => {
  /** @type {[Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>, React.Dispatch<React.SetStateAction<Array<firebase.firestore.DocumentData>>>]} */
  const [documents, setDocuments] = useState([]);
  const [collection] = useState(() => firebase.firestore().collection('pages'));
  const [query, setQuery] = useState(collection);
  const [ready, setReadyState] = useState(false);

  useEffect(() => {
    if (immediate)
      return query.orderBy('date').onSnapshot(
        snapshot => {
          setReadyState(true);
          setDocuments(snapshot.docs);
        },
        error => {
          console.error('Cannot load Firestore collection', error);
        }
      )
  }
    , [query, immediate]);

  return { documents, collection, ready, query: setQuery };
};

export default useFirestoreCollection;
