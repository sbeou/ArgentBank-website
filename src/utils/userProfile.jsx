import { useEffect, useState } from "react";

export function UserProfile(token) {
  const [data, setData] = useState({})
  useEffect(() => {
    if(token === null) return
    async function getUserProfile() {
          try {
              const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
              "Authorization": "Bearer " + token
          }
        })
        const data = await response.json();  
        setData(data.body)  
          } catch (err) {
          console.log(err)
      }
  } 
   getUserProfile() 
}, [token])
return { data }
}