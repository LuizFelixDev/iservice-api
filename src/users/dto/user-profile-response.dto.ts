import { User } from '../entities/user.entity';

export class UserProfileResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  profile: any;

  static fromEntity(user: User): UserProfileResponseDto {
    const response = new UserProfileResponseDto();
    response.id = user.id;
    response.email = user.email;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.roles = user.roles ? user.roles.map((role) => role.name) : [];

    if (user.profile) {
      response.profile = {
        bio: user.profile.bio,
        phoneNumber: user.profile.phoneNumber,
        photoUrl: user.profile.photoUrl,
        location: user.profile.location,
      };
    } else {
      response.profile = null;
    }

    return response;
  }
}
