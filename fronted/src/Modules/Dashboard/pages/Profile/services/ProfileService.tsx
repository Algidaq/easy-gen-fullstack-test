import axios, { HttpStatusCode } from 'axios';
import { AppAxios } from '../../../../../services';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

abstract class IProfileService {
  abstract getUserProfile(): Promise<
    { id: string; email: string; name: string } | IProfileServiceError
  >;
}
export abstract class IProfileServiceError {}

export class ProfileServiceUnknownError extends IProfileServiceError {}

export class ProfileServiceUnAuthorizedError extends IProfileServiceError {}

class ProfileService implements IProfileService {
  async getUserProfile(): Promise<
    { id: string; email: string; name: string } | IProfileServiceError
  > {
    try {
      const res = await AppAxios.get('/users/profile');
      const data = res.data;
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.status === HttpStatusCode.Unauthorized)
          return new ProfileServiceUnAuthorizedError();
      }
      return new ProfileServiceUnknownError();
    }
  }
}

const ProfileServiceCtx = createContext<IProfileService | null>(null);

export const useProfileServiceCtx = () => {
  const service = useContext(ProfileServiceCtx) ?? new ProfileService();
  return service;
};

export const ProfileServicePrv: React.FC<
  PropsWithChildren<{ mock?: boolean }>
> = (props) => {
  const service = useMemo(() => {
    return new ProfileService();
  }, [props.mock]);
  return (
    <ProfileServiceCtx.Provider value={service}>
      {props.children}
    </ProfileServiceCtx.Provider>
  );
};
