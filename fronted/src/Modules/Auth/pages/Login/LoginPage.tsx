import React from 'react';
import { AuthServicePrv } from '../../services';
import { useLoginPageState } from './useLogin';
import styles from './Login.module.css';
import {
  Button,
  Gap,
  Input,
  InputContainer,
  InputErrorMessage,
  InputLabel,
} from '../../../../components';
import { AuthFormHeader } from '../../component';
import { signupRoute } from '../Signup';
export const LoginPage: React.FC = () => {
  return (
    <AuthServicePrv>
      <LoginForm />
    </AuthServicePrv>
  );
};

const LoginForm: React.FC = () => {
  const { state, actions } = useLoginPageState();

  return (
    <div className={styles.container}>
      <AuthFormHeader
        title="Welcome to Back"
        subtitle={`Don't have an account?`}
        link={{ to: signupRoute.path ?? '', text: 'Sign up' }}
      />
      <Gap vertical={32} />
      <form className={styles.formContainer} onSubmit={actions.handleOnSubmit}>
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input
            fullWidth
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={actions.handleOnEmailChange}
          />
          <InputErrorMessage message={state.formError?.email} />
        </InputContainer>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            fullWidth
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={actions.handleOnPasswordChange}
          />
          <InputErrorMessage message={state.formError?.password} />
        </InputContainer>

        <Button text="Sign In" busy={state.btnState === 'busy'} />
      </form>
    </div>
  );
};
