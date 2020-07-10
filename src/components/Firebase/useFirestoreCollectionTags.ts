import { useState, useEffect } from "react";
import firebase from "firebase";

const useFirestoreCollectionTags = (immediate = true) => {
  const [documentTags, setDocumentTags] = useState<any>({});
  const tagsRef = firebase.firestore().collection("app").doc("tags");

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

  const addTag = async (pageTags: string[]) => {
    return await tagsRef.get().then((doc) => {
      const docTags = doc.data();
      if (docTags) {
        const newCounters: { [tagName: string]: number } = {};
        pageTags.forEach((tag: string) => {
          if (docTags.hasOwnProperty(tag)) newCounters[tag] = docTags[tag] + 1;
          else newCounters[tag] = 1;
        });
        return tagsRef.update(newCounters);
      } else throw new Error("Document doesn't exist");
    });
  };

  const removeTag = async (pageTags: string[]) => {
    return await tagsRef.get().then((doc) => {
      const docTags = doc.data();
      if (docTags) {
        const newCounters: {
          [tagName: string]: number | firebase.firestore.FieldValue;
        } = {};
        pageTags.forEach((tag: string) => {
          if (docTags[tag] > 1) newCounters[tag] = docTags[tag] - 1;
          else newCounters[tag] = firebase.firestore.FieldValue.delete();
        });
        return tagsRef.update(newCounters);
      } else throw new Error("Document doesn't exist");
    });
  };

  return {
    documentTags,
    addTag,
    removeTag,
  };
};

export default useFirestoreCollectionTags;
