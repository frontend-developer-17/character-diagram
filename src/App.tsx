import styles from "./App.module.css";
import Recharts from "./components";
import { useAddCharacters } from "./components/hooks/addCharacters";

function App() {
  const [characters, isLoading, error] = useAddCharacters();
  return (
    <div className={styles.App}>
      {isLoading ? (
        "Данные загружаются..."
      ) : error ? (
        error
      ) : (
        <Recharts characters={characters} />
      )}
    </div>
  );
}

export default App;
