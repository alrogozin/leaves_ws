import { IsDefined, IsNotEmpty } from 'class-validator';

export class DeclsByCnu {
  @IsDefined()
  @IsNotEmpty()
  cnu_id: number;
}
