import app from "./app";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/GlobalCategories.service";
import { env } from "./config/env";

const PORT = env.PORT;

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