import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly userwalletsService: WalletsService) {}

  @Get()
  getWallets() {
    return this.userwalletsService.getWallets();
  }

  @Get(':id')
  getWallet(@Param('id') id: string) {
    return this.userwalletsService.getWalletById(+id);
  }

  @Post('create')
  createWallet(@Param('id') id: string) {
    return this.userwalletsService.createWallet(+id);
  }
}

