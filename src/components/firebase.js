import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDzvxSSEUCezGRgelDs7GHkCY64uhjiA6U",
  authDomain: "project-05-3b237.firebaseapp.com",
  databaseURL: "https://project-05-3b237.firebaseio.com",
  projectId: "project-05-3b237",
  storageBucket: "project-05-3b237.appspot.com",
  messagingSenderId: "671080079266"
};
firebase.initializeApp(config);

export default firebase;
