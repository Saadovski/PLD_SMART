import { InputGroup, FormControl } from 'react-bootstrap';

function Signup_profile(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/monespace";
        fetch('inscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: props.username,
              password: props.password,
              profile: [],
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("Success");
              window.location.href = "/monespace";
            }
            else {
              console.log("Failed");
            }
          });
    }

    return (
        <div className="signup_profile">
            <h1>Choisissez les genres qui vous attirent</h1>
            <div className="genres_Container">
                <input type="checkbox" id="action" name="action"/>
                <label htmlFor="scales">Action</label>
                <input type="checkbox" id="thriller" name="thriller"/>
                <label htmlFor="scales">Thriller</label>
                <input type="checkbox" id="sci-fi" name="sci-fi"/>
                <label htmlFor="scales">Science-Fiction</label>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Valider</button>
            </div>
        </div>

    );

}

export default Signup_profile;