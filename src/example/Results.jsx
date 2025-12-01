import React from 'react';

export const Results = ({ subtotal, discountAmount, total }) => {
  return (
    <div className="results">
      <div className="result-row">
        <span>Подытог:</span>
        <span className="amount">
          {subtotal.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
      <div className="result-row discount">
        <span>Скидка:</span>
        <span className="amount negative">
          -
          {discountAmount.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
      <div className="result-row total">
        <span className="total-label">Итого:</span>
        <strong className="total-amount">
          {total.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
          })}
        </strong>
      </div>
    </div>
  );
};
