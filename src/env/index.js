import z3 from 'zod';

const envSchema = z3.object({
  VITE_API_KEY_TMDB: z3.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('Erro nas variaveis de ambiente', _env.error);
  throw new Error('Erro nas variaveis de ambiente');
}

const env = _env.data;

export { env };
