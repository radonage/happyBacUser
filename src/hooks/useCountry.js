import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useCountry() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/countries")
      .then((res) => setCountries(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading };
}