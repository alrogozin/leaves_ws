import { IsDefined, IsNotEmpty } from 'class-validator';

export class Info {
  @IsDefined()
  country: string;
  @IsDefined()
  @IsNotEmpty()
  city: string;
}