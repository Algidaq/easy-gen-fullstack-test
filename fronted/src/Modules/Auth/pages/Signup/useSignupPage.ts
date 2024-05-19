import { useReducer, ChangeEvent } from 'react';
import { z } from 'zod';
import {
  useAuthServiceCtx,
  IAuthError,
  AuthUserAlreadyExistsError,
} from '../../services';
import DashboardModule from '../../../Dashboard';
import { toast } from 'react-toastify';

const kSignupSchema = z.object({
  name: z.string({ required_error: 'name field is required' }).min(3),
  email: z
    .string({ required_error: 'email field is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'password filed is required' })
    .min(8, { message: 'Password min length is 8' })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: 'Week password',
    }),
});

type SignupForm = z.infer<typeof kSignupSchema>;

type ISignupState = {
  formError: Partial<SignupForm> | null;
  btnState: 'idel' | 'busy';
} & SignupForm;

type ISignupActions =
  | { type: 'update_name'; payload: Pick<ISignupState, 'name'> }
  | { type: 'update_email'; payload: Pick<ISignupState, 'email'> }
  | { type: 'update_password'; payload: Pick<ISignupState, 'password'> }
  | { type: 'update_form_error'; payload: Pick<ISignupState, 'formError'> }
  | { type: 'update_login'; payload: Pick<ISignupState, 'btnState'> };

const kInitialState: ISignupState = {
  name: '',
  email: '',
  password: '',

  btnState: 'idel',
  formError: null,
};

function loginReducer(
  state: ISignupState,
  action: ISignupActions
): ISignupState {
  switch (action.type) {
    case 'update_name':
      return { ...state, name: action.payload.name };
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

function validateSignupform(form: SignupForm): Partial<SignupForm> | null {
  const result = kSignupSchema.safeParse(form);
  if (result.success) return null;
  return {
    name: result.error.formErrors.fieldErrors.name?.[0],
    email: result.error.formErrors.fieldErrors.email?.[0],
    password: result.error.formErrors.fieldErrors.password?.[0],
  };
}
const kSignupActionsMap: Record<
  keyof SignupForm | string,
  (value: string) => ISignupActions
> = {
  name: (value: string) => ({ type: 'update_name', payload: { name: value } }),
  email: (value: string) => ({
    type: 'update_email',
    payload: { email: value },
  }),
  password: (value: string) => ({
    type: 'update_password',
    payload: { password: value },
  }),
};

export const useSignupPageState = () => {
  const [state, dispatch] = useReducer(loginReducer, kInitialState);
  const dashboardRoutes = DashboardModule.useDashboardRouter();

  const authService = useAuthServiceCtx();

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const action: ISignupActions | undefined = kSignupActionsMap[
      event.target.name
    ]?.(event.target.value);
    if (!action) return;
    dispatch(action);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formError = validateSignupform(state);

    const isFormInvalid = formError !== null;

    dispatch({ type: 'update_form_error', payload: { formError: formError } });
    console.log('data', state);

    if (isFormInvalid) {
      return;
    }

    dispatch({ type: 'update_login', payload: { btnState: 'busy' } });

    const data = await authService.signup(
      state.name,
      state.email,
      state.password
    );

    dispatch({ type: 'update_login', payload: { btnState: 'idel' } });

    if (data instanceof IAuthError) {
      let message = 'An Error Occured';
      if (data instanceof AuthUserAlreadyExistsError) {
        message = 'User with the given email already exists';
      }
      toast.error(message);
      return;
    }

    localStorage.setItem('authorization', data.accessToken);
    dashboardRoutes.navigateToProfile();
  };

  return Object.freeze({
    state: state,
    actions: {
      handleOnInputChange,
      handleOnSubmit,
    },
  });
};
