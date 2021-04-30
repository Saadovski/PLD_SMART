function Signup_profile(props) {

    const genres = ["Action","Thriller","Science-Fiction"];

    const handleSubmit = (e) => {
        e.preventDefault();

        let profile = [];
        for(let i=0; i<genres.length; i++) {
          if(document.querySelector("#"+genres[i]).checked === true){
            profile.push(genres[i]);
          }
        }

        fetch('inscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: props.username,
              password: props.password,
              profile: profile,
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
                {genres.map((genre, index) => {
                  return (
                    <div className="genre" key={index} >
                      <input type="checkbox" id={genre} name={genre}/>
                      <label htmlFor="scales">{genre}</label>
                    </div>
                  );
                })}
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Valider</button>
            </div>
        </div>

    );

}

export default Signup_profile;