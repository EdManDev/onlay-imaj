// File utility functions for image processing

// Get file extension from base64 string
export const getFileExtensionOfBase64 = (base64String: string): string => {
  const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return 'png';
  }
};

// Convert base64 image to canvas with crop
export const image64ToCanvasRef = (
  canvasRef: HTMLCanvasElement,
  image64: string,
  crop: any,
  imgRef: any
): void => {
  if (!canvasRef || !image64 || !crop) return;

  const canvas = canvasRef;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const image = new Image();
  image.onload = () => {
    const scaleX = imgRef.scaleX || 1;
    const scaleY = imgRef.scaleY || 1;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  };
  image.src = image64;
};

// Download base64 file
export const downloadBase64File = (base64Data: string, fileName: string): void => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = base64Data;
  link.click();
};

// Convert base64 to File object (for upload purposes)
export const base64StringToFile = (base64String: string, fileName: string): File => {
  const arr = base64String.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], fileName, { type: mime });
};