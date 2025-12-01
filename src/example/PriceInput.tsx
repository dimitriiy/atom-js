interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({ value, onChange, label }) => {
  return (
    <div className="price-input-wrapper">
      <label className="price-label">{label}</label>
      <div className="price-input-container">
        <span className="currency-symbol">₽</span>
        <input
          type="number"
          className="price-input"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};
