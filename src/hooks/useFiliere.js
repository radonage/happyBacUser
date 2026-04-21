import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useFiliere(countryId) {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    api
      .get(`/filieres?countryId=${countryId}`)
      .then((res) => setFilieres(res.data))
      .finally(() => setLoading(false));
  }, [countryId]);

  return { filieres, loading };
}