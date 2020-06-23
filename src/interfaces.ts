export interface IChromeAPI {
  tabs: {
    query: Function;
  };
  storage: {
    local: {
      get: Function;
      set: Function;
    };
  };
}

export interface BookmarkDocument extends firebase.firestore.DocumentData {
  url: string;
  title: string;
  interest: string;
  time: string;
  tags: string[];
}
