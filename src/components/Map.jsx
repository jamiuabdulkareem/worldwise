import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // get latitude and lng param
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 55 });
        }}
      >
        Change pos
      </button>
    </div>
  );
}

export default Map;
