import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity('produtos')
export default class Produto extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column('decimal')
    preco: number;

    @Column('int')
    quantidade: number;
  
    @CreateDateColumn()
    criado: Date;

    @UpdateDateColumn()
    atualizado: Date;
}

