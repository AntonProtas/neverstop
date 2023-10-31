//libs
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//api
import { createUserRequest, signInWithGoogleRequest } from 'api/user';
//helpers
import { parseError } from 'helpers/data-transform';
//constants
import { APPLICATION_URLS } from 'utils/constants';
//styles
import s from './sign-up.module.css';
import { Input } from 'ui/input/input';
import { getFormError } from 'helpers/forms';
import { Button } from 'ui/button/button';
import { BsGoogle } from 'react-icons/bs';

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
