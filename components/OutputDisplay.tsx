import React, { useState, useEffect } from 'react';
import { FontStyle, FontSize } from '../types';
import { FONT_STYLE_MAP, FONT_SIZE_MAP } from '../constants';
import { getContrastingTextColor } from '../utils/colorUtils';

interface OutputDisplayProps {
  isLoading: boolean;
  message: string | null;
  error: string | null;
  fontStyle: FontStyle;
  fontSize: FontSize;
  colors: {
    background: string;
  };
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, message, error, fontStyle, fontSize, colors }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isShareApiAvailable, setIsShareApiAvailable] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setIsShareApiAvailable(true);
    }
  }, []);

  const getTextContent = () => {
    if (!message) return "";
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleCopy = () => {
    const textToCopy = getTextContent();
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy message.');
      });
    }
  };
  
  const handleEmailShare = () => {
    const textToShare = getTextContent();
    if (textToShare) {
      const subject = "A message for you";
      const body = encodeURIComponent(textToShare);
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;
    }
  };

  const handleWhatsAppShare = () => {
    const textToShare = getTextContent();
    if (textToShare) {
      const encodedText = encodeURIComponent(textToShare);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGenericShare = async () => {
    const textToShare = getTextContent();
    if (textToShare && navigator.share) {
      try {
        await navigator.share({
          title: 'A message for you',
          text: textToShare,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  if (isLoading && !message) {
      return <div className="text-center p-6 text-gray-500 mt-[30px]">Generating...</div>;
  }
  if (error) {
      return <div className="bg-red-100 border-l-4 border-l-red-500 text-red-700 p-4 mt-[30px] rounded-lg text-left">{error}</div>;
  }
  if (message) {
      return (
          <div 
              className="text-left p-6 mt-[30px] rounded-[20px] border-l-[6px] border-l-[#ff69b4] leading-relaxed shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
              style={{ 
                  backgroundColor: colors.background,
                  color: getContrastingTextColor(colors.background),
                  fontFamily: FONT_STYLE_MAP[fontStyle],
                  fontSize: FONT_SIZE_MAP[fontSize]
              }}
          >
              <div className="flex justify-end gap-2 mb-4">
                 {isShareApiAvailable && (
                    <button
                        type="button"
                        onClick={handleGenericShare}
                        className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6336c]"
                        style={{ '--bg-color': colors.background } as React.CSSProperties}
                        aria-label="Share message"
                        title="Share"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                    </button>
                 )}
                 <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6336c]"
                    style={{ '--bg-color': colors.background } as React.CSSProperties}
                    aria-label="Share message via WhatsApp"
                    title="Share via WhatsApp"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                       <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                     </svg>
                  </button>
                 <button
                    type="button"
                    onClick={handleEmailShare}
                    className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6336c]"
                    style={{ '--bg-color': colors.background } as React.CSSProperties}
                    aria-label="Share message via email"
                    title="Share via email"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.803V4.697l-5.803 3.558Z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6336c]"
                    style={{ '--bg-color': colors.background } as React.CSSProperties}
                    aria-label={isCopied ? "Copied to clipboard" : "Copy message"}
                    title={isCopied ? "Copied!" : "Copy message"}
                  >
                    {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-green-700" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/>
                        </svg>
                    ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    )}
                  </button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: message }} />
          </div>
      );
  }
  return null;
}

export default OutputDisplay;