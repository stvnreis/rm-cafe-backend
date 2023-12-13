export function removeDuplicates(arr: number[]): number[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}
