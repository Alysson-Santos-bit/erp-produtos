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
signOut(auth).then(() => { window.location.href = "login.html"; });  
});
// PASSO A: O Batedor de Carteiras (Sair)
// 1. Capture o 'btn-sair' do HTML pelo ID.
// 2. Adicione um addEventListener de 'click' nele.
// 3. Dentro da função, chame: signOut(auth).then(() => { window.location.href = "login.html"; })

// PASSO B: O Vigilante da Porta (Proteção de Rota)
// Este código roda sozinho e vigia o estado do usuário (como uma variável Booleana: logado ou não logado).
onAuthStateChanged(auth, (user) => {
  if (user) {
    // O usuário tem o token. Pode deixá-lo ver o ERP.
    console.log("Usuário logado:", user.email);
  } else {
    // O usuário NÃO tem o token. Chute-o de volta para o login!
    window.location.href = "login.html";
  }
});