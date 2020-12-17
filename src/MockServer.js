import React, {useState} from 'react'
import axios from "axios"

function MockServer() {
  const [clicked,setClicked] = useState(false);
  const [username,setUsername] = useState("");
  const [error,setError] = useState("");
  
  const fetchUser = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users/1")
    // axios.get("https://jsonplaceholder.typicode.com/users/11")
      .then((res) => {
        const {username} = res.data
        setUsername(username)
        setClicked(true)
      }).catch (() => {
        setError("fetching failed !");
      });
  }
  const buttonText = clicked ? "loaded":"start fetch";
  
  return (
    <div>
      <button onClick ={fetchUser} disabled={clicked}>
        {buttonText}
      </button>
      {username && (<h3>{username}</h3>)}
      {error && (<p data-testid="error">{error}</p>)}
    </div>
  )
}

export default MockServer
