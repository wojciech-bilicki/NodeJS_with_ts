import { writeFile } from 'fs/promises';

export const write = async (gameTitle: string) => {
  await writeFile('./list.txt', gameTitle)
}