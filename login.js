// 1. AS CHAVES DA NUVEM (Imports via CDN do Google)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 2. A SUA IDENTIDADE SECRETA
const firebaseConfig = {
  apiKey: "AIzaSyDhMyyTBdmKEf4TmZngMAjzTpyiz0p1N6w",
  authDomain: "imperio-erp-44ee9.firebaseapp.com",
  projectId: "imperio-erp-44ee9",
  storageBucket: "imperio-erp-44ee9.firebasestorage.app",
  messagingSenderId: "30541400122",
  appId: "1:30541400122:web:2e574878cd61a1de264d03"
};

// 3. INICIANDO O MOTOR DO GOOGLE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // O 'auth' é o gerente que vai verificar a senha



// 1. PRIMEIRO: Nós capturamos o botão do HTML para a memória
let botaoEntrar = document.getElementById('btn-entrar');

// 2. SEGUNDO: Agora sim podemos colocar o ouvido nele
botaoEntrar.addEventListener('click', function() {
    
    let emailDigitado = document.getElementById('email-input').value;
    let senhaDigitada = document.getElementById('senha-input').value;

    signInWithEmailAndPassword(auth, emailDigitado, senhaDigitada)
      .then((userCredential) => {
        alert("Acesso Autorizado! Bem-vindo ao ERP.");
        window.location.href = "index.html"; 
      })
      .catch((error) => {
        alert("Acesso Negado: E-mail ou senha incorretos.");
        console.error("Erro do Firebase:", error.message);
      });

});

