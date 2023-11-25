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
	atualiadoEm: z.date(),
});

const newNotaSchema = z.object({
	titulo: z.string(),
	descricao: z.string().optional(),
	nota: z.number().min(0).max(10),
	peso: z.number().min(1).max(10),
	alunoId: z.string(),
	turmaId: z.string(),
	criadoEm: z.date(),
	atualiadoEm: z.date(),
});

export function validateNewNota(nota: NewNota): boolean {
	return persistedNotaSchema.safeParse(nota).success;
}

export interface NewNota extends z.infer<typeof newNotaSchema> {}

export interface PersistedNota extends z.infer<typeof persistedNotaSchema> {}
