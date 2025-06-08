# MedImage Analysis

A powerful web-based medical image analysis tool built with React and TypeScript. This application provides healthcare professionals with advanced tools for analyzing and annotating medical images.

![MedImage Analysis](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070)

## Features

- 🖼️ Support for multiple image formats (PNG, JPEG, DICOM)
- 📏 Precise measurement tools:
  - Ruler for distance measurements
  - Circle tool for radius and area
  - Angle measurement tool
- 🔍 Advanced image manipulation:
  - Zoom and pan functionality
  - Brightness adjustment
  - Contrast control
- 💾 DICOM file support with metadata extraction
- 📱 Responsive design for various screen sizes

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Zoom Pan Pinch
- Cornerstone.js (DICOM support)
- React Dropzone

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medical-image-analysis.git
cd medical-image-analysis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. **Upload Image**
   - Drag and drop or click to select a medical image
   - Supports PNG, JPEG, and DICOM formats

2. **Image Navigation**
   - Use the pan tool (hand icon) to move around the image
   - Zoom controls are available in the bottom right corner

3. **Measurement Tools**
   - Ruler: Click and drag to measure distances
   - Circle: Click center point and drag to define radius
   - Angle: Click three points to measure angles

4. **Image Adjustment**
   - Use sliders in the top right to adjust brightness and contrast
   - Reset view using the maximize button

## Development

### Project Structure

```
src/
├── components/
│   ├── Canvas.tsx         # Drawing and measurement functionality
│   ├── FileUpload.tsx     # File upload component
│   ├── ImageTools.tsx     # Measurement tools UI
│   ├── ImageViewer.tsx    # Main image viewing component
│   └── Sidebar.tsx        # Application sidebar
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

### Building

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

