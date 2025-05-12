// src/firebase/firebaseConfig.js

// Importar funciones necesarias del SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Descomenta si vas a usar Autenticación
// import { getStorage } from "firebase/storage"; // Descomenta si vas a usar Storage

// Configuración de tu proyecto Firebase
// Asegúrate de que estos valores sean EXACTAMENTE los de tu consola Firebase para una app WEB
const firebaseConfig = {
  apiKey: "AIzaSyAm9zqn_DkXBETQWvG4QV1Wx-puQd3mgDA", // Reemplaza con tu API Key real
  authDomain: "taskmanager-ad07a.firebaseapp.com",
  projectId: "taskmanager-ad07a",
  storageBucket: "taskmanager-ad07a.appspot.com", // VERIFICA ESTE VALOR en tu consola (suele ser .appspot.com)
  messagingSenderId: "329484706510",
  appId: "1:329484706510:web:e79f81bd3bcbe54c7be69f" // Reemplaza con tu App ID real
};

// Inicializar Firebase de forma segura (evita re-inicializar)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase inicializado.");
} else {
  app = getApp(); // Usa la app existente si ya fue inicializada
  console.log("Firebase ya estaba inicializado.");
}

// Obtener una instancia de Firestore
const db = getFirestore(app);

// Obtener instancias de otros servicios si los necesitas
// const auth = getAuth(app);
// const storage = getStorage(app);

// Exporta las instancias de los servicios que usarás en otras partes de tu app
export { db };
// export { auth, storage }; // Descomenta si los necesitas exportar
