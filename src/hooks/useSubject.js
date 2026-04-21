import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useSubject(countryId) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    api
      .get(`/subjects?countryId=${countryId}`)
      .then((res) => setSubjects(res.data))
      .finally(() => setLoading(false));
  }, [countryId]);

  return { subjects, loading };
}