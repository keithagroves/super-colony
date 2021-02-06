import { useEffect, useCallback, useRef } from "react";

export const useFrame = (c: (dx: number) => void) => {
  const cb = useCallback(c, []);
  const lastTime = useRef(0);
  const raf = useRef<ReturnType<typeof requestAnimationFrame>>();

  useEffect(() => {
    const cb2 = (dx: number) => {
      cb((dx - lastTime.current) / 16.7);
      lastTime.current = dx;
      raf.current = requestAnimationFrame(cb2);
    };
    raf.current = requestAnimationFrame(cb2);
    return () => {
      raf.current && cancelAnimationFrame(raf.current);
    };
  }, [cb]);
};
