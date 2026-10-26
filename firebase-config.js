// Вставьте сюда настройки из Firebase Console → Project settings → Your apps → Web app
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_ПРОЕКТ.firebaseapp.com",
  projectId: "ВАШ_ПРОЕКТ",
  appId: "ВАШ_APP_ID"
};

export const configured = !firebaseConfig.apiKey.startsWith("ВАШ");
export const auth = getAuth(initializeApp(firebaseConfig));
