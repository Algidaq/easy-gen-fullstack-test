import { useReducer, ChangeEvent } from 'react';
import { z } from 'zod';
import {
  useAuthServiceCtx,
  IAuthError,
  AuthInvalidLoginCredentialError,
} from '../../services';

import DashboardModule from '../../../Dashboard';
import { toast } from 'react-toastify';

const kLoginSchema = z.object({
  email: z
    .string({ required_error: 'email field is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'password filed is required' })
    .min(8, { message: 'Password min length is 8' }),
});

type ILoginFormState = {
  email: string;
  password: string;
  formError: {
    email?: string;
    password?: string;
  } | null;
  btnState: 'idel' | 'busy';
};

type ILoginFormActions =
  | { type: 'update_email'; payload: Pick<ILoginFormState, 'email'> }
  | { type: 'update_password'; payload: Pick<ILoginFormState, 'password'> }
  | { type: 'update_form_error'; payload: Pick<ILoginFormState, 'formError'> }
  | { type: 'update_login'; payload: Pick<ILoginFormState, 'btnState'> };

const kInitialState: ILoginFormState = {
  email: '',
  password: '',
  formError: null,
  btnState: 'idel',
};

function loginReducer(
  state: ILoginFormState,
  action: ILoginFormActions
): ILoginFormState {
  switch (action.type) {
    case 'update_email':
      return { ...state, email: action.payload.email };
    case 'update_password':
      return { ...state, password: action.payload.password };
    case 'update_form_error':
      return { ...state, formError: action.payload.formError };
    case 'update_login':
      return { ...state, btnState: action.payload.btnState };
    default:
      return state;
  }
}

function validateLoginForm(
  form: Pick<ILoginFormState, 'email' | 'password'>
): Pick<ILoginFormState, 'formError'> {
  const result = kLoginSchema.safeParse(form);

  return {
    formError: result.success
      ? null
      : {
          email: result.error.formErrors.fieldErrors.email?.[0],
          password: result.error.formErrors.fieldErrors.password?.[0],
        },
  };
}

export const useLoginPageState = () => {
  const [state, dispatch] = useReducer(loginReducer, kInitialState);
  const dashboardRouter = DashboardModule.useDashboardRouter();

  const authService = useAuthServiceCtx();

  const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'update_email', payload: { email: event.target.value } });
  };

  const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'update_password',
      payload: { password: event.target.value },
    });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formError = validateLoginForm(state).formError;

    const isFormInvalid = formError !== null;

    dispatch({ type: 'update_form_error', payload: { formError: formError } });

    if (isFormInvalid) {
      return;
    }

    dispatch({ type: 'update_login', payload: { btnState: 'busy' } });
    const data = await authService.login(state.email, state.password);

    dispatch({ type: 'update_login', payload: { btnState: 'idel' } });

    if (data instanceof IAuthError) {
      //todo show error toast
      let message = 'An Error Occurred';

      if (data instanceof AuthInvalidLoginCredentialError)
        message = 'Invaild login credentials';

      toast.error(message);
      return;
    }

    localStorage.setItem('authorization', data.accessToken);
    dashboardRouter.navigateToProfile();
  };

  return Object.freeze({
    state: state,
    actions: {
      handleOnEmailChange,
      handleOnPasswordChange,
      handleOnSubmit,
    },
  });
};
