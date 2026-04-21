import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useExercise(countryId, courseId) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    let url = "/exercises?countryId=" + countryId;

    if (courseId) {
      url = `/exercises/course/${courseId}?countryId=${countryId}`;
    }

    api
      .get(url)
      .then((res) => setExercises(res.data))
      .finally(() => setLoading(false));
  }, [countryId, courseId]);

  return { exercises, loading };
}