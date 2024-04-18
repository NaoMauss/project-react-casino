import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

const e: number = 2 ** 52;
const salt: string = uuidv4();

const getLimboResult = (game_hash=uuidv4()): number => {
  const hm = createHmac('sha256', game_hash);
  hm.update(salt);
  const h = hm.digest("hex");
  if (parseInt(h, 16) % 33 === 0) {
    return 1;
  }
  const hSubstring = parseInt(h.substring(0, 13), 16);
  const result = (100 * e - hSubstring) / (e - hSubstring) / 100;
  return parseFloat(result.toFixed(2));
};


const getDiceResult = (): number => {
    return Math.floor(Math.random() * 100) + 1;
}


export { getLimboResult, getDiceResult }
