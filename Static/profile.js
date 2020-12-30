import * as Index from './index.js';




firebase.auth().onAuthStateChanged((user) => {
    updateUIbyAuth()
    if (user) {
      // User is signed in.
      var displayName = user.displayName
      var email = user.email
      var emailVerified = user.emailVerified
      var photoURL = user.photoURL
      var isAnonymous = user.isAnonymous
      var uid = user.uid
      var providerData = user.providerData
      // ...
    } else {
      // User is signed out.
      // ...
    }
  })

const getIdToken = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
          resolve(token)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  
  const profileEl = {}
  profileEl.picture = document.getElementById("picture")
  profileEl.email = document.getElementById("email")
  profileEl.displayName = document.getElementById("name")
  
  function updateUIbyAuth() {
    if (!!firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser.displayName)
      profileEl.picture.src = firebase.auth().currentUser.photoURL
      profileEl.email.innerHTML = firebase.auth().currentUser.email
      profileEl.displayName.innerHTML = firebase.auth().currentUser.displayName
      document.querySelector(".profile").style.visibility = "visible"
    } else {
      document.querySelector(".profile").style.visibility = "hidden"
     
    }
  }

document.getElementById('edit').addEventListener('click',function edit_element(){
    var e = document.getElementById('random')
    var x=e.querySelectorAll('input');
    var y=e.querySelectorAll('label[for=hide]');
  
    for(var i=0;i<x.length;i++){
       x[i].style.display="block";
      
    }
    for(var i=0;i<y.length;i++){
       
       
        y[i].style.display="none";
       
     }
    
     document.getElementById('edit').style.display = "none"



})

  


