'use client'
import React, { useState, useMemo } from 'react';

const currencyPairs = [
  'USD/JPY',
  'EUR/USD',
  'GBP/USD',
  'AUD/USD',
  'USD/CAD',
  'USD/CHF',
  'NZD/USD',
];

const accountSize = [
  '10,000',
  '25,000',
  '50,000',
  '100,000',
  '200,000',
]


const getPipSize = (pair: string) => {
  return pair === 'USD/JPY' ? 0.01 : 0.0001;
};

const getPipValue = (pair: string, entry: number): number => {
  if (entry === 0) return 0;

  switch (pair) {
    case 'USD/JPY':
    case 'USD/CHF':
    case 'USD/CAD':
      // USD as base; pip value = (100,000 * pip size) / entry
      return (100000 * getPipSize(pair)) / entry;
    case 'EUR/USD':
    case 'GBP/USD':
    case 'AUD/USD':
    case 'NZD/USD':
      // USD as quote; pip value = 10 USD per pip per standard lot
      return 10;
    default:
      return 10; // fallback
  }
};

const Main: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState<number | ''>('');
  const [stopLoss, setStopLoss] = useState<number | ''>('');
  const [takeProfit, setTakeProfit] = useState<number | ''>('');
  const [volume, setVolume] = useState<number | ''>('');
  const [selectedPair, setSelectedPair] = useState('GBP/USD');
  const [selectedAccountSize, setAccountSize] = useState('100,000')

  const pipSize = useMemo(() => getPipSize(selectedPair), [selectedPair]);
  const pipValue = typeof entryPrice === 'number' ? getPipValue(selectedPair, entryPrice) : 0;


  const calculate = () => {
    if (entryPrice === '' || stopLoss === '' || takeProfit === '' || volume === '') return null;

    const numericAccountSize = Number(selectedAccountSize.replace(/,/g, ''));

    const volumeValue = Number(volume);
    const riskPips = Math.abs(entryPrice - stopLoss) / pipSize;
    const rewardPips = Math.abs(entryPrice - takeProfit) / pipSize;

    const riskAmount = riskPips * pipValue * volumeValue;
    const rewardAmount = rewardPips * pipValue * volumeValue;
    const rrr = rewardPips / riskPips;

    const riskPercent = 1; // 1% risk (strictly hardcoded for discipline to risk percentage)
    const riskDollarAmount = (numericAccountSize * riskPercent) / 100;
    const lotSize = riskDollarAmount / (riskPips * pipValue);

    return {
      riskAmount,
      rewardAmount,
      rrr: rrr.toFixed(2),
      lotSize: lotSize.toFixed(2)
    };
  };

  const results = calculate();

  return (
    <main className="max-w-xl mx-auto px-6 py-8 bg-gray-900 rounded-lg shadow-lg text-white mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">{selectedPair} Pip Calculator</h2>

      {/* Currency Selector */}
      <div className="text-center mb-6">
        <label htmlFor="currency-pairs" className="mr-2 font-semibold">Select Pair:</label>
        <select
          id="currency-pairs"
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          {currencyPairs.map((pair) => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </select>
      </div>

      {/* Account Size Selector */}
      <div className="text-center mb-6">
        <label htmlFor="account-size" className="mr-2 font-semibold">Account Size:</label>
        <select
          id="account-size"
          value={selectedAccountSize}
          onChange={(e) => setAccountSize(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          {accountSize.map((size) => (
            <option key={size} value={size}>{`$${size}`}</option>
          ))}
        </select>
      </div>


      <div className="grid grid-cols-2 gap-4">
        {/* Entry Price */}
        <label className="flex flex-col">
          Entry Price
          <input
            type="number"
            step={pipSize}
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
            step={pipSize}
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
            step={pipSize}
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </label>
      </div>

      {/* Volume */}
      <label className="flex flex-col mt-4">
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
          <p>📊 Lot Size: <strong>{results.lotSize}</strong></p>
        </div>
      )}
    </main>
  );
};

export default Main;
