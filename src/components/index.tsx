import { Cell, Pie, PieChart, PieLabelRenderProps, Tooltip } from "recharts";
import { TCharacter } from "../types";
import { useEffect, useRef, useState } from "react";
import styles from "./Recharts.module.css";
import { dataRecharts } from "../helpers/getDataRecharts";
type RechartsProps = {
  characters: TCharacter[];
};
const Recharts: React.FC<RechartsProps> = ({ characters }) => {
  const beginningPeriodRef = useRef<HTMLInputElement>(null);
  const endPeriodRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<{ name: string; uv: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAllPeriods, setIsAllPeriods] = useState(false);

  useEffect(() => {
    dataRecharts(characters, setData);
    setIsAllPeriods(true);
  }, [characters]);

  useEffect(() => {
    handleInputChange();
    const beginningInput = beginningPeriodRef.current;
    const endInput = endPeriodRef.current;

    return () => {
      if (beginningInput && endInput) {
        beginningInput.removeEventListener("input", handleInputChange);
        endInput.removeEventListener("input", handleInputChange);
      }
    };
  }, []);

  const addPeriod = () => {
    const beginningPeriod = Number(beginningPeriodRef.current?.value);
    const endPeriod = Number(endPeriodRef.current?.value);
    dataRecharts(characters, setData, beginningPeriod, endPeriod);
    setIsAllPeriods(false);
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const handleInputChange = () => {
    if (buttonRef.current) {
      buttonRef.current.disabled =
        beginningPeriodRef.current?.value === "" ||
        endPeriodRef.current?.value === "" ||
        Number(endPeriodRef.current?.value) === 0;
    }
  };
  const getAllPeriods = () => {
    dataRecharts(characters, setData);
    setIsAllPeriods(true);
    if (beginningPeriodRef.current && endPeriodRef.current) {
      beginningPeriodRef.current.value = "";
      endPeriodRef.current.value = "";
    }
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  return (
    <div className={styles.wpapper}>
      <PieChart width={400} height={400}>
        <Pie
          data={data !== null ? data : []}
          dataKey="uv"
          innerRadius={data !== null ? 10 : 0}
          fill={data !== null ? "#8884d8" : "transparent"}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={true}
          label={({ name }: PieLabelRenderProps) => name}
        >
          {data?.length === 0 && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              Данных с таким периодом нет!
            </text>
          )}
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className={styles.wrapperPeriod}>
        <div>
          <label className={styles.labelPeriod}>Диапозон дат рождений</label>
          <div className={styles.wrapperInput}>
            <div className="">
              <div>С</div>
              <div>По</div>
            </div>
            <div className="">
              <div className="">
                <input
                  ref={beginningPeriodRef}
                  className={styles.inputPeriod}
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <input
                  ref={endPeriodRef}
                  className={styles.inputPeriod}
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <button
            ref={buttonRef}
            className={styles.buttonPeriod}
            onClick={addPeriod}
          >
            Задать период
          </button>
          <button
            disabled={isAllPeriods}
            style={{ marginLeft: "5px" }}
            onClick={getAllPeriods}
          >
            Все периоды
          </button>
        </div>
      </div>
    </div>
  );
};
export default Recharts;
