import { NewEntity } from 'src/types/entity.types';
import { Repository } from 'typeorm';

export async function createOne<T extends { id: string }>(
  repository: Repository<T>,
  entity: NewEntity<T>,
): Promise<T> {
  return await repository.save(entity);
}
