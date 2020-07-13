export interface BookmarkDocument extends firebase.firestore.DocumentData {
  url: string;
  title: string;
  interest: string;
  time: string;
  tags: string[];
  archived: boolean;
}
