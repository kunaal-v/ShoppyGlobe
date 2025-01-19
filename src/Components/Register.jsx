import PropTypes from 'prop-types';
import { useState } from 'react';
Register.propTypes={
    signedInfunction:PropTypes.func,
};
// this component is used to register and login the user 
function Register(props){
    const [isRegister,setIsRegister]=useState(false)
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
// this function is used to register and user and save the data of the user to users collection
    function handleRegister()
    {
        const response=fetch("http://localhost:5861/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                fullname:fullname,
                email:email,
                password:password
            })
        })
        const result=response.then((data)=>data.json());
        result.then(()=>{
            setFullname("");
            setEmail("");
            setPassword("");
            setIsRegister(true);
        })
        
    }
// this function is used to login the user is email and password is correct
    function handleLogin()
    {
        const response=fetch("http://localhost:5861/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        });
        const result=response.then((data)=>data.json());
        result.then((data)=>{
            if(data=="user not exist")
            {
                return (
                    <>
                    {setIsRegister(false)}
                    {alert("User not registered yet")}
                    {setEmail("")}
                    {setPassword("")}
                    <Register />
                    </>
                )
            }
            if(data=="invalid password")
            {
                return (
                    <>
                    {setIsRegister(true)}
                    {alert("password is invalid, kindly enter the password carefully")}
                    {setPassword("")}
                    {/* <Register /> */}
                    </>
                )
            }
            localStorage.setItem("accessToken", data.accessToken);
            props.signedInfunction();
        })

    }
    // this function will set the isRegister to ture and user will see the login inputs 
    function signedIn()
    {
        setIsRegister(true);
    }
    function handleSubmit(e)
    {
        e.preventDefault();
    }
    return(
        <div className="registerBackground">
            <div className="left_section">
           <img src="https://i.ibb.co/yFNrFkk/Shoppy-Globe.png" alt="Shoppy-Globe" className="logo"/>
                <h2>ShoppyGlobe</h2>
                <hr />
                <p style={{textAlign:"justify"}}>We bring you a wide range of delicious and fresh food products to satisfy every craving.
                    Also explore a variety of lipsticks, eyeshadows, foundations, and skincare essentials, 
                    designed by leading beauty brands and made to suit your unique beauty needs.
                    Order from our carefully curated selection of ingredients, packaged goods, beverages, and 
                    fresh produce, and have them delivered right to your door. With a focus on quality, 
                    freshness, and convenience, our food section is designed to make your culinary journey exciting and easy. </p><hr />
            </div>
            <div className="registerLayout">
                <div>
                <h2> {!isRegister?"Register Yourself":"LogIn"}</h2>
                </div>
                <form className="formBackground" onSubmit={handleSubmit}>
                
                    {!isRegister&&<div className="registerCredentials">
                    <label className="registerLabel" >Fullname:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your fullname"
                        className="registerInput"
                        value={fullname}
                        onChange={(e)=>setFullname(e.target.value)}
                    />
                    </div>}
                    <div className="registerCredentials">
                    <label className="registerLabel">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your Email"
                        className="registerInput"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>
                    <div className="registerCredentials">
                    <label className="registerLabel">Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter password"
                        className="registerInput"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {!isRegister&&<button onClick={signedIn} style={{backgroundColor:"white", border:"none", width:"200px" , color:"blue"}}> Already have and account?</button>}
                    </div>
                    <div style={{display:"flex" , width:"500px", justifyContent:"center"}}>
                    <button type="submit" className="registerBtn" onClick={!isRegister?handleRegister:handleLogin}>{!isRegister?"Register":"LogIn"}</button>
                    </div>
                </form> 
            </div>
    </div>
    )
}
export default Register;