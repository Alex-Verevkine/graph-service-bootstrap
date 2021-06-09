import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(private config: ConfigService) {
    console.log(this.config.get<string>('KAKA_KAKA'));
  }
  getHello(): string {
    console.log(this.config.get<string>('KAKA_KAKA'));
    return 'Hello World!';
  }
}
