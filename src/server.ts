import app from "./app";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/GlobalCategories.service";
import { env } from "./config/env";
import initializeFirebaseAdmin from "./config/firebase";

const PORT = env.PORT;

initializeFirebaseAdmin();

const startServer = async () => {
  
  try {

    await prismaConnect();
    await initializeGlobalCategories();

    await app.listen({ port: PORT }).then(() => {
      console.log(`Server is running on port ${PORT}`);
    })
    
  } catch (err) {
    console.error(err);
  }
}

startServer();