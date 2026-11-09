import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Igual ao `useReducedMotion` do framer-motion, mas seguro para HTML
 * pré-renderizado: o servidor não sabe a preferência do visitante, então a
 * primeira renderização no navegador precisa ser idêntica à do servidor
 * (senão a hidratação falha). A preferência real é aplicada logo após montar.
 */
export function useReducedMotionSafe(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && Boolean(prefersReducedMotion);
}
