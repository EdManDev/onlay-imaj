# Onlay-imaj 🖼️➡️📝

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)](https://vitejs.dev/)
[![Tesseract.js](https://img.shields.io/badge/Tesseract.js-6.0.1-red.svg)](https://tesseract.projectnaptha.com/)

A modern, AI-powered OCR (Optical Character Recognition) application that transforms images into text instantly. Built with React, TypeScript, and Tesseract.js for accurate text extraction from images in multiple languages.

## 🚀 Live Demo

> **Try it now!** Simply paste an image from your clipboard (Ctrl+V) and watch the magic happen!

## ✨ Features

- **🖼️ Multi-format Image Support**: Drag and drop or paste images directly from clipboard (PNG, JPG, GIF, WebP, BMP)
- **🔤 AI-powered OCR**: Advanced text recognition using Tesseract.js with high accuracy
- **🌍 Multi-language Support**: Extract text in 100+ languages including English, Arabic, Chinese, Japanese, and more
- **✂️ Smart Image Cropping**: Crop and edit images before OCR processing for improved accuracy
- **📋 One-click Copy**: Instantly copy extracted text to clipboard
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations and glassmorphism effects
- **⚡ Real-time Processing**: Fast text extraction with progress indicators
- **📱 Mobile Friendly**: Works seamlessly on desktop and mobile devices
- **🔒 Privacy First**: All processing happens locally in your browser - no data sent to servers

## 🛠️ Technologies Used

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | React | 19.1.0 | UI Library |
| **Language** | TypeScript | ~5.8.3 | Type Safety |
| **Build Tool** | Vite | 7.0.4 | Fast Development |
| **Styling** | Tailwind CSS | 4.1.11 | Utility-first CSS |
| **OCR Engine** | Tesseract.js | 6.0.1 | Text Recognition |
| **Image Processing** | react-image-crop | 11.0.10 | Cropping Functionality |
| **File Handling** | react-dropzone | 14.3.8 | Drag & Drop |
| **Icons** | react-icons | 5.5.0 | UI Icons |

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/onlay-imaj.git
cd onlay-imaj

# 2. Navigate to the app directory
cd ocr-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open your browser and navigate to http://localhost:5173
```

### 🐳 Docker Setup (Optional)

```bash
# Build and run with Docker
docker build -t onlay-imaj .
docker run -p 5173:5173 onlay-imaj
```

## 📖 How to Use

### Method 1: Drag & Drop
1. **Drag** any image file onto the upload area
2. **Wait** for automatic text extraction
3. **Copy** the extracted text with one click

### Method 2: Clipboard Paste
1. **Copy** an image to your clipboard (Ctrl+C)
2. **Paste** it directly into the app (Ctrl+V)
3. **Extract** text instantly

### Method 3: File Browser
1. **Click** the upload area to browse files
2. **Select** your image file
3. **Process** and extract text

## 🎯 App Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **OCR Reader** | Extract text from full images | Documents, screenshots, photos with text |
| **Crop & Download** | Edit and crop images before OCR | Focus on specific text areas, remove noise |

## 📁 Supported Formats

| Format | Extension | Notes |
|--------|-----------|--------|
| PNG | `.png` | Best for screenshots and text |
| JPEG | `.jpg`, `.jpeg` | Good for photos |
| GIF | `.gif` | Animated and static |
| WebP | `.webp` | Modern web format |
| BMP | `.bmp` | Uncompressed format |

## 🛠️ Available Scripts

| Command | Description | Usage |
|---------|-------------|--------|
| `npm run dev` | Start development server | Development |
| `npm run build` | Build for production | Deployment |
| `npm run lint` | Run ESLint | Code quality |
| `npm run preview` | Preview production build | Testing |

## 📁 Project Structure

```
onlay-imaj/
├── ocr-app/                     # Main application
│   ├── src/
│   │   ├── components/
│   │   │   ├── DropAndCrop.tsx      # 🎨 Image cropping interface
│   │   │   ├── ImagePreview.tsx     # 🖼️ Image display component
│   │   │   ├── LanguageSelector.tsx # 🌍 Language picker
│   │   │   └── OCRComponent.tsx     # 🔤 OCR processing engine
│   │   ├── utils/
│   │   │   └── FileUtils.tsx        # 📂 File handling utilities
│   │   ├── styles/
│   │   │   └── globals.css          # 🎨 Global styles & animations
│   │   ├── App.tsx                  # 🏠 Main application component
│   │   └── main.tsx                 # 🚀 Application entry point
│   ├── public/                      # 📦 Static assets
│   ├── package.json                 # 📋 Dependencies and scripts
│   └── vite.config.ts              # ⚙️ Vite configuration
└── README.md                    # 📖 You are here!
```

## 🌟 Key Features Explained

### 🔤 OCR Processing
- Powered by **Tesseract.js v6.0.1**
- Supports **100+ languages**
- **Client-side processing** - no server required
- **Progress tracking** with visual feedback

### ✂️ Image Cropping
- Interactive crop tool with **react-image-crop**
- **Aspect ratio** controls
- **Real-time preview**
- **Download cropped images**

### 🎨 Modern UI/UX
- **Tailwind CSS** for styling
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Glassmorphism** effects

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Found a Bug?
1. **Check** existing issues first
2. **Create** a new issue with details
3. **Include** screenshots if applicable

### 💡 Have a Feature Idea?
1. **Open** a feature request issue
2. **Describe** the feature and use case
3. **Wait** for community feedback

### 🔧 Want to Contribute Code?
```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/yourusername/onlay-imaj.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Test your changes
npm run dev
npm run build

# 6. Commit and push
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature

# 7. Open a Pull Request
```

### 📝 Contributing Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and descriptive

## 🎯 Roadmap

- [ ] **Batch Processing** - Process multiple images at once
- [ ] **Text Translation** - Translate extracted text
- [ ] **Export Options** - Save as PDF, TXT, DOCX
- [ ] **OCR History** - Keep track of processed images
- [ ] **Custom Languages** - Add support for custom language models
- [ ] **API Integration** - Connect to cloud OCR services
- [ ] **Mobile App** - React Native version

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to these amazing projects:

- **[Tesseract.js](https://tesseract.projectnaptha.com/)** - Making OCR accessible in browsers
- **[React](https://reactjs.org/)** - The foundation of our UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Beautiful, utility-first styling
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[react-image-crop](https://github.com/DominicTobias/react-image-crop)** - Image cropping functionality

## 📊 Stats

![GitHub Stars](https://img.shields.io/github/stars/yourusername/onlay-imaj?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/onlay-imaj?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/onlay-imaj)
![GitHub PRs](https://img.shields.io/github/issues-pr/yourusername/onlay-imaj)

---

<div align="center">
  <strong>Made with ❤️ for the open-source community</strong>
  <br />
  <sub>If you found this project useful, please consider giving it a ⭐</sub>
</div>
