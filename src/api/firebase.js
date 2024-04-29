import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDmWUexU34eFyL_DHVm3ncn9-xOURDAwg8',
  authDomain: 'jumplogger-70bc3.firebaseapp.com',
  databaseURL: 'https://jumplogger-70bc3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'jumplogger-70bc3',
  storageBucket: 'jumplogger-70bc3.appspot.com',
  messagingSenderId: '1017838234856',
  appId: '1:1017838234856:web:a2d571f1e59bbe6afdad5d'
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)
const storage = getStorage(firebaseApp)
const auth = getAuth(firebaseApp)

export { database, storage, auth }
