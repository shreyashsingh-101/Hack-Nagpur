import * as Config from "./config.js"
firebase.initializeApp(Config.firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()

const loginButton = document.getElementById("login-button")
const logoutButton = document.getElementById("logout-button")

;(() => {
  loginButton.style.display = "none"
  logoutButton.style.display = "none"
})()

logoutButton.addEventListener("click", () => {
  firebase.auth().signOut()
  document.getElementById("dash").style.display = "none";
  location.replace("index.html")
})

loginButton.addEventListener("click", () => {
  openSigninPopup()
})

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

const openSigninPopup = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      console.log(`signed in`)
      var token = result.credential.accessToken
      var user = result.user

      await console.log(token)

      updateUIbyAuth()
    })
    .catch((error) => {
      console.log(`Error on signing in`)
      var errorCode = error.code
      var errorMessage = error.message
      var email = error.email
      var credential = error.credential
    })
}

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
profileEl.picture = document.querySelector("#profile-picture")
profileEl.email = document.querySelector("#profile-email")
profileEl.displayName = document.querySelector("#profile-name")

function updateUIbyAuth() {
  if (!!firebase.auth().currentUser) {
    
    loginButton.style.display = "none"
    document.getElementById("dash").style.display = "block"; 
    logoutButton.style.display = "block"
    profileEl.picture.src = firebase.auth().currentUser.photoURL
    document.querySelector("#defaultValue").defaultValue = firebase.auth().currentUser.displayName;
    profileEl.email.innerHTML = firebase.auth().currentUser.email
    profileEl.displayName.innerHTML = firebase.auth().currentUser.displayName
    document.querySelector(".profile-section").style.visibility = "visible"
  } else {
    document.querySelector(".profile-section").style.visibility = "hidden"
    loginButton.style.display = "block"
    logoutButton.style.display = "none"
  }
}

