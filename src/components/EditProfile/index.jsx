import { useForm } from "react-hook-form";
import "./editProfileStyle.scss"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Loader, LoaderWrapper } from "../../utils/loader";
import { userSelector, clearState, updateUserBytoken } from "../../features/UserSlices";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  //let token = localStorage.getItem("token")
  const [visible, setVisible] = useState('close')
  const [message, setMessage] = useState("")
  const setCollapse = () => {
    setVisible(visible === 'close' ? 'open' : 'close')
    setMessage('')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);
  useEffect(() => {
    dispatch(updateUserBytoken());
    dispatch(clearState());
  }, [dispatch]);

  const { userName, firstName, lastName } = useSelector(userSelector);
  
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, dispatch, navigate]);

  const onSubmit = async (data) => {
    dispatch(updateUserBytoken(data));
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

    if (isSuccess) {
      dispatch(clearState());
      setMessage("User name update !")
    }
  }, [dispatch,isError, isSuccess, errorMessage, setMessage]);
  

  return (
    <section className="profile">
    {isFetching ? (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>    
    ) : (
      <>
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName} !</h1>
          <button className="edit-button" onClick={() => setCollapse()}>Edit Name</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={`bgw collapse ${visible}`}>
          <div className="input-wrapper">
            <label htmlFor='userName'>User name</label>
            <input 
              type="text" 
              id='userName' 
              name='userName'
              {...register("userName", { required: true })} 
              defaultValue={userName}
            />
            {errors.userName && <span>This field is required</span>}
          </div>
          <div className="input-wrapper">
            <label htmlFor='firstName'>First name</label>
            <input    
              type="text" 
              id='firstName' 
              name='firstName'
              disabled 
              defaultValue={firstName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor='lastName'>Last name</label>
            <input 
              type="text" 
              id='lastName' 
              name='lastName'
              disabled 
              defaultValue={lastName}
            />
          </div>
          <p>{message}</p>
          <div className="button-group">
            <button type="submit" className="sign-in-button">Save</button>
            <button type="reset" className="sign-in-button" onClick={() => setCollapse()}>Cancel</button>
          </div>
        </form>
      </>
    )}
    </section>
  )
}

export default EditProfile