import React, { useState, useCallback } from 'react';
import { FormData, Relationship, Mood, Topic, Tone, FontStyle, FontSize, ShayarStyle } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { generateRelationshipMessageStream } from './services/geminiService';
import TemplateSelector from './components/TemplateSelector';
import { Template } from './templates';

const initialFormData: FormData = {
  relationship: Relationship.Girlfriend,
  mood: Mood.Angry,
  mistake: '',
  topic: Topic.Apology,
  tone: Tone.Sincere,
  useEmojis: true,
  language: 'English',
  fontStyle: FontStyle.Elegant,
  fontSize: FontSize.Medium,
  colors: {
    background: '#ffe6f0',
  },
  shayarStyle: ShayarStyle.None,
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleFormChange = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTemplateSelect = useCallback((templateData: Template['data']) => {
    setFormData(prev => ({
        ...prev,
        ...templateData,
    }));
    setGeneratedMessage(null);
    setError(null);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedMessage(""); 

    try {
      const stream = await generateRelationshipMessageStream(formData);
      let fullMessage = "";
      for await (const chunk of stream) {
        fullMessage += chunk;
        setGeneratedMessage(fullMessage);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);
  
  const handleReset = useCallback(() => {
    setGeneratedMessage(null);
    setError(null);
    setIsLoading(false);
    setFormData(initialFormData);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center font-sans p-5"
      style={{ background: 'linear-gradient(135deg, #ffcccc, #ffe6e6)' }}
    >
      <Header />

      <main className="w-full max-w-[700px] mt-[30px]">
         <TemplateSelector onSelect={handleTemplateSelect} />
         <InputForm 
             onSubmit={handleFormSubmit} 
             onReset={handleReset}
             isLoading={isLoading} 
             formData={formData}
             onFormChange={handleFormChange}
         />
         { (isLoading || generatedMessage || error) && (
            <OutputDisplay
              isLoading={isLoading}
              message={generatedMessage}
              error={error}
              fontStyle={formData.fontStyle}
              fontSize={formData.fontSize}
              colors={formData.colors}
            />
         )}
      </main>
      
      <footer className="w-full text-center mt-[50px] pb-8 text-[#888] text-[1rem]">
        <p>Powered by Gemini AI. Handle with care, speak from the heart.</p>
      </footer>
    </div>
  );
};

export default App;
