import React from 'react';
import { MESSAGE_TEMPLATES, Template } from '../templates';

interface TemplateSelectorProps {
  onSelect: (data: Template['data']) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-bold text-center text-[#d6336c] mb-4">
        Need Inspiration? Try a Template! ✨
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-4 -mb-4">
        {MESSAGE_TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelect(template.data)}
            className="flex-shrink-0 bg-white border border-[#ffc2d8] text-[#d6336c] font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-[#fff0f6] hover:border-[#ff99b9] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ff69b4]"
            aria-label={`Use template: ${template.label}`}
          >
            {template.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
