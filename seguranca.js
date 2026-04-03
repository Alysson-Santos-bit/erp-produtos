// 1. AS CHAVES (Imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 2. A SUA IDENTIDADE SECRETA (Cole o seu firebaseConfig aqui)
const firebaseConfig = {
  apiKey: "AIzaSyDhMyyTBdmKEf4TmZngMAjzTpyiz0p1N6w",
  authDomain: "imperio-erp-44ee9.firebaseapp.com",
  projectId: "imperio-erp-44ee9",
  storageBucket: "imperio-erp-44ee9.firebasestorage.app",
  messagingSenderId: "30541400122",
  appId: "1:30541400122:web:2e574878cd61a1de264d03"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


let botaoSair = document.getElementById('btn-sair');
botaoSair.addEventListener('click', function() {
    signOut(auth).then(() => { 
        // Queima a ponte do histórico no logout!
        window.location.replace("login.html"); 
    });  
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário logado:", user.email);
    // Tira a capa da invisibilidade! O usuário é real.
    document.body.style.display = "block";
  } else {
    // Chute sem deixar histórico!
    window.location.replace("login.html");
  }
});