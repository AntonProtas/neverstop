import { useNavigate } from 'react-router-dom';

import { Tracker } from 'components/tracker/tracker';

import { logOut } from 'utils/firesbase';

import s from './dashboard.module.css';
import { APPLICATION_URLS } from 'utils/constants';

const trackers = new Array(20).fill(null);

export function Dashboard() {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logOut();

      navigate(APPLICATION_URLS.signIn);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className={s.logOut} onClick={onLogout}>
        log out
      </button>
      <div className={s.box}>
        {trackers.map((_, index) => (
          <Tracker key={index} />
        ))}
      </div>
    </>
  );
}
