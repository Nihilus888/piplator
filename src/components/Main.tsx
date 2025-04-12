'use client'
import React, { useState } from 'react';

const Main: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState<number | ''>('');
  const [stopLoss, setStopLoss] = useState<number | ''>('');
  const [takeProfit, setTakeProfit] = useState<number | ''>('');
  const [volume, setVolume] = useState<number | ''>('');
  const [isUSDJPY, setIsUSDJPY] = useState<boolean>(true); // Track if it's USD/JPY or other pair

  // Pip value and pip calculation logic for EUR/USD and USD/JPY
  const pipValue = entryPrice ? (isUSDJPY ? 1000 / entryPrice : 10) : 0; // USD/JPY or EUR/USD pip value

  const calculate = () => {
    if (entryPrice === '' || stopLoss === '' || takeProfit === '' || volume === '') return null;

    // Convert volume (lots) to number
    const volumeValue = Number(volume);

    // Calculate pips difference (Risk and Reward)
    const pipSize = isUSDJPY ? 0.01 : 0.0001; // USD/JPY uses 0.01, others like EUR/USD use 0.0001
    const riskPips = Math.abs(entryPrice - stopLoss) / pipSize;
    const rewardPips = Math.abs(entryPrice - takeProfit) / pipSize;

    // Calculate dollar amounts for risk and reward, scaled by the volume
    const riskAmount = riskPips * pipValue * volumeValue;  // Scale by volume (lot size)
    const rewardAmount = rewardPips * pipValue * volumeValue;  // Scale by volume (lot size)

    // Calculate the risk-reward ratio
    const rrr = rewardPips / riskPips;

    return {
      riskAmount,
      rewardAmount,
      rrr: rrr.toFixed(2),
    };
  };

  const results = calculate();

  return (
    <main className="max-w-xl mx-auto px-6 py-8 bg-gray-900 rounded-lg shadow-lg text-white mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">{isUSDJPY ? 'USD/JPY Currency Calculator' : 'GBP/USD Currency Calculator'}</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Entry Price */}
        <label className="flex flex-col">
          Entry Price
          <input
            type="number"
            step={isUSDJPY ? "0.01" : "0.0001"}
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </label>

        {/* Stop Loss */}
        <label className="flex flex-col">
          Stop Loss
          <input
            type="number"
            step={isUSDJPY ? "0.01" : "0.0001"}
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </label>

        {/* Take Profit */}
        <label className="flex flex-col">
          Take Profit
          <input
            type="number"
            step={isUSDJPY ? "0.01" : "0.0001"}
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </label>
      </div>

      {/* Volume */}
      <label className="flex flex-col">
        Volume (lots)
        <input
          type="number"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value === '' ? '' : Number(e.target.value))}
          className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
      </label>

      {/* Toggle Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsUSDJPY(!isUSDJPY)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Switch to {isUSDJPY ? 'GBP/USD' : 'USD/JPY'} Calculator
        </button>
      </div>

      {results && (
        <div className="mt-6 text-center">
          <p>📉 Risk: <strong>${results.riskAmount.toFixed(2)}</strong></p>
          <p>📈 Reward: <strong>${results.rewardAmount.toFixed(2)}</strong></p>
          <p>📊 Risk-Reward Ratio: <strong>{results.rrr}</strong></p>
        </div>
      )}
    </main>
  );
};

export default Main;
