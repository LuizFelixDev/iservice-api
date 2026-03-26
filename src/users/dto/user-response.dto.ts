import { User } from '../entities/user.entity';
import { ProfileResponseDto } from './profile-response.dto';

export class UserResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  profile: ProfileResponseDto | null;

  static fromEntity(user: User): UserResponseDto {
    const response = new UserResponseDto();
    response.id = user.id;
    response.email = user.email;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.roles = user.roles ? user.roles.map((role) => role.name) : [];
    response.profile = user.profile
      ? ProfileResponseDto.fromEntity(user.profile)
      : null;

    return response;
  }
}
