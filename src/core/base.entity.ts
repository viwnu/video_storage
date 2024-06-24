import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn('uuid')
  public id: string;
  @CreateDateColumn({ name: 'created_at', nullable: true })
  public created_At: Date;
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updated_At: Date;
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deleted_At: Date;
}
