import { Injectable } from '@nestjs/common';
//import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallets.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

  async createWallet(userId: number): Promise<Wallet> {
    const wallet = this.walletsRepository.create({ userId });
    return this.walletsRepository.save(wallet);
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletsRepository.find();
  }

  async getWalletById(id: number): Promise<Wallet> {
    return this.walletsRepository.findOne({where: {id}});
  }

  async depositToWallet(id: number, amount: number): Promise<Wallet> {
    const wallet = await this.walletsRepository.findOne({where: {id}});
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    wallet.incoming += amount;
    await this.walletsRepository.save(wallet);

    return wallet;
  }

  async withdrawFromWallet(id: number, amount: number): Promise<Wallet> {
    const wallet = await this.walletsRepository.findOne({where: {id}});
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    wallet.outgoing += amount;
    await this.walletsRepository.save(wallet);

    return wallet;
  }

  async closeWallet(walletId: number): Promise<void> {
    await this.walletsRepository.softDelete(walletId);
  }
}