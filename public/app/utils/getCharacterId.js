//Character IDs. Include 731, exclude 0.
export default function getCharacterId() {
  return Math.floor(Math.random() * 731) + 1;
}
