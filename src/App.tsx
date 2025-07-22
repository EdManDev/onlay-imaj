import React, { useState, useEffect } from 'react';
import ImagePreview from './components/ImagePreview';
import OCRComponent from './components/OCRComponent';
import DropAndCrop from './components/DropAndCrop';

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [currentView, setCurrentView] = useState<'ocr' | 'crop'>('ocr');

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          processImageFile(file);
          setError('');
        }
        return;
      }
    }

    setError('Please paste an image file. Other content types are not supported.');
    setTimeout(() => setError(''), 3000);
  };

  const processImageFile = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      if (file.type.startsWith('image/')) {
        processImageFile(file);
        setError('');
      } else {
        setError('Please drop an image file.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          {/* Header */}
          <header className="text-center animate-fade-in" style={{ marginBottom: '3rem' }}>

            <h1 className="heading-1">
              Onlay-imaj
            </h1>

            <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
              Transform images into text instantly with AI-powered OCR technology.
              Simply paste or drag any image to extract text in multiple languages.
            </p>

            {/* Feature badges and navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', alignItems: 'center' }}>


              {/* Navigation Buttons */}
              <div className="flex items-center gap-md">
                <button
                  onClick={() => setCurrentView('ocr')}
                  className={currentView === 'ocr' ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  OCR Reader
                </button>
                <button
                  onClick={() => setCurrentView('crop')}
                  className={currentView === 'crop' ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Crop & Download
                </button>
              </div>
            </div>
          </header>

          {/* Error Message */}
          {error && (
            <div className="card animate-slide-in" style={{
              background: 'var(--error-50)',
              border: '1px solid var(--error-200)',
              marginBottom: '2rem',
              padding: 'var(--space-lg)'
            }}>
              <div className="flex items-center gap-md">
                <svg width="20" height="20" fill="none" stroke="var(--error-500)" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ color: 'var(--error-600)', fontWeight: '600' }}>{error}</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            {currentView === 'ocr' ? (
              <div className="grid grid-2">
                {/* Left Panel */}
                <div className="card card-padding">
                  <ImagePreview
                    imageUrl={imageUrl}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                </div>

                {/* Right Panel */}
                {imageFile && (
                  <div className="card card-padding animate-slide-in" style={{ animationDelay: '400ms' }}>
                    <OCRComponent imageFile={imageFile} language="eng" />
                  </div>
                )}
              </div>
            ) : (
              <div className="card card-padding">
                <DropAndCrop onBack={() => setCurrentView('ocr')} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center" style={{
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 'var(--font-size-sm)',
            marginTop: '50px'
          }}>
            EdManDev 2025 all Right reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App
