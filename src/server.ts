import app from "./app";
import dotenv from "dotenv";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/GlobalCategories.service";
dotenv.config();

const PORT = Number(process.env.PORT);

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