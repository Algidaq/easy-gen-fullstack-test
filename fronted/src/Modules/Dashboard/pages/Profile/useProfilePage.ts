import { useReducer } from 'react';
import {
  IProfileServiceError,
  ProfileServiceUnAuthorizedError,
  useProfileServiceCtx,
} from './services/ProfileService';
import { useNavigate } from 'react-router-dom';

type IProfilePageState = {
  stateEnum: 'idel' | 'busy' | 'success' | 'error';
  userInfo: { id: string; name: string; email: string } | null;
  error?: unknown;
};

const kInitialState: IProfilePageState = {
  stateEnum: 'idel',
  userInfo: null,
};

function profileReducer(
  state: IProfilePageState,
  next: Partial<IProfilePageState>
): IProfilePageState {
  return { ...state, ...next };
}

export const useProfilePageState = () => {
  const [state, updateState] = useReducer(profileReducer, kInitialState);
  const profileService = useProfileServiceCtx();
  const navigate = useNavigate();

  const loadProfileDetails = async () => {
    updateState({ stateEnum: 'busy' });
    const data = await profileService.getUserProfile();

    if (data instanceof IProfileServiceError)
      return handleOnLoadDetailsError(data);

    updateState({ stateEnum: 'success', userInfo: data });
  };
  const handleOnLoadDetailsError = (data: IProfileServiceError) => {
    if (data instanceof ProfileServiceUnAuthorizedError) {
      handleOnLogout();
      return;
    }
    updateState({ stateEnum: 'error' });
  };
  const handleOnLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
    return;
  };
  return Object.freeze({
    state,
    actions: {
      loadProfileDetails,
      handleOnLogout,
    },
  });
};
