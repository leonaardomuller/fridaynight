function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateEventName() {
  const adjectives = ["Epic", "Amazing", "Legendary", "Energetic", "Mystical"];
  const genres = ["Rock 'n Roll", "Jazz", "Hip Hop", "Country", "Pop"];
  const bands = ["Kiss", "Queen", "Eagles", "Beatles", "Coldplay"];

  const adjective = getRandomElement(adjectives);
  const genre = getRandomElement(genres);
  const band = getRandomElement(bands);

  return `${adjective} ${genre} ${band}`;
}
