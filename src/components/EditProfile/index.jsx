import { useForm } from "react-hook-form";
import { UserProfile } from "../../utils/userProfile";
import "./editProfileStyle.scss"
import { useState } from "react";
function EditProfile({jwt}) {
    const { data } = UserProfile(jwt)
    console.log(data)
    const fullName = `${data.firstName} ${data.lastName} !`
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [visible, setVisible] = useState('close')
    const [name, setName] = useState(data.userName)
    const [message, setMessage] = useState("")
     const setCollapse = () => {
        setVisible(visible === 'close' ? 'open' : 'close')
        setMessage('')
     }
     const onSubmit = async (data) => {
        let token = localStorage.getItem("jwt")
        const dataLogin = data
        try {
           const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify(dataLogin)
          })
          const newData = await response.json();
          if(newData) {
            console.log(newData.body)
            setName(newData.body.userName)
            console.log(newData.body.userName)
            setMessage('<p>User name uptdate</p>')
          }
        } catch (error) {
          console.log(error)
        }  
        
      }
    return (
        <section className="profile">
            <div className="header">
                <h1>Welcome back<br />{fullName}</h1>
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
                defaultValue={name}
                />
                {errors.email && <span>This field is required</span>}
            </div>
            <div className="input-wrapper">
                <label htmlFor='firstName'>First name</label>
                <input 
                type="text" 
                id='firstName' 
                name='firstName'
                disabled 
                defaultValue={data.firstName}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor='lastName'>Last name</label>
                <input 
                type="text" 
                id='lastName' 
                name='lastName'
                disabled 
                defaultValue={data.lastName}
                />
            </div>
            <p>{message}</p>
            <div className="button-group">
                <button type="submit" className="sign-in-button">Save</button>
                <button type="reset" className="sign-in-button" onClick={() => setCollapse()}>Cancel</button>
            </div>
            </form>
        </section>
    )
    
}

export default EditProfile