import './App.css';

function HomePage() {
  return (
    <div className="App">
      <footer className="App-header">
        <div className="main">
          <div className="coteacote">
          <form>
            <input type="submit" value="Créer un compte"/>
            <input type="submit" value="Connexion"/>
          </form>
          </div>
          <p>
            Rejoindre une partie
          </p>
          <form>
            <label>
              <input type="text" name="code" placeholder="code"/>
            </label>
            <input type="submit" value="→"/>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;