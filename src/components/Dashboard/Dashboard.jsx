"use client";

"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [amount, setAmount] = useState();
  const [years, setYears] = useState(1); 
  const [depositType, setDepositType] = useState("one-time");
  const [interestRate, setInterestRate] = useState(0); 

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleYearsChange = (e) => {
    setYears(Number(e.target.value));
  };

  const handleDepositTypeChange = (e) => {
    setDepositType(e.target.value);
  };

  const handleInterestChange = (e) => {
    setInterestRate(Number(e.target.value));
  };

  const calculateInvestment = () => {
    const months = years * 12;
    let results = [];
    let total = amount;

    const monthlyInterestRate = interestRate / 100 / 12; // precent per month

    // one time payment
    if (depositType === "one-time") {
      for (let month = 1; month <= months; month++) {
        total += total * monthlyInterestRate;
        results.push(total);
      }
    } else {
      // every month payment
      for (let month = 1; month <= months; month++) {
        total += amount; // add every month payment
        total += total * monthlyInterestRate;
        results.push(total);
      }
    }

    return results;
  };

  const data = {
    labels: Array.from({ length: years * 12 }, (_, i) => `Месяц ${i + 1}`),
    datasets: [
      {
        label: "Сумма депозита",
        data: calculateInvestment(),
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="form-container w-full max-w p-10">
      <div className="calculator flex h-screen">
        <div className="form-container w-[500px] pr-4 flex-col gap-4">
          <div>
            <label>Сумма депозита: </label>
            <input
              type="number"
              value={amount || ""}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label>Период (в годах): </label>
            <select
              className="select w-full"
              value={years}
              onChange={handleYearsChange}
            >
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year} лет
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Тип взноса: </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="depositType"
                  value="one-time"
                  checked={depositType === "one-time"}
                  onChange={handleDepositTypeChange}
                  className="radio"
                />
                Одноразовый взнос
              </label>
              <label>
                <input
                  type="radio"
                  name="depositType"
                  value="monthly"
                  checked={depositType === "monthly"}
                  onChange={handleDepositTypeChange}
                  className="radio"
                />
                Ежемесячный взнос
              </label>
            </div>
          </div>

          <div>
            <label>Процентная ставка (%): </label>
            <input
              type="number"
              value={interestRate || ""}
              onChange={handleInterestChange}
              placeholder="Введите процент (например, 5.5)"
              min="0.01"
              max="20"
              step="0.01"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="chart-container flex-1">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
