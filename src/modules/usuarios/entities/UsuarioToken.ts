import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuario_Token')
export default class UsuarioToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  usuarioId: string;

  @CreateDateColumn()
  criado: Date;

  @UpdateDateColumn()
  atualizado: Date;
}
