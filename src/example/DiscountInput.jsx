import React from 'react';

export const DiscountInput = ({ discountPercent, setDiscountPercent }) => {
  return (
    <div className="discount-input-wrapper">
      <label className="discount-label">Скидка %</label>
      <div className="discount-input-container">
        <input
          type="range"
          className="discount-slider"
          min="0"
          max="100"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(Number(e.target.value))}
        />
        <span className="discount-value">{discountPercent}%</span>
      </div>
    </div>
  );
};
