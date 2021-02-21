/**
 * Get the angle in radiant between two points
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export function calculateAngle(x1: number, y1: number, x2: number, y2: number): number {
    return Math.atan2(y1 - y2, x1 - x2);
  }
  
  /**
   * Lerp between two values
   * @param a
   * @param b
   * @param n
   */
  export function lerp(a: number, b: number, n: number): number {
    n = Math.min(n, 1);
    return (1 - n) * a + n * b;
  }
  
  const MAX_RADS = 2*Math.PI;
  export function radianLerp(start: number, end: number, amount: number): number {
    amount = Math.min(amount, 1);
    const shortest_angle=((((end - start) % MAX_RADS) + (1.5 * MAX_RADS)) % MAX_RADS) - MAX_RADS/2;
  
    const newPos = start + (shortest_angle * amount) % MAX_RADS;
    if (start > end && end > newPos) {
      return end;
    }
    if (end > start && newPos > end) {
      return end;
    }
    return newPos
  }
  
  /**
   * Get the distance between two points
   * @param x
   * @param y
   * @param toX
   * @param toY
   */
  export function getDistance(x: number, y: number, toX: number, toY: number): number {
    return Math.hypot(toX - x, toY - y);
  }
  
  /**
   * Get a random integer between min and max.
   * @param {number} min - min number
   * @param {number} max - max number
   */
  export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  /**
   * Clamp a value
   * @param value
   * @param min
   * @param max
   */
  export function clamp(value: number, min: number, max: number): number {
    return value > max ? max : value < min ? min : value;
  }
  
  /**
   * Round a floating number to 2 digits
   * @param value
   */
  export function round2Digits(value: number): number {
    return Math.round(Math.round(value * 1000) / 10) / 100;
  }
  
  /**
   * Normalize a vector
   * @param ax
   * @param ay
   */
  export function normalize2D(ax: number, ay: number): number {
    return Math.sqrt((ax * ax) + (ay * ay));
  }
  
  /**
   * Transform an angle in degrees to the nearest cardinal point.
   */
  type Cardinal = 'E' | 'NE' | 'N' | 'NW' | 'W' | 'SW' | 'S' | 'SE';
  export function degreeToCardinal(degree: number): Cardinal {
    const cardinals: Cardinal[] = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
    const remainder = degree %= 360;
    const index = Math.round((remainder < 0 ? degree + 360 : degree) / 45) % 8;
    return cardinals[index];
  }
  
  /**
   * Reverse a number between a range
   * @example
   * reverseNumber(1.2, 0, 3) // returns 1.8
   */
  export function reverseNumber(num: number, min: number, max: number): number {
    return (max + min) - num;
  }
  
  /**
   * Snap a position on a grid with TILE_SIZE cells
   * @param pos The position to snap
   * @param tileSize The tile size to snap to
   */
  export function snapPosition(pos: number, tileSize: number): number {
    const rest = pos % tileSize;
    return rest < tileSize / 2
      ? -rest
      : tileSize - rest;
  }
  
  /**
   * Shuffles an array
   */
  export function shuffleArray(array: any[]) {
    const result = [...array];
  
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
  
    return result;
  }
  
  export function randomItem<T>(array: T[]): T {
    const index = Math.floor(Math.random()*array.length);
    return array[index];
  }
  