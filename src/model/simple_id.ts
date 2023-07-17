import { IsDefined, IsNotEmpty } from 'class-validator';

export class JustId {
  @IsDefined()
  @IsNotEmpty()
  id: number;
}
