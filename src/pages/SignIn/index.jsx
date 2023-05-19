import { useNavigate } from 'react-router-dom'
import './signInStyle.scss'
import { useForm } from "react-hook-form";


function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  let jwt = localStorage.getItem("jwt")
  if(jwt) {
    navigate("/user")
  }
  
  const onSubmit = async (data) => {
    const dataLogin = data
    
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(dataLogin)
      })
      const data = await response.json();
      if(data.body.token) {
        localStorage.setItem("jwt", data.body.token)
        navigate("/user")
        if(dataLogin.remember) {
          localStorage.setItem("email", (dataLogin.email))
          localStorage.setItem("psw", (dataLogin.password))
        }
        if(!dataLogin.remember) {
          localStorage.removeItem("email")
          localStorage.removeItem("psw")
        }
        
      }
    } catch (error) {
      console.log(error)
    }  
    
  }
  let rmb = {
    'email': localStorage.getItem("email"),
    'password': localStorage.getItem("psw")
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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