import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { Provider } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  generateJwt(user: User) {
    const permissoes = user.roles ? user.roles.map((role) => role.name) : [];

    const payload = {
      sub: user.id,
      email: user.email,
      roles: permissoes,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return this.generateJwt(user);
  }

  async loginGoogleMobile(token: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException(
        'Token do Google inválido ou sem e-mail associado',
      );
    }

    const dadosPerfil = {
      email: payload.email,
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      picture: payload.picture || '',
      provider: Provider.GOOGLE,
    };

    const usuario = await this.usersService.buscarOuCriarSocial(dadosPerfil);

    return this.generateJwt(usuario);
  }
}
