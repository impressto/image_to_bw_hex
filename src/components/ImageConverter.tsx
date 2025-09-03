import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';

interface ConversionSettings {
  backgroundColor: 'white' | 'black' | 'transparent';
  invertColors: boolean;
  scale: 'fit' | 'stretch' | 'center';
  conversionFunction: 'horizontal1bit' | 'vertical1bit';
}

export const ImageConverter = () => {
  const [settings, setSettings] = useState<ConversionSettings>({
    backgroundColor: 'white',
    invertColors: false,
    scale: 'fit',
    conversionFunction: 'horizontal1bit'
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hexOutput, setHexOutput] = useState<string>('');
  const [fileName, setFileName] = useState<string>('image');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCleanFileName = (name: string) => {
    // Remove extension and any path
    const baseName = name.split('.')[0].split(/[\\/]/).pop() || 'image';
    // Replace any non-alphanumeric characters with underscore
    return baseName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.match('image.*')) {
      alert('Please select an image file.');
      return;
    }

    const cleanFileName = getCleanFileName(file.name);
    console.log('Setting filename to:', cleanFileName); // For debugging

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setFileName(cleanFileName);
        setImagePreview(e.target.result);
        processImage(e.target.result, cleanFileName);
      }
    };
    reader.readAsDataURL(file);
  };

  const processImage = (dataUrl: string, newFileName?: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image with current settings
      if (settings.backgroundColor !== 'transparent') {
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      // Apply black and white conversion
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const value = avg > 128 ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
      }

      if (settings.invertColors) {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      }

      ctx.putImageData(imageData, 0, 0);
      generateHexOutput(newFileName);
    };
    img.src = dataUrl;
  };

  const generateHexOutput = (newFileName?: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert to hex array (implementation depends on your needs)
    // This is a basic example that creates a byte array where each bit represents a pixel
    const bytes: number[] = [];
    if (settings.conversionFunction === 'horizontal1bit') {
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x += 8) {
          let byte = 0;
          for (let bit = 0; bit < 8; bit++) {
            if (x + bit < canvas.width) {
              const i = (y * canvas.width + (x + bit)) * 4;
              byte |= (data[i] === 255 ? 1 : 0) << (7 - bit);
            }
          }
          bytes.push(byte);
        }
      }
    }

    // Convert to C array format
    const width = canvas.width;
    const height = canvas.height;
    const bytesPerRow = Math.ceil(width / 8);
    // Convert bytes to hex and wrap into lines of approximately 16 bytes each
    const hexValues = bytes.map(b => '0x' + b.toString(16).padStart(2, '0'));
    const wrappedHexArray = [];
    for (let i = 0; i < hexValues.length; i += 16) {
      wrappedHexArray.push(hexValues.slice(i, i + 16).join(', '));
    }
    
    const cleanName = newFileName || fileName || 'image';
    const cCode = `// '${cleanName}', ${width}x${height}px
// Total size: ${height * bytesPerRow} bytes (${bytesPerRow} bytes per row)
const unsigned char ${cleanName}[] PROGMEM = {
  ${wrappedHexArray.join(',\n  ')}
};`;

    setHexOutput(cCode);
  };

  return (
    <div className="image-converter">
      <div className="controls">
        <div className="file-input-container">
          <div className="file-input-button">Choose Image</div>
          <input type="file" accept="image/*" onChange={handleFileSelect} title=" " />
        </div>
        
        <div className="settings">
          <label>
            Background:
            <select
              value={settings.backgroundColor}
              onChange={(e) => setSettings({
                ...settings,
                backgroundColor: e.target.value as ConversionSettings['backgroundColor']
              })}
            >
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="transparent">Transparent</option>
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.invertColors}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  invertColors: e.target.checked
                });
                if (imagePreview) {
                  processImage(imagePreview, fileName);
                }
              }}
            />
            Invert Colors
          </label>
        </div>
      </div>

      <div className="preview">
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      </div>

      {hexOutput && (
        <div className="output-section">
          <h3>C Code Output</h3>
          <div className="code-container">
            <textarea
              value={hexOutput}
              readOnly
              rows={12}
              spellCheck={false}
              onClick={(e) => {
                const textarea = e.currentTarget;
                textarea.select();
              }}
            />
          </div>
          <div className="button-group">
            <button
              onClick={() => {
                navigator.clipboard.writeText(hexOutput);
                alert('Code copied to clipboard!');
              }}
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => {
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(hexOutput));
                element.setAttribute('download', `${fileName}.h`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
            >
              Download as Header File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
