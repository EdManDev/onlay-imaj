import React from 'react';

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}

const languages = [
  { code: 'eng', name: 'English', flag: '🇺🇸' },
  { code: 'spa', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fra', name: 'French', flag: '🇫🇷' },
  { code: 'deu', name: 'German', flag: '🇩🇪' },
  { code: 'ita', name: 'Italian', flag: '🇮🇹' },
  { code: 'por', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'rus', name: 'Russian', flag: '🇷🇺' },
  { code: 'chi_sim', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'jpn', name: 'Japanese', flag: '🇯🇵' },
  { code: 'kor', name: 'Korean', flag: '🇰🇷' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => {
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="form-group">
      {/* Header */}
      <div className="flex items-center gap-md" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="card flex items-center justify-center" style={{ 
          width: '40px', 
          height: '40px',
          background: 'var(--secondary-50)',
          border: '1px solid var(--secondary-200)'
        }}>
          <svg width="20" height="20" fill="none" stroke="var(--secondary-600)" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </div>
        <div>
          <label htmlFor="language" className="form-label" style={{ marginBottom: '0' }}>
            Recognition Language
          </label>
        </div>
      </div>

      {/* Select Dropdown */}
      <div style={{ position: 'relative', marginBottom: 'var(--space-lg)' }}>
        <select
          id="language"
          value={language}
          onChange={(e) => onChange(e.target.value)}
          className="form-select"
          style={{ paddingRight: '3rem' }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div style={{ 
          position: 'absolute',
          right: 'var(--space-md)',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}>
          <svg width="20" height="20" fill="none" stroke="var(--gray-400)" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Selected language indicator */}
      <div className="status-indicator" style={{ 
        background: 'var(--primary-50)', 
        color: 'var(--primary-700)',
        justifyContent: 'flex-start'
      }}>
        <div style={{ 
          width: '6px', 
          height: '6px', 
          backgroundColor: 'var(--primary-500)', 
          borderRadius: '50%' 
        }}></div>
        <span>Selected: </span>
        <span style={{ fontWeight: '600' }}>
          {currentLanguage.flag} {currentLanguage.name}
        </span>
      </div>
    </div>
  );
};

export default LanguageSelector;