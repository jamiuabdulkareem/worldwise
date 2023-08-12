import { useSearchParams } from "react-router-dom";

function useURLPosition() {
  // get latitude and lng param
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export default useURLPosition;
