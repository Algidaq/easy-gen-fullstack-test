import React, { useEffect } from 'react';
import { useProfilePageState } from './useProfilePage';
import styles from './ProfilePage.module.css';
import { Button } from '../../../../components';
export const ProfilePage: React.FC = () => {
  const { state, actions } = useProfilePageState();
  useEffect(() => {
    actions.loadProfileDetails().then();
  }, []);
  return (
    <div className={styles.profileContainer}>
      {state.stateEnum === 'busy' ? 'Loading ...' : <></>}
      {state.stateEnum === 'error' ? 'An Error Occurred' : <></>}
      {state.stateEnum === 'success' ? (
        <div className={styles.userInfo}>
          <p>Welcome back {state.userInfo?.name}</p>
          <p>Email: {state.userInfo?.email}</p>
          <Button text="Logout" onClick={actions.handleOnLogout} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
