import React, { createContext, useContext, useMemo } from 'react';
import { AuthService, AuthServiceMock } from './AuthService';
import { IAuthService } from './IAuthService';

const AuthServiceCtx = createContext<IAuthService | null>(null);

export const AuthServicePrv: React.FC<
  React.PropsWithChildren<{ mock?: boolean }>
> = (props) => {
  const authService = useMemo((): IAuthService => {
    return props.mock ? new AuthServiceMock() : new AuthService();
  }, [props.mock]);
  return (
    <AuthServiceCtx.Provider value={authService}>
      {props.children}
    </AuthServiceCtx.Provider>
  );
};

export const useAuthServiceCtx = (): IAuthService => {
  const service = useContext(AuthServiceCtx) ?? new AuthService();
  return service;
};
