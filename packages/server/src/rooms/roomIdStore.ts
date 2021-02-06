const ids = new Set();

export function isIdFree(id: string): boolean {
  return ids.has(id);
}

export function takeId(id: string) {
  ids.add(id);
}

export function freeId(id: string) {
   ids.delete(id);
}
