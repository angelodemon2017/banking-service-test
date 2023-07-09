import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
  
  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}