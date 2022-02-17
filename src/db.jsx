import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAnE6mHeVwAeMzkYX9Kqe5bCVSKBOnLu2s",
	authDomain: "fir-shop-d9688.firebaseapp.com",
	projectId: "fir-shop-d9688",
	storageBucket: "fir-shop-d9688.appspot.com",
	messagingSenderId: "25137859944",
	appId: "1:25137859944:web:cd7fd9c3525639f3815add",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const registerUserWithEmail = async (username, email, password, city) => {
	const response = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	const user = response.user;

	await setDoc(doc(db, "users", user.uid), {
		username,
		authProvider: "local",
		email,
		city,
	});
};

const loginUserWithEmail = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
	signOut(auth);
};

export { db, auth, registerUserWithEmail, loginUserWithEmail, logoutUser };
