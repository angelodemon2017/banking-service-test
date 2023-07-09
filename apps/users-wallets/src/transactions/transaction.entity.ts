import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  user: string

  @Column()
  walletId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
