import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BycriptService {
  private readonly saltRounds = 10;

  async hashPassword(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async comparePasswords(senha: string, hashDeSenha: string): Promise<boolean> {
    return bcrypt.compare(senha, hashDeSenha);
  }
}
