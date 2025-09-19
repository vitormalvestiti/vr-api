import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  mensagemId: string;

  @IsString()
  @IsNotEmpty()
  conteudoMensagem: string;
}