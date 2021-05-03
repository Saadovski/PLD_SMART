function Signup_profile(props) {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1024/api/';
    const genres = ["Action","Anime","Comedy","Documentary","Drama","Fantasy","French","Horror","Kids and family","Musical","Police","Awarded","Romance","Thriller","Science-Fiction"];

    const handleSubmit = (e) => {
        e.preventDefault();

        let profile = [];
        for(let i=0; i<genres.length; i++) {
          if(document.querySelector("#"+genres[i]).checked === true){
            profile.push(genres[i]);
          }
        }

        fetch(REACT_APP_API_URL+'user/inscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: props.username,
              password: props.password,
              profil: "Action",
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
      <div className="box-centre">
        <div className="signup_profile texte-centre">
            <h1>Choisissez les genres qui vous attirent</h1>
            <div className="genres_Container">
                {genres.map((genre, index) => {
                  return (
                    <div className="genre" key={index} >
                      <input type="checkbox" id={genre} name={genre}/>
                      <label htmlFor="scales">{genre}</label>
                    </div>
                  );
                })}
            </div>
            <div className="bouton-vert-hover">
                <button className="bouton-vert-rempli" type="submit" onClick={handleSubmit}>Valider</button>
            </div>
        </div>
        </div>

    );

}

export default Signup_profile;