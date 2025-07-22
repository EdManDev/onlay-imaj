import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

interface OCRComponentProps {
  imageFile: File | null;
  language: string;
}

const OCRComponent: React.FC<OCRComponentProps> = ({ imageFile, language }) => {
  const [ocrText, setOcrText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const performOCR = async () => {
    if (!imageFile) return;

    setIsProcessing(true);
    setError('');
    setOcrText('');
    setProgress(0);

    try {
      const result = await Tesseract.recognize(
        imageFile,
        language,
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          }
        }
      );

      setOcrText(result.data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR processing failed');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    if (ocrText) {
      try {
        await navigator.clipboard.writeText(ocrText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  React.useEffect(() => {
    if (imageFile) {
      performOCR();
    }
  }, [imageFile]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div className="flex items-center gap-md">
        <div className="card flex items-center justify-center" style={{
          width: '40px',
          height: '40px',
          background: 'var(--success-50)',
          border: '1px solid var(--success-200)'
        }}>
          <svg width="20" height="20" fill="none" stroke="var(--success-600)" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="heading-2" style={{ marginBottom: '0' }}>Text Extraction</h2>
          <p className="text-sm" style={{ color: 'var(--gray-500)', margin: '0' }}>AI-powered OCR results</p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="card animate-slide-in" style={{
          background: 'var(--error-50)',
          border: '1px solid var(--error-200)',
          padding: 'var(--space-lg)'
        }}>
          <div className="flex items-center gap-md">
            <svg width="20" height="20" fill="none" stroke="var(--error-500)" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="heading-3" style={{ color: 'var(--error-700)', marginBottom: 'var(--space-xs)' }}>
                Processing Error
              </h3>
              <p className="text-sm" style={{ color: 'var(--error-600)', margin: '0' }}>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="card animate-fade-in" style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-200)',
          padding: 'var(--space-xl)'
        }}>
          <div className="flex items-center gap-lg">
            <div className="card animate-pulse flex items-center justify-center" style={{
              width: '48px',
              height: '48px',
              background: 'var(--gradient-primary)',
              flexShrink: 0
            }}>
              <svg className="animate-spin" width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-sm)' }}>
                <h3 className="heading-3" style={{ color: 'var(--primary-700)', marginBottom: '0' }}>
                  Extracting text from image...
                </h3>
                <span className="status-indicator" style={{
                  background: 'var(--primary-200)',
                  color: 'var(--primary-800)',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}>
                  {progress}%
                </span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs" style={{ color: 'var(--primary-600)', margin: '0' }}>
                This may take a few moments depending on image complexity...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results State */}
      {ocrText && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--success-500)',
                borderRadius: '50%'
              }}></div>
              <h3 className="heading-3" style={{ marginBottom: '0' }}>Extracted Text</h3>
              <div className="status-indicator" style={{
                background: 'var(--gray-100)',
                color: 'var(--gray-600)'
              }}>
                {ocrText.length} characters
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className={copied ? "btn btn-success" : "btn btn-primary"}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          {/* Text Content */}
          <div className="card" style={{
            position: 'relative',
            maxHeight: '300px',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: 'var(--space-lg)',
              background: 'var(--gray-50)',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--gray-800)',
                lineHeight: 'var(--line-height-loose)',
                margin: '0'
              }}>
                {ocrText}
              </pre>
            </div>
            {ocrText.length > 500 && (
              <div className="status-indicator" style={{
                position: 'absolute',
                top: 'var(--space-md)',
                right: 'var(--space-md)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--gray-200)'
              }}>
                Scroll to view more
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between" style={{
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid var(--gray-200)'
          }}>

            <div className="status-indicator status-success">
              <div style={{
                width: '4px',
                height: '4px',
                backgroundColor: 'var(--success-500)',
                borderRadius: '50%'
              }}></div>
              Ready
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRComponent;