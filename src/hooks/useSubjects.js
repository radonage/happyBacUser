import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useSubject(countryId, levelId = null) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    let url = `/subjects?countryId=${countryId}`;

    // optionnel : filtrage par level si ton backend le supporte
    if (levelId) {
      url += `&levelId=${levelId}`;
    }

    api
      .get(url)
      .then((res) => setSubjects(res.data))
      .finally(() => setLoading(false));
  }, [countryId, levelId]);

  return { subjects, loading };
}