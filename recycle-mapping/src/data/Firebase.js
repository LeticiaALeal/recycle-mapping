import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDinT6H4eDozS6IAxOm2a9OqIgw0scTzto",
    authDomain: "recycle-mapping-6416c.firebaseapp.com",
    projectId: "recycle-mapping-6416c",
    storageBucket: "recycle-mapping-6416c.appspot.com",
    messagingSenderId: "94628954470",
    appId: "1:94628954470:web:ce71c10a7cf44873bcc8a7",
    measurementId: "G-Z9KMGMQ3NZ"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

