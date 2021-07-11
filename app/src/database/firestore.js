import firebaseConfig from "./firebaseConfig";
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export const firestore  = firebase.firestore();
const db                = firebase.firestore().collection('RIVER_CRANE_DEV').doc('ssc_lunch')
export const refMstUser = db.collection('mst_user')
export default db

// Fetch data list
export const fetchList = async (ref) => {
    let res = {
        data : [],
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

// Find by field
export const findByField = async (ref) => {
    let res = {
        data : null,
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

// Find one
export const findOne = async (ref, id) => {
    let res = {
        data : null,
        error: []
    };
    await ref.doc(id).get().then(snapshot => {
        res.data = {
            id: snapshot.id,
            ...snapshot.data()
        };
    }).catch((error) => {
        res.error.push(error.message)
    })

    return res;
}

// Insert data
export const insert = async (ref, data) => {
    let res = {
        data : null,
        error: []
    };

    await ref.add(data).then((docRef) => {
        res.data = {
            ...data,
            id: docRef.id
        };
    }).catch((error) => {
        res.error.push(error.message)
    })

    return res;
}

// Check is admin
export const isAdmin = async (id) => {
    const auth = await findOne(refMstUser, id);
    const data = auth.data === null ? {} : auth.data;

    return data.role === 'admin'
}