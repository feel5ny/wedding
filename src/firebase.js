// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAIkIMTKiEXVdjQ7mAjnhff20LkQGlz7A",
  authDomain: "wedding-29932.firebaseapp.com",
  projectId: "wedding-29932",
  storageBucket: "wedding-29932.appspot.com",
  messagingSenderId: "858400201171",
  appId: "1:858400201171:web:c5a5920a4eba6e53913726",
  measurementId: "G-15X2S07TQK",
  databaseURL:
    "https://wedding-29932-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
getAnalytics(app);
getStorage(app);

// document
//   .querySelector("#add-comment")
//   .addEventListener("click", async function () {
//     try {
//       const docRef = await writeUserData({
//         name: "Ada",
//         comment: "Lovelace",
//         password: "123",
//       });
//       console.log("Document written with ID: ", docRef);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   });

async function writeUserData({ name, comment, password }) {
  await set(ref(db, "comments/" + 3), {
    username: name,
    comment,
  });
  await set(ref(db, "password"), { 3: password });
}

const commentRef = ref(db, "comments/" + 3);
const passwordRef = ref(db, "password");
onValue(commentRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

onValue(passwordRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
