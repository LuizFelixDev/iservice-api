import { Profile } from '../entities/profile.entity';

export class ProfileResponseDto {
  bio: string;
  phoneNumber: string;
  photoUrl: string;
  location: {
    type: string;
    coordinates: number[];
  } | null;

  static fromEntity(profile: Profile): ProfileResponseDto | null {
    if (!profile) return null;

    const dto = new ProfileResponseDto();
    dto.bio = profile.bio;
    dto.phoneNumber = profile.phoneNumber;
    dto.photoUrl = profile.photoUrl;

    dto.location = profile.location
      ? {
          type: 'Point',
          coordinates: profile.location.coordinates,
        }
      : null;

    return dto;
  }
}
