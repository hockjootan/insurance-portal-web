export interface ProfileState {
  profile: ProfileDetailsApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProfileDetailsApiResponse {
  id: string;
  verified_email: boolean;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
