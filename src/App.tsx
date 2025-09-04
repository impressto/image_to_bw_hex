import { ImageConverter } from './components/ImageConverter'
import './App.css'

export function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h2>Image to Hex Converter</h2>
        <h2>Generate C code from BMP files for Monochrome displays.</h2>
        <p>
          This tool converts a black and white BMP image into a C array formatted for use with monochrome displays, such as OLEDs or e-ink screens. It supports 1-bit BMP images and outputs the pixel data in a format compatible with libraries like Adafruit GFX.
        </p>
        <p>Source code for this tool: <a href="https://github.com/impressto/image_to_bw_hex" target="_blank" rel="noopener noreferrer">https://github.com/impressto/image_to_bw_hex</a></p>     
      </div>
      
      <ImageConverter />
    </div>
  )
}
