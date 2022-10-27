import {
  APIKEY,
  APPID,
  AUTHDOMAIN,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET,
} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
