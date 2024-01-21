import {
  setDoc,
  getDocs,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {
  //function to read data
  readDoc: (...args) => {
    const [collection_name] = args;
    let docs = []; // to insert our actual collection inside this array
    const ref = collection(db, "stocks"); //create a reference to the database with function buildIN collection

    return new Promise(async (resolve) => {
      try {
        const snapShots = await getDocs(ref);
        snapShots.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (error) {
        console.log(error);
      }
    });
  },
  //function to set data
  writeDoc: (...args) => {
    const [input, collection_name] = args;
    return new Promise(async (resolve) => {
      const randomIndex = Math.floor(Math.random() * 100000000);
      try {
        const docRef = doc(db, "stocks", `${randomIndex}`);
        console.log(docRef);
        await setDoc(docRef, {
          title: input.title,
          path: input.path,
          user: input.user,
          createdAt: serverTimestamp(),
        });
        resolve("new doc successfully inserted");
      } catch (error) {
        console.log(error);
      }
    });
  },
};

export default Firestore;
