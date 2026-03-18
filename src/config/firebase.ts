import admin from "firebase-admin"
import { env } from "./env"

const initializeFirebaseAdmin = ():void => {
  if(admin.apps.length > 0) return

  const { FIREBASE_CLIENT_EMAIL,  FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } = env;

  if(!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error("🚨 Falha ao iniciar Firebase - Faltando credencias")
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY,
        clientEmail: FIREBASE_CLIENT_EMAIL
      })
    })
  } catch (error) {
    console.log("🚨 Falha ao conectar ao Firebase", error);
    process.exit(1);
  }
}

export default initializeFirebaseAdmin;