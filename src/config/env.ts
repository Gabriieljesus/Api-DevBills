import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3001"),
  DATABASE_URL: z.string().min(5, "DATABASE_URL é orbiatória"),
  NODE_ENV: z.enum(["dev", "prod", "test"], {
    message: "NODE ENV deve ser dev, test ou prod",
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Varíaveis de ambiente inválida:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;