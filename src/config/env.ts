import { ZodError, z } from 'zod';

const requiredEnvMessage = 'Variável obrigatória';
const stringEnvProperties = { required_error: requiredEnvMessage };

const Env = z.object({
	COSMOS_DB_NAME: z.string(stringEnvProperties).min(1),
	COSMOS_ENDPOINT: z.string(stringEnvProperties).url(),
	COSMOS_KEY: z.string(stringEnvProperties).min(1),
});

type Env = z.infer<typeof Env>;

export function getEnv(env: keyof Env) {
	const value = validateEnvs()[env];

	return value;
}

export function validateEnvs() {
	try {
		return Env.parse(process.env);
	} catch (e) {
		if (e instanceof ZodError) {
			const errors = e.flatten().fieldErrors;
			const objectString = JSON.stringify(errors, null, 4);

			throw new Error('Variável de ambiente inválida ou incompleta: \n' + objectString);
		}

		throw e;
	}
}
