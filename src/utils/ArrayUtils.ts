export function choice<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleCopy<T>(array: T[]): T[] {
  const newArr = array.map(e => e);
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
  }
  return newArr;
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function swap<T>(array: T[], i: number, j: number) {
  if (i === j) {
    return;
  }
  const [a, b] = [i < j ? i : j, i < j ? j : i];
  const [t]: T[] = array.splice(a, 1, array[b]);
  array.splice(b, 1, t);
}
