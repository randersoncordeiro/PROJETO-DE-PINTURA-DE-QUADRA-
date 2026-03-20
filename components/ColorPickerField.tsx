
import React from 'react';

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPickerField: React.FC<ColorPickerFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400 uppercase">{value}</span>
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border-2 border-slate-600 bg-transparent overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
        />
      </div>
    </div>
  );
};

export default ColorPickerField;
