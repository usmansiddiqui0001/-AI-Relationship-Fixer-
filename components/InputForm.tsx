import React from 'react';
import { Topic, FormData, Mood, Relationship, FontStyle, FontSize, Tone, ShayarStyle } from '../types';
import { TOPIC_OPTIONS, MISTAKE_PLACEHOLDERS, LANGUAGE_OPTIONS, MOOD_OPTIONS, RELATIONSHIP_OPTIONS, FONT_STYLE_OPTIONS, FONT_STYLE_MAP, FONT_SIZE_OPTIONS, TONE_OPTIONS, SHAYAR_STYLE_OPTIONS, PERSONAL_RELATIONSHIPS } from '../constants';

interface InputFormProps {
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
  formData: FormData;
  onFormChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, onReset, isLoading, formData, onFormChange }) => {
  const { relationship, mood, mistake, topic, tone, language, useEmojis, fontStyle, fontSize, colors, shayarStyle } = formData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mistake.trim()) {
        alert("Please describe what happened. This field can't be empty.");
        return;
    }
    onSubmit();
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('colors', { background: e.target.value });
  }

  const labelStyle = "font-bold mt-5 block text-[#d6336c] text-[1.2rem]";
  const inputStyle = `w-full p-4 mt-2.5 rounded-[20px] border border-[#ddd] text-[1.1rem] text-center focus:outline-none focus:ring-2 focus:ring-[#d6336c]`;
  const buttonStyle = "bg-[#ff69b4] text-white border-none py-4 px-[30px] rounded-[30px] text-[1.1rem] cursor-pointer transition-all duration-300 shadow-[0_4px_10px_rgba(255,105,180,0.4)] hover:bg-[#ff4d94] disabled:opacity-60";

  const isPersonalRelationship = PERSONAL_RELATIONSHIPS.includes(relationship);

  return (
    <div className="bg-white rounded-[30px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-full text-center">
      <form onSubmit={handleSubmit} className="space-y-1">
        
        <div>
          <label htmlFor="relationship" className={labelStyle}>
            Relationship Type
          </label>
          <select
            id="relationship"
            value={relationship}
            onChange={(e) => onFormChange('relationship', e.target.value as Relationship)}
            className={inputStyle}
          >
            {RELATIONSHIP_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
           <label htmlFor="mood" className={labelStyle}>
            Their Current Mood
          </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => onFormChange('mood', e.target.value as Mood)}
              className={inputStyle}
            >
              {MOOD_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
        </div>

        <div>
          <label htmlFor="mistake" className={labelStyle}>
            What Happened?
          </label>
          <textarea
            id="mistake"
            rows={3}
            value={mistake}
            onChange={(e) => onFormChange('mistake', e.target.value)}
            className={`${inputStyle} h-auto`}
            placeholder={MISTAKE_PLACEHOLDERS[relationship]?.[mood] || "Describe what happened..."}
            required
          />
        </div>
        
        <div>
           <label htmlFor="topic" className={labelStyle}>
            Message Type
          </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => onFormChange('topic', e.target.value as Topic)}
              className={inputStyle}
            >
              {TOPIC_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
        </div>
        
        <div>
           <label htmlFor="tone" className={labelStyle}>
            Message Tone
          </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => onFormChange('tone', e.target.value as Tone)}
              className={inputStyle}
            >
              {TONE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
        </div>
            
         <div>
            <label htmlFor="language" className={labelStyle}>
              Preferred Language
            </label>
            <select
                id="language"
                value={language}
                onChange={(e) => onFormChange('language', e.target.value)}
                className={inputStyle}
            >
                {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        
        {isPersonalRelationship && (
          <div>
            <label htmlFor="shayarStyle" className={labelStyle}>
              Shayar Style
            </label>
            <select
              id="shayarStyle"
              value={shayarStyle}
              onChange={(e) => onFormChange('shayarStyle', e.target.value as ShayarStyle)}
              className={inputStyle}
            >
              {SHAYAR_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="fontStyle" className={labelStyle}>
            Message Font Style
          </label>
          <select
            id="fontStyle"
            value={fontStyle}
            onChange={(e) => onFormChange('fontStyle', e.target.value as FontStyle)}
            className={inputStyle}
            style={{ fontFamily: FONT_STYLE_MAP[fontStyle] }}
          >
            {FONT_STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={{fontFamily: FONT_STYLE_MAP[option.value]}}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fontSize" className={labelStyle}>
            Message Font Size
          </label>
          <select
            id="fontSize"
            value={fontSize}
            onChange={(e) => onFormChange('fontSize', e.target.value as FontSize)}
            className={inputStyle}
          >
            {FONT_SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
            <label htmlFor="useEmojis" className={labelStyle}>Use Emojis</label>
            <select
                id="useEmojis"
                value={useEmojis ? 'Yes' : 'No'}
                onChange={(e) => onFormChange('useEmojis', e.target.value === 'Yes')}
                className={inputStyle}
            >
                <option value="Yes">Yes 👍</option>
                <option value="No">No 👎</option>
            </select>
        </div>

        <div>
            <label htmlFor="background" className={labelStyle}>
                Message Background
            </label>
             <input 
                type="color" 
                id="background" 
                value={colors.background} 
                onChange={handleColorChange}
                className={`${inputStyle} p-1 h-[58px] cursor-pointer`}
            />
        </div>


        <div className="flex gap-5 justify-center pt-[30px]">
            <button
              type="submit"
              disabled={isLoading}
              className={buttonStyle}
            >
              {isLoading ? 'Generating...' : '💌 Generate Message'}
            </button>
            <button
              type="button"
              onClick={onReset}
              disabled={isLoading}
              className={`${buttonStyle} bg-[#aaa] hover:bg-[#888]`}
            >
              Clear
            </button>
        </div>
        
      </form>
    </div>
  );
};

export default InputForm;