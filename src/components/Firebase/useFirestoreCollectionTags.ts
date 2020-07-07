import { useState, useEffect } from "react";
import firebase from "firebase";

const useFirestoreCollectionTags = (immediate = true) => {
  const [documentTags, setDocumentTags] = useState<any>({});
  const tagsRef = firebase.firestore().collection("tags").doc("tagList");

  useEffect(() => {
    if (immediate) {
      tagsRef.onSnapshot(
        (snapshot) => {
          setDocumentTags(snapshot.data());
        },
        (error) => {
          console.error("Cannot load Firestore collection", error);
        }
      );
    }
  });

  const addTags = (pageTags: string[]) => {
    tagsRef.get().then((doc) => {
      const docTags = doc.data();
      if (pageTags.length === 1 && pageTags[0] !== "") {
        pageTags.forEach((pageTag: string) => {
          if (docTags && docTags.hasOwnProperty(pageTag)) {
            tagsRef.update({ [pageTag]: ++docTags[pageTag] });
          } else tagsRef.update({ [pageTag]: 1 });
        });
      }
    });
  };

  const removeTags = (pageTags: string[]) => {
    tagsRef.get().then((doc) => {
      const docTags = doc.data();
      if (pageTags.length === 1 && pageTags[0] !== "") {
        pageTags.forEach((pageTag: string) => {
          if (docTags && docTags[pageTag] > 1) {
            tagsRef.update({ [pageTag]: --docTags[pageTag] });
          } else
            tagsRef.update({
              [pageTag]: firebase.firestore.FieldValue.delete(),
            });
        });
      }
    });
  };

  return {
    documentTags,
    addTags,
    removeTags,
  };
};

export default useFirestoreCollectionTags;
