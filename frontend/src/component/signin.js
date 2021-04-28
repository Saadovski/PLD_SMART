function Signin() {
    return (
      <div>
      <form>
      <label>
      Nom d'utilisateur :
      <input type="text" name="username" />
      </label>
      <label>
      Mot de passe :
      <input type="text" name="password" />
      </label>
      <div>

      </div>
      <input className="btn" type="submit" value="Connexion" />
      </form>
      </div>
    );
}

export default Signin;