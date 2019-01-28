import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDYNIlknJ8DoQxeUh8e3XQGR28t91-Mpes",
  authDomain: "catch-of-the-day-fdc2d.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-fdc2d.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp } 

// This is a default export

export default base