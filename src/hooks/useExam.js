import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useExam(countryId) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    api
      .get(`/exams?countryId=${countryId}`)
      .then((res) => setExams(res.data))
      .finally(() => setLoading(false));
  }, [countryId]);

  return { exams, loading };
}