import { NotaRepository } from 'src/domains/nota/nota-repository';

export class DeleteNotaByIdUsecase {
	constructor(private notaRepository: NotaRepository) {}

	async execute(id: string): Promise<boolean> {
		return this.notaRepository.deleteById(id);
	}
}
