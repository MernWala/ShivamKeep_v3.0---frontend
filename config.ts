import { z } from 'zod';

const envSchema = z.object({
  VITE_BACKEND_HOST: z.url().default('http://localhost:3001'),
});

const env = envSchema.parse({
  VITE_BACKEND_HOST: import.meta.env.VITE_BACKEND_HOST,
});

export const config = {
  app: {
    host: env.VITE_BACKEND_HOST,
  },
};
