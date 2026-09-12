import React, { useState, useMemo } from "react";

const MOCK_RATES = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const amountInUSD = useMemo(() => {
    return amount / MOCK_RATES[fromCurrency];
  }, [amount, fromCurrency]);

  const finalConvertedValue = amountInUSD * MOCK_RATES[toCurrency];

  function onAmountChange(e) {
    setAmount(Number(e.target.value) || 0);
  }

  function onFirstSelectChange(e) {
    setFromCurrency(e.target.value);
  }

  function onSecondSelectChange(e) {
    setToCurrency(e.target.value);
  }

  return (
    <div className="app-wrapper">
      <h1 className="title-card">Moneta Conversions</h1>

      <div className="currency-converter-box">
        <input type="number" value={amount} onChange={onAmountChange} />
        <select value={fromCurrency} onChange={onFirstSelectChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <select value={toCurrency} onChange={onSecondSelectChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <p id="conversion-result">
          {finalConvertedValue.toFixed(2)} {toCurrency}
        </p>
      </div>
    </div>
  );
}
