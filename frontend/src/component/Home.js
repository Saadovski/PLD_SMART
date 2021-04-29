function Home() {
  return (
    <div>
      <h1>Walou</h1>
      <div>Slogan ...</div>

      <div>Explication de l'app ...</div>
      <div>Connecte-toi pour utiliser Walou</div>
      <button className="bouton-gris-rempli texte-blanc" onClick={(event) => {window.location.href="/initialisation"}}>Cliquez ici</button>
    </div>

  );
}

export default Home;
