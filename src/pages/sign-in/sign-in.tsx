import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useForm } from 'react-hook-form';
import { signIn, signInWithGoogle } from 'utils/firesbase';

import { APPLICATION_URLS } from 'utils/constants';

import s from './sign-in.module.css';

type SignUpFormValues = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signIn(data.email, data.password);

      navigate(APPLICATION_URLS.dashboard);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.box}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="email" {...register('email', { required: true })} />
        {errors.email && <span className={s.error}>This field is required</span>}
        <input
          type="password"
          placeholder="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span className={s.error}>This field is required</span>}
        <button type="submit">Login</button>
        <GoogleButton onClick={signInWithGoogle} label="Sign in with Google" />
        <Link to={APPLICATION_URLS.signUp}>create account</Link>
      </form>
    </div>
  );
}
