import { useNavigate } from 'react-router-dom'
import './signInStyle.scss'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../../features/UserSlices';
import { useEffect } from 'react';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm()
  let token = localStorage.getItem("token")
  const { isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess && token != null) {
      dispatch(clearState());
      navigate('/user');
    }
  }, [dispatch,isError, isSuccess, errorMessage, navigate, token]);
  
  let rmb = {
    'email': localStorage.getItem("email"),
    'password': localStorage.getItem("psw")
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="input-wrapper">
            <label htmlFor='email'>Email</label>
            <input 
              type="email" 
              id='email' 
              name='email'
              {...register("email", { required: true })} 
              defaultValue={rmb.email}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="input-wrapper">
            <label htmlFor='password'>Password</label>
            <input 
              type="password" 
              id='password'
              name='password' 
              {...register("password", { required: true })}
              defaultValue={rmb.password}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="input-remember">
                <input type='checkbox' id='remember-me' {...register("remember")} />
                <label htmlFor='remember-me'>Remember me</label>
            </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}
export default SignIn