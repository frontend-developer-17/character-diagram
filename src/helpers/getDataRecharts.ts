import { TCharacter } from "../types";

export function dataRecharts(
  characters: TCharacter[],
  setData: (data: { name: string; uv: number }[]) => void,
  beginningPeriod: number | null = null,
  endPeriod: number | null = null
) {
  const data = characters.reduce((acc, value) => {
    if (value.house) {
      if (beginningPeriod !== null && endPeriod !== null) {
        if (
          value.yearOfBirth === null ||
          value.yearOfBirth < beginningPeriod ||
          value.yearOfBirth > endPeriod
        ) {
          return acc;
        }
      }

      const name = value.house;
      const findHouseAcc = acc.find((el) => el.name === name);
      if (findHouseAcc) {
        findHouseAcc.uv++;
      } else {
        acc.push({ name, uv: 1 });
      }
    }
    return acc;
  }, [] as { name: string; uv: number }[]);
  setData(data);
}
