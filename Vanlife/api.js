/**REFACTORING THE CODE */
import { initializeApp } from "firebase/app";
import { getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    query, 
    where } from 'firebase/firestore'
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1vgOVo3dI5RNxCHaYZ8RPOnn89YMRPU0",
  authDomain: "vanlife-80189.firebaseapp.com",
  projectId: "vanlife-80189",
  storageBucket: "vanlife-80189.appspot.com",
  messagingSenderId: "240862209406",
  appId: "1:240862209406:web:a92a8a4a063852770cff2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")
export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

/**
 * Challenge: Figure out what to return from the
 * getVan function below. Then switch the VanDetail
 * page to use this getVan function instead of the
 * other one it's currently using.
 */
/** 1) This  is my solution with the oficial documentation
 * Maybe thsi works for me because I added the "id" as a field in my vanlife cloud firestore.
 * 
*/
/*export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    if (vanSnapshot.exists()) {
        console.log("Document data:", vanSnapshot.data());
      } else {
        // vanSnapshot.data() will be undefined in this case
        console.log("No such document!");
      }
    return vanSnapshot.data()

}*/
/**Teacher's solution */
export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

/*
This was the point of departure we use it with mirage server
WE get all the vans and not one isolated van.
export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}*/
export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

/*
This is the old one with mirage
export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}*/

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}