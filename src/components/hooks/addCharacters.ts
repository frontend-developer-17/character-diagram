import { useEffect, useState } from "react";
import { TCharacter } from "../../types";
import axios from "axios";

export const useAddCharacters = ():[TCharacter[],boolean,string] => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<TCharacter[]>(
          "https://hp-api.onrender.com/api/characters"
        );

        setCharacters(data);
      } catch (error) {
        setError("Данные не получилось загрузить!");
      } finally {
        setIsLoading(false);
      }
    }
    getCharacters();
  }, []);
  return [characters, isLoading, error];
};
