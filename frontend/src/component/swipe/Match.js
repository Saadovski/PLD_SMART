import "../../styles/match.css";

function Match(props) {

    const url='url('+ props.url + ')';

    const continuerSwipe = () => {
        const match = document.getElementById('match');
        match.style.display = 'none';
        match.style.transform = 'translateY(100%)';    
      }
    
    return (
        <div id="match" className="popupMatch hide">
            <h2 className="texte-vert">Vous avez un match !</h2>
            <div className='cardContainer'>
                <div>
                    <div className='texte-vert background-vide'><h3>{props.title}, {props.year} ({props.runtime})</h3></div>
                    <hr></hr>
                    <div onClick={() => window.location.href='https://www.netflix/'+props.id} style={{ backgroundImage: url}} className='card'>
                        </div>

                        <hr></hr>
                        <h4 className="texte-vert"> {props.genre.join(" ")}</h4>
                        <div className="texte-vert">{props.synopsis}
                        </div>
                        <div className="texte-vert">{props.id}</div>
                </div>
                <div className="bouton-vert-hover">
                <button className="bouton-vert-rempli" onClick={() => continuerSwipe()}> Continuer le swipe </button>
                </div>
            </div>
        </div>
    );
}

export default Match;