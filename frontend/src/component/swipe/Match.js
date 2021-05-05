import "../../styles/match.css";

function Match(props) {

    const url='url('+ props.url + ')';

    return (
        <div id="match" className="popupMatch hide">
            <h2 className="texte-vert">Vous avez un match !</h2>
            <div className='cardContainer'>
                <div>
                    <div className='texte-vert background-vide'><h3>{props.title}, {props.year} ({props.runtime})</h3></div>
                    <hr></hr>
                    <div style={{ backgroundImage: url}} className='card'>
                        </div>

                        <hr></hr>
                        <h4 className="texte-vert"> {props.genre.join(" ")}</h4>
                        <div className="texte-vert">{props.synopsis}
                        </div>
                        <div className="texte-vert">{props.id}</div>
                </div>
            </div>
        </div>
    );
}

export default Match;