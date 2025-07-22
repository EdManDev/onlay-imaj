import React, { useState } from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onDragOver, onDrop }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    onDragOver(e);
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    onDrop(e);
    setIsDragActive(false);
  };

  return (
    <div
      className="card"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: isDragActive
          ? '2px dashed var(--primary-400)'
          : imageUrl
            ? '2px solid var(--gray-200)'
            : '2px dashed var(--gray-300)',
        background: isDragActive
          ? 'var(--primary-50)'
          : 'rgba(255, 255, 255, 0.5)',
        cursor: 'pointer',
        transition: 'all var(--transition-base)',
        transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Active Overlay */}
      {isDragActive && (
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'var(--primary-100)',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <div className="text-center">
            <div className="card animate-pulse" style={{
              width: '64px',
              height: '64px',
              background: 'var(--primary-500)',
              margin: '0 auto var(--space-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="heading-3" style={{ color: 'var(--primary-700)' }}>
              Drop your image here!
            </p>
          </div>
        </div>
      )}

      {imageUrl ? (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={imageUrl}
            alt="Uploaded content"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 'var(--radius-lg)'
            }}
          />
          <div className="status-indicator status-success" style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-md)'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--success-500)',
              borderRadius: '50%'
            }}></div>
            Image loaded
          </div>
        </div>
      ) : (
        <div className="text-center" style={{ padding: 'var(--space-xl)' }}>
          {/* Upload Icon */}
          <div className="card" style={{
            width: '80px',
            height: '80px',
            background: 'var(--gradient-primary)',
            margin: '0 auto var(--space-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform var(--transition-base)'
          }}>
            <svg width="40" height="40" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
            </svg>
          </div>

          <h3 className="heading-3" style={{ color: '#000000' }}>Upload Your Image</h3>

          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="flex items-center justify-center gap-sm" style={{
              marginBottom: 'var(--space-sm)',
              flexWrap: 'wrap'
            }}>
              <div className="status-indicator" style={{
                background: 'var(--gray-100)',
                color: 'var(--gray-600)'
              }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ctrl+V to paste
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
              or drag & drop an image file here
            </p>
          </div>

          {/* Supported formats */}
          <div className="flex items-center justify-center gap-sm" style={{ flexWrap: 'wrap' }}>
            {['JPG', 'PNG', 'WEBP', 'GIF'].map((format) => (
              <span key={format} className="status-indicator" style={{
                background: 'var(--gray-50)',
                color: 'var(--gray-500)',
                border: '1px solid var(--gray-200)'
              }}>
                {format}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;