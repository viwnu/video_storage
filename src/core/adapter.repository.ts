import { Logger } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import { BaseEntity } from './base.entity';
import { BaseRepository } from './base.repository';

export abstract class AdapterRepository<T, E extends BaseEntity> implements BaseRepository<T, E> {
  abstract logger: Logger;

  constructor(private readonly adapterRepository: Repository<E>) {}

  abstract mapping(entity: T): T;

  async save(entity: T & E): Promise<T> {
    const savedEntity = await this.adapterRepository.save(entity);
    return this.mapping(savedEntity);
  }

  async saveMany(entities: T[] & E[]): Promise<void> {
    await this.adapterRepository.save(entities);
  }

  async findByOptions(findOneOptions: FindOneOptions<E>): Promise<T | null> {
    const templateExist = await this.adapterRepository.findOne(findOneOptions).catch((err) => {
      this.logger.error(err);
      return null;
    });
    if (!templateExist) return null;
    return this.mapping(templateExist);
  }

  async findAll(findOptions?: FindManyOptions<E> | undefined): Promise<[T[], number]> {
    const [entities, count] = await this.adapterRepository.findAndCount(findOptions).catch((err) => {
      this.logger.error(err);
      return [[], 0] as [T[], number];
    });
    return [entities.map((entity): T => this.mapping(entity)), count];
  }

  async deleteByOptions(findOptions: FindOptionsWhere<E>): Promise<boolean> {
    const result = await this.adapterRepository.delete(findOptions).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.adapterRepository.softDelete(id).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.adapterRepository.delete(id).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }
}
