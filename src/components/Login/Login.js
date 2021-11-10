import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import firebase from "firebase/compat";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import s from "./Login.module.css";

const Login = () => {
  useEffect(() => (document.title = "Авторизация"));
  
  const { auth, firestore } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);

    const usersRef = firestore.collection("users");
    const docRef = doc(usersRef, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Auth Success");
    } else {
      await setDoc(doc(usersRef, user.uid), {
        userID: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
      });
    }
  };

  return (
    <section className={s.authBlock}>
      <p className={s.authBlock__caption}>Tasks</p>
      <p className={s.authBlock__captionDes}>Список задач</p>
      <button onClick={login} className={s.authBlock__googleBtn}>
        Войти с помощью Google
      </button>
    </section>
  );
};

export default Login;
