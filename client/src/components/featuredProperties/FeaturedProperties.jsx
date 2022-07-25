import "./featuredProperties.css";
import useFetch from "../../hooks/use-fetch";

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch("/hotels?featured=true&limit=5")
  return (
    <div className="fp">
      {
        loading
        ? "Loading..."
        : <>
              {
                data && data.map((item, i) =>
                    <div className="fpItem" key={i}>
                      <img
                          src={item.photos[0]}
                          alt="Hotel image"
                          className="fpImg"
                      />
                      <span className="fpName">{item.name}</span>
                      <span className="fpCity">{item.city}</span>
                      <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                      { item.raiting &&
                        <div className="fpRating">
                          <button>{item.raiting}</button>
                          <span>Excellent</span>
                        </div>
                      }
                    </div>
                )
              }
          </>
      }
    </div>
  );
};

export default FeaturedProperties;
