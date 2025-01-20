import PropTypes from 'prop-types';
import { useState } from 'react';

Register.propTypes = {
  signedInfunction: PropTypes.func,
};

function Register(props) {
  const [isRegister, setIsRegister] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to register user and save data to users collection
  async function handleRegister() {
    try {
      const response = await fetch('http://localhost:5861/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setFullname("");
        setEmail("");
        setPassword("");
        setIsRegister(true);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('Something went wrong, please try again',error.message);
    }
  }

  // Function to login user with email and password
  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:5861/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', result.accessToken);
        props.signedInfunction();
      } else {
        setError(result.message || 'Invalid credentials');
        setPassword('');
      }
    } catch (error) {
      setError('Something went wrong, please try again',error.message);
    }
  }

  // Function to handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (isRegister) {
      handleLogin();
    } else {
      handleRegister();
    }
  }

  return (
    <div className="registerBackground">
      <div className="left_section">
        <img
          src="https://i.ibb.co/yFNrFkk/Shoppy-Globe.png"
          alt="Shoppy-Globe"
          className="logo"
        />
        <h2>ShoppyGlobe</h2>
        <hr />
        <p style={{ textAlign: 'justify' }}>
          We bring you a wide range of delicious and fresh food products to
          satisfy every craving. Also explore a variety of lipsticks, eyeshadows,
          foundations, and skincare essentials, designed by leading beauty brands
          and made to suit your unique beauty needs. Order from our carefully
          curated selection of ingredients, packaged goods, beverages, and fresh
          produce, and have them delivered right to your door. With a focus on
          quality, freshness, and convenience, our food section is designed to
          make your culinary journey exciting and easy.
        </p>
        <hr />
      </div>
      <div className="registerLayout">
        <h2>{!isRegister ? 'Register Yourself' : 'LogIn'}</h2>
        <form className="formBackground" onSubmit={handleSubmit}>
          {!isRegister && (
            <div className="registerCredentials">
              <label className="registerLabel" htmlFor="name">
                Fullname:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your fullname"
                className="registerInput"
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          )}
          <div className="registerCredentials">
            <label className="registerLabel" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="registerInput"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="registerCredentials">
            <label className="registerLabel" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="registerInput"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  width: '200px',
                  color: 'blue',
                }}
              >
                {!isRegister?"Already have an account?":"Create new account"}
              </button>
            
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{ display: 'flex', width: '500px', justifyContent: 'center' }}>
            <button type="submit" className="registerBtn">
              {!isRegister ? 'Register' : 'LogIn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
