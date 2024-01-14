import { useForm } from 'react-hook-form';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUserRequest, signInWithGoogleRequest } from 'api/user';

import { Button } from 'ui/button/button';
import { Input } from 'ui/input/input';
import { APPLICATION_URLS } from 'utils/constants';
import { parseError } from 'helpers/data-transform';
import { getFormError } from 'helpers/forms';

import s from './sign-up.module.css';

type SignUpFormValues = {
  email: string;
  password: string;
};

export function SignUp() {
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
      await createUserRequest(data.email, data.password);

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
        <Button type="submit">Create account</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogleRequest();
          }}
          icon={<BsGoogle />}
        >
          Sign up with Google
        </Button>
        <Link to={APPLICATION_URLS.signIn}>already has account</Link>
      </form>
    </div>
  );
}
