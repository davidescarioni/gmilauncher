import React, {useState} from 'react';
import Card from './card';

export default function GameCards() {
  const [gameList, setGameList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [actualPage, setActualPage] = useState("");
  let result = [];

  async function fetchGames(page) {
    let url = "http://gmitalia.altervista.org/launcher/games.php";
    if (page !== undefined) {
      url = page;
      setActualPage(page);
    }
    let response = await fetch(url);
    setSearched(true);
    if (response.ok) {
      let json = await response.json();
      if (json.games.length > 0) {
        result = [...gameList, ...json.games];
        //result.sort((a, b) => a.name.localeCompare(b.name))
        setGameList(result);
        setNextPage(json.nextPageUrl);
      } else {
        setNextPage("");
      }
    }
  }
  
  if (!searched) {
    fetchGames();
  }
  
  return (
    <div className="main">
      {/* <div className="gameCards__filter">
        <button onClick={() => setGameList(gameList.sort((a, b) => a.name.localeCompare(b.name)))}>a-Z</button>
      </div> */}
      <ul className="gameCards">
        {gameList!==undefined && gameList.length>0 && (
          gameList.map((game, index) => (
            <Card key={game.name} title={game.name} author={game.author} description={game.short_description} image={game.image_url} download_url={game.download_url} ></Card>
          ))
        )}
      </ul>
      {nextPage!=="" && (<button className="gameCards__btn-search" onClick={() => fetchGames(nextPage)}>Carica Successivi</button>)}
    </div>
  )
}