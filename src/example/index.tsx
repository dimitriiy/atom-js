import React, { useState } from 'react';
import './styles.css';
import { PriceInput } from './PriceInput';
import { Results } from './Results';
import { DiscountInput } from './DiscountInput';
import { createAtom } from '@/lib';
import { useAtom, useAtomValue } from '@/lib/react-binding';

const priceAtom = createAtom(1000);
const quantityAtom = createAtom(1);
const discountAtom = createAtom(10);

const subtotalAmountAtom = createAtom((get) => {
  return get(priceAtom) * get(quantityAtom);
});

export const PriceCalculator: React.FC = () => {
  const [price, setPrice] = useAtom(priceAtom);
  const [quantity, setQuantity] = useAtom(quantityAtom);

  const [discountPercent, setDiscountPercent] = useAtom(discountAtom);

  const subtotal = useAtomValue(subtotalAmountAtom);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  console.log('render');
  return (
    <div className="calculator">
      <h1>Калькулятор цены</h1>

      <div className="inputs-grid">
        <PriceInput value={price} onChange={setPrice} label="Цена за единицу" />
        <PriceInput value={quantity} onChange={setQuantity} label="Количество" />

        <DiscountInput discountPercent={discountPercent} setDiscountPercent={setDiscountPercent} />
      </div>

      <Results subtotal={subtotal} discountAmount={discountAmount} total={total} />
    </div>
  );
};
