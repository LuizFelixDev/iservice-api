import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Provider } from 'src/users/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : '';
    const picture = photos && photos.length > 0 ? photos[0].value : '';

    const dadosPerfil = {
      email,
      firstName: name?.givenName || '',
      lastName: name?.familyName || '',
      picture,
      provider: Provider.GOOGLE,
    };

    try {
      const usuario = await this.usersService.buscarOuCriarSocial(dadosPerfil);
      done(null, usuario);
    } catch (err) {
      done(err as Error, false);
    }
  }
}
