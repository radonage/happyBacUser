import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useLevel(countryId) {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    api
      .get(`/levels?countryId=${countryId}`)
      .then((res) => setLevels(res.data))
      .finally(() => setLoading(false));
  }, [countryId]);

  return { levels, loading };
}