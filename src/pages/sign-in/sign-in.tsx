import { useForm } from 'react-hook-form';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signInRequest, signInWithGoogleRequest } from 'api/user';

import { Button } from 'ui/button/button';
import { Input } from 'ui/input/input';
import { APPLICATION_URLS } from 'utils/constants';
import { parseError } from 'helpers/data-transform';
import { getFormError } from 'helpers/forms';

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
      await signInRequest(data.email, data.password);

      navigate(APPLICATION_URLS.dashboard);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  return (
    <div className={s.box}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          error={getFormError('email', errors.email?.type)}
        />
        <Input
          label="Password"
          type="Password"
          placeholder="password"
          {...register('password', { required: true })}
          error={getFormError('password', errors.password?.type)}
        />
        <Button type="submit">Login</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogleRequest();
          }}
          icon={<BsGoogle />}
        >
          Sign in with Google
        </Button>
        <Link to={APPLICATION_URLS.signUp}>create account</Link>
      </form>
    </div>
  );
}
