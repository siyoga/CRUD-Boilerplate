import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewUserDTO } from '../user/user.dto';
import { AuthLogic } from './logic/auth.logic';
import { TokenPairDTO } from './misc/tokenPair.dto';

interface ILogin {
  username: string;
  password: string;
}

interface IRefresh {
  refreshToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authLogic: AuthLogic) {}

  @Post('/register')
  async register(@Body() newUserDTO: NewUserDTO): Promise<void> {
    await this.authLogic.register(newUserDTO);
    return;
  }

  @Post('/login')
  async login(@Body() req: ILogin): Promise<TokenPairDTO> {
    return await this.authLogic.login(req.username, req.password);
  }

  @Post('/refresh')
  async refresh(@Body() req: IRefresh): Promise<TokenPairDTO> {
    return await this.authLogic.refresh(req.refreshToken);
  }
}
