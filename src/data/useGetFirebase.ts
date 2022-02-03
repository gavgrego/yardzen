import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore/lite";
import { Firestore } from "@firebase/firestore";

type config = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const firebaseConfig: config = {
  apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
  authDomain: "yardzen-demo.firebaseapp.com",
  databaseURL: "https://yardzen-demo.firebaseio.com",
  projectId: "yardzen-demo",
  storageBucket: "yardzen-demo.appspot.com",
  messagingSenderId: "509183652730",
  appId: "1:509183652730:web:ba2208f7d8e0882f009cc3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getItems = async (db: Firestore) => {
  const itemsCol = collection(db, "items");
  const itemsSnapshot = await getDocs(itemsCol);
  const itemsList = itemsSnapshot.docs.map((doc) => doc.data());

  return itemsList;
};

const items = getItems(db);

export default items;
