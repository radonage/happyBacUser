import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useCourse(subjectId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);

    api
      .get(`/courses?subjectId=${subjectId}`)
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, [subjectId]);

  return { courses, loading };
}