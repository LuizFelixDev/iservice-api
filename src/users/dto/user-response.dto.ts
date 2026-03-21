import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  profile: any;

  static fromEntity(user: User): UserResponseDto {
    const response = new UserResponseDto();
    response.id = user.id;
    response.email = user.email;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.roles = user.roles ? user.roles.map((role) => role.name) : [];

    return response;
  }
}
