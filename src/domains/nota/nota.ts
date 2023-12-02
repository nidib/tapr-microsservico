import z from 'zod';

const persistedNotaSchema = z.object({
	id: z.string(),
	titulo: z.string(),
	descricao: z.string().optional(),
	nota: z.number().min(0).max(10),
	peso: z.number().min(1).max(10),
	alunoId: z.string(),
	turmaId: z.string(),
	criadoEm: z.date(),
	atualizadoEm: z.date(),
});

const newNotaSchema = z.object({
	titulo: z.string(),
	descricao: z.string().optional(),
	nota: z.number().min(0).max(10),
	peso: z.number().min(1).max(10),
	alunoId: z.string(),
	turmaId: z.string(),
	criadoEm: z.date(),
	atualizadoEm: z.date(),
});

export function validateNewNota(nota: NewNota): NewNota {
	return newNotaSchema.parse(nota);
}

export interface NewNota extends z.infer<typeof newNotaSchema> {}

export interface PersistedNota extends z.infer<typeof persistedNotaSchema> {}
