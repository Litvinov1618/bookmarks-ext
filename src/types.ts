export type queryType =
  | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  | firebase.firestore.Query<firebase.firestore.DocumentData>;
