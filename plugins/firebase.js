import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyBrdmvvPuu_zdBeh9H_5OXjXQKCY-jfSmk',
    authDomain: 'portfolio-b2229.firebaseapp.com',
    databaseURL: 'https://portfolio-b2229.firebaseio.com',
    projectId: 'portfolio-b2229',
    storageBucket: 'portfolio-b2229.appspot.com',
    messagingSenderId: '582203188522',
    appId: '1:582203188522:web:8b8995c4f7b2ca05dc2a53'
  }
  firebase.initializeApp(config)
  // firebase.firestore().settings({})
}
const fireDb = firebase.firestore()
export { fireDb }
