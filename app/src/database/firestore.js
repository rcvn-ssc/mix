import firebaseConfig from "./firebaseConfig";
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection('RIVER_CRANE_DEV').doc('ssc_lunch')

// Fetch data list
export const fetchList = async (ref) => {
    let res = {
        data: [],
        error: []
    };
    await ref.get().then(snapshot => {
        snapshot.forEach(doc => {
                let item = {
                    id: doc.id,
                    ...doc.data()
                }
                res.data.push(item);
            }
        )
    }).catch((error) => {
        res.error.push(error.message)
    })

    return res;
}

// Find one
export const findOne = async (ref) => {
    let res = {
        data: null,
        error: []
    };
    await ref.limit(1).get().then(snapshot => {
        let data = null;
        snapshot.forEach(doc => {
                data = {
                    id: doc.id,
                    ...doc.data()
                }
            }
        )

        res.data = data;
    }).catch((error) => {
        res.error.push(error.message)
    })

    return res;
}

// Insert data
export const insert = async (ref, data) => {
    let res = {
        data: null,
        error: []
    };

    await ref.add(data).then(() => {
        res.data = data;
    }).catch((error) => {
        res.error.push(error.message)
    })

    return res;
}

export default db