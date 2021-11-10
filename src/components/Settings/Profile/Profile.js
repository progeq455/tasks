import { useContext } from "react";
import { Context } from "../../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../../Loader";
import s from "./Profile.module.css";

const Profile = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  let userCollection;

  if (user !== null) {
    userCollection = firestore
      .collection("users")
      .where("userID", "==", user.uid);
  }

  const [userI, loading] = useCollectionData(userCollection);

  if (loading) {
    return <Loader />;
  }

  return (
    <article>
      <div className={s.profileInfo}>
        <img
          src={userI.map((ui) => ui.userPhoto)}
          alt={userI.map((ui) => ui.userName)}
          className={s.profileInfo__imgUser}
        />
        <div className={s.profileInfo_aboutUser}>
          <p className={s.profileInfo_aboutUser__name}>
            {userI.map((ui) => ui.userName)}
          </p>
          <span className={s.profileInfo_aboutUser__email}>
            {userI.map((ui) => ui.userEmail)}
          </span>
        </div>
        <button
          onClick={() => auth.signOut()}
          className={s.profileInfo__buttonExit}
        >
          Выйти
        </button>
      </div>
    </article>
  );
};

export default Profile;
