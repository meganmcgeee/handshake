import findMatches from './findMatches';

export default function pollForMatches() {
  const seconds = n => n * 1000;
  setInterval(findMatches, seconds(10));
  findMatches();
}
