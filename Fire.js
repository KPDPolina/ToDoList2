import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig={
    apiKey: "AIzaSyCcrbZObFBkEoEUxmJgpbm-m7_Nglr4Ck8",
    authDomain: "todolist-8790b.firebaseapp.com",
    databaseURL: "https://todolist-8790b.firebaseio.com",
    projectId: "todolist-8790b",
    storageBucket: "todolist-8790b.appspot.com",
    messagingSenderId: "135164872583",
    appId: "1:135164872583:web:70f3c85808b9d0ef13f522"
}

class Fire{
    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                callback(null,user)
            } else{
                firebase.auth()
                .signInAnonymously()
                .catch(error=>{
                    callback(error)});
            }
        });
    }

    getLists(callback){
        let ref=this.ref.orderBy('name')

        this.unsubscribe=ref.onSnapshot(snapshot=>{
            lists=[];

            snapshot.forEach(doc=>{
                lists.push({id: doc.id, ...doc.data()})
            })

            callback(lists)
        });
    }

    addList(list){
        let ref =this.ref;

        ref.add(list);
    }

    updateList(list){
        let ref=this.ref;

        ref.doc(list.id).update(list);
    }

    deleteList(list){
        let ref=this.ref;

        ref.doc(list.id).delete();
    }

    get userId(){
        return firebase.auth().currentUser.uid
    }

    get ref(){
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection("lists");
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;