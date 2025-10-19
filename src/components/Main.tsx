'use client';
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
      return (100000 * getPipSize(pair)) / entry;
    case 'EUR/USD':
    case 'GBP/USD':
    case 'AUD/USD':
    case 'NZD/USD':
      return 10;
    default:
      return 10;
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
  
    const numericAccountSize = Number(selectedAccountSize.replace(/,/g, '') || 0);
    const volumeValue = Number(volume || 0);
    const safePipSize = pipSize || 1; // avoid division by 0
  
    const riskPips = Math.abs(Number(entryPrice) - Number(stopLoss)) / safePipSize;
    const rewardPips = Math.abs(Number(entryPrice) - Number(takeProfit)) / safePipSize;
  
    const safeRiskPips = riskPips || 1; // avoid div by zero
    const safePipValue = pipValue || 1;
  
    const riskAmount = riskPips * safePipValue * volumeValue;
    const rewardAmount = rewardPips * safePipValue * volumeValue;
    const rrr = rewardPips / safeRiskPips;
  
    const riskPercent = 1;
    const riskDollarAmount = (numericAccountSize * riskPercent) / 100;
    const lotSize = riskDollarAmount / (safeRiskPips * safePipValue);
  
    return {
      riskAmount,
      rewardAmount,
      rrr: rrr.toFixed(2),
      lotSize: lotSize.toFixed(2)
    };
  };

  const results = useMemo(() => calculate(), [entryPrice, stopLoss, takeProfit, volume, selectedPair, selectedAccountSize, pipSize, pipValue]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-6">
          <h1 className="text-center text-white text-3xl tracking-tight">Forex Pip Calculator</h1>
          <p className="text-center text-blue-100 mt-2">Calculate risk, reward & optimal lot size</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Selectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Currency Selector */}
            <div className="space-y-2">
              <label htmlFor="currency-pairs" className="block text-slate-300">
                Currency Pair
              </label>
              <select
                id="currency-pairs"
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              >
                {currencyPairs.map((pair) => (
                  <option key={pair} value={pair}>{pair}</option>
                ))}
              </select>
            </div>

            {/* Account Size Selector */}
            <div className="space-y-2">
              <label htmlFor="account-size" className="block text-slate-300">
                Account Size
              </label>
              <select
                id="account-size"
                value={selectedAccountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              >
                {accountSize.map((size) => (
                  <option key={size} value={size}>{`$${size}`}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Price */}
            <div className="space-y-2">
              <label htmlFor="entry-price" className="block text-slate-300">
                Entry Price
              </label>
              <input
                id="entry-price"
                type="number"
                step={pipSize}
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.00000"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Volume */}
            <div className="space-y-2">
              <label htmlFor="volume" className="block text-slate-300">
                Volume (lots)
              </label>
              <input
                id="volume"
                type="number"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Stop Loss */}
            <div className="space-y-2">
              <label htmlFor="stop-loss" className="block text-slate-300">
                Stop Loss
              </label>
              <input
                id="stop-loss"
                type="number"
                step={pipSize}
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.00000"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Take Profit */}
            <div className="space-y-2">
              <label htmlFor="take-profit" className="block text-slate-300">
                Take Profit
              </label>
              <input
                id="take-profit"
                type="number"
                step={pipSize}
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.00000"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <>
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

              <div className="space-y-4">
                <h3 className="text-slate-300 text-center">Calculation Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Risk Card */}
                  <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <span className="text-lg">📉</span>
                      <span>Risk</span>
                    </div>
                    <p className="text-3xl text-white">${results.riskAmount.toFixed(2)}</p>
                  </div>

                  {/* Reward Card */}
                  <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-500/30 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <span className="text-lg">📈</span>
                      <span>Reward</span>
                    </div>
                    <p className="text-3xl text-white">${results.rewardAmount.toFixed(2)}</p>
                  </div>

                  {/* Risk-Reward Ratio Card */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <span className="text-lg">📊</span>
                      <span>Risk-Reward Ratio</span>
                    </div>
                    <p className="text-3xl text-white">1:{results.rrr}</p>
                  </div>

                  {/* Lot Size Card */}
                  <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-500/30 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      <span className="text-lg">💰</span>
                      <span>Recommended Lot Size</span>
                    </div>
                    <p className="text-3xl text-white">{results.lotSize}</p>
                  </div>
                </div>

                <p className="text-center text-slate-500 text-xs mt-4">
                  Based on 1% risk per trade
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
