// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAV9DQ2Ets0xInLZ9oNlcj4DhSj2v9gwPY",
  authDomain: "nayoung-wedding.firebaseapp.com",
  projectId: "nayoung-wedding",
  storageBucket: "nayoung-wedding.appspot.com",
  messagingSenderId: "298832266524",
  appId: "1:298832266524:web:73566bf3a15f1ac564a6d9",
  measurementId: "G-HRL55BYNPH",
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
