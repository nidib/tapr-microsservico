import z from 'zod';

const persistedFrequenciaSchema = z.object({
	id: z.string(),
	data: z.date(),
	presente: z.boolean(),
	justificado: z.boolean(),
	alunoId: z.string(),
	turmaId: z.string(),
	criadoEm: z.date(),
	atualizadoEm: z.date(),
});

const newFrequenciaSchema = z.object({
	data: z.date(),
	presente: z.boolean(),
	justificado: z.boolean(),
	alunoId: z.string(),
	turmaId: z.string(),
	criadoEm: z.date(),
	atualizadoEm: z.date(),
});

export function validateNewFrequencia(frequencia: NewFrequencia): NewFrequencia {
	return newFrequenciaSchema.parse(frequencia);
}

export interface NewFrequencia extends z.infer<typeof newFrequenciaSchema> {}

export interface PersistedFrequencia extends z.infer<typeof persistedFrequenciaSchema> {}
