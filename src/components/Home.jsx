import { dataArray } from "../constants/constants";
function Home() {
  return (
    <>
      <div className="home-main">
        <h1>Home</h1>
      </div>
      <div className="data-container">
        {dataArray.map((itm) => (
          <div key={itm.id} className="data-card-container">
            <div className="image-container">
              <img className="" src="http://imageurl.com" alt="albumcover" />
            </div>
            <div className="data-card-info-container">
              <p className="data-card-info">
                <a>{itm.name}</a>
              </p>
              <p>
                <a>{itm.artist}</a>
              </p>
              <p>
                <a>{itm.album}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
