'use client'
import React, { useState } from 'react';

const Main: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState<number | ''>('');
  const [stopLoss, setStopLoss] = useState<number | ''>('');
  const [takeProfit, setTakeProfit] = useState<number | ''>('');
  const [volume, setVolume] = useState<number | ''>('');

  // Approximate pip value for GBP/USD (for 1 standard lot)
  const pipValue = 10; // USD per pip for 1 standard lot

  const calculate = () => {
    if (entryPrice === '' || stopLoss === '' || takeProfit === '' || volume === '') return null;

    // Convert volume (lots) to number
    const volumeValue = Number(volume);

    // Calculate the pips difference (Risk and Reward)
    const riskPips = Math.abs(entryPrice - stopLoss) / 0.0001;
    const rewardPips = Math.abs(entryPrice - takeProfit) / 0.0001;


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
      <h2 className="text-2xl font-bold mb-6 text-center">USD currency calculator</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Entry Price */}
        <label className="flex flex-col">
          Entry Price
          <input
            type="number"
            step="0.0001"
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
            step="0.0001"
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
            step="0.0001"
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
