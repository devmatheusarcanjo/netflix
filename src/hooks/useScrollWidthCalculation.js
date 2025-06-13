import { useEffect, useCallback, useState } from 'react';
import serviceScrollWidthCalculation from '@/utils/serviceScrollWidthCalculation.js';
import { useLayoutEffect } from 'react';

export default function useScrollWidthCalculation(
  { setData, getMovies, gender, inView },
  element
) {
  const [condition, setCondition] = useState([]);
  const [page, setPage] = useState(1);

  const handleCondition = useCallback(
    (event) => {
      const result = serviceScrollWidthCalculation({
        event,
        condition,
        setCondition,
      });

      if (result) {
        setPage(page + 1);
        setCondition(result);
      }
    },
    [condition, page, inView]
  );

  useEffect(() => {
    getMovies({
      cache: true,
      params: {
        with_genres: gender,
        page,
      },
    }).then((e) => {
      setData((before) => [...before, e.results]);
    });
  }, [page]);

  useLayoutEffect(() => {
    if (!element) return;

    element.addEventListener('scroll', handleCondition);

    // return () => {
    //   element.removeEventListener('scroll', handleCondition);
    // };
  }, [handleCondition, inView]);
}
