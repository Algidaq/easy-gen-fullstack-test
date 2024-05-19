import React from 'react';
import { AuthServicePrv } from '../../services';
import { useSignupPageState } from './useSignupPage';
import { AuthFormHeader } from '../../component';
import {
  Button,
  Gap,
  Input,
  InputContainer,
  InputErrorMessage,
  InputLabel,
} from '../../../../components';
import styles from './Signup.module.css';
import { loginRoute } from '../Login';

export const SignupPage: React.FC = () => {
  return (
    <AuthServicePrv>
      <SignupForm />
    </AuthServicePrv>
  );
};

const SignupForm: React.FC = () => {
  const { state, actions } = useSignupPageState();
  return (
    <div className={styles.container}>
      <AuthFormHeader
        title="Welcome To Our Community"
        subtitle="Already have an account?"
        link={{ to: loginRoute.path ?? '', text: 'Log in' }}
      />
      <Gap vertical={32} />
      <form className={styles.formContainer} onSubmit={actions.handleOnSubmit}>
        <InputContainer>
          <InputLabel>Name</InputLabel>
          <Input
            fullWidth
            type="name"
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={actions.handleOnInputChange}
          />
          <InputErrorMessage message={state.formError?.name} />
        </InputContainer>
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input
            fullWidth
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={actions.handleOnInputChange}
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
            onChange={actions.handleOnInputChange}
          />
          <InputErrorMessage message={state.formError?.password} />
        </InputContainer>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            fullWidth
            type="password"
            name="confirmPass"
            id="confirmPass"
            placeholder="Confirm Password"
            onChange={actions.handleOnInputChange}
          />
          <InputErrorMessage message={state.formError?.confirmPass} />
        </InputContainer>
        <Button type="submit" text="Sign up" busy={state.btnState === 'busy'} />
      </form>
    </div>
  );
};
