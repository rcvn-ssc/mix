import firebaseConfig from "./firebaseConfig";
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export default firebase.firestore().collection('RIVER_CRANE_DEV').doc('ssc_lunch');