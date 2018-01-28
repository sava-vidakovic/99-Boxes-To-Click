/*
  Return random element from array;
*/
export const sample = (array) => {
  return array[Math.floor(Math.random()*array.length)]
}
