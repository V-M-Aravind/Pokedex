import bulbasur from "./bulbasur.json" assert { type: "json" };
import details from "./pokemon.json" assert { type: "json" };
import axios from "axios";
import fs from "fs";
import path from "path";

const getNormalisedStats = (stats) => {
  return stats.reduce(
    (acc, stat) => ({ ...acc, [stat.stat.name]: stat.base_stat }),
    {}
  );
};

const getNormalisedMoves = (moves) => {
  return moves.map((move) => move.move.name);
};

const getNormalisedImages = (images) => {
  console.log(images);
  return {
    image_default: images.other.home.front_default,
    smallImage: images.front_default,
  };
};

const getNormalisedTypes = (types) => {
  return types.map((type) => type.type.name);
};

const getNormalisedAbilities = (abilities) => {
  return abilities.map((ability) => ({
    isHidden: ability.is_hidden,
    name: ability.ability.name,
  }));
};

const getNormalisedData = (d) => {
  let {
    id,
    base_experience,
    cries,
    height,
    location_area_encounters,
    weight,
    name,
    stats,
    moves,
    sprites,
    types,
    abilities,
  } = d;
  let output = {
    id,
    base_experience,
    cries,
    height,
    location_area_encounters,
    name,
    weight,
    stats: getNormalisedStats(stats),
    moves: getNormalisedMoves(moves),
    images: getNormalisedImages(sprites),
    types: getNormalisedTypes(types),
    abilities: getNormalisedAbilities(abilities),
  };
  return output;
};
let finalData;
const { results } = details;
const fetchApIData = async () => {
  const promises = results.map(async (detail) => {
    const { data } = await axios.get(detail.url);
    const normalisedData = getNormalisedData(data);
    return normalisedData;
  });
  const resolvedData = await Promise.all(promises);
  finalData = resolvedData;
};
const writeData = async () => {
  try {
    const jsonString = JSON.stringify(finalData, null, 2);
    const outputFilePath = "./data/output.json";
    await fs.promises.mkdir(path.dirname(outputFilePath), { recursive: true });

    await fs.promises.writeFile(outputFilePath, jsonString);
    console.log(`Data written to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error writing to ${outputFilePath}:`, error);
    throw error;
  }
};
await fetchApIData();
writeData();
