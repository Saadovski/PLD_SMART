import {Link } from "react-router-dom";

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    console.log(`%c${email} ${password}`, 'color: #cc0000');

    fetch(REACT_APP_API_URL + 'users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('successfully logged');
          const newToken = { token: data.token, expiration: new Date().getTime() + 1000 * 60 * 2 };
          localStorage.setItem('projetpmToken', JSON.stringify({ token: newToken.token, expiration: newToken.expiration })); // 2h
          authContext.login(newToken);
          document.querySelector('.connection-info').innerHTML = 'Connexion réussie !';
          window.location.href = "/";
        } else {
          document.querySelector('.connection-info').innerHTML = 'La connexion a échoué';
        }
      });
  };

function Signup() {

    return (
      <div>
            <Link to="/" className="btn btn-primary">Retour</Link>
      </div>  
    );
}

export default Signup;