import { ImageConverter } from './components/ImageConverter'
import './App.css'

export function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h2>Image to Hex Converter</h2>
        <h2>Generate C code from BMP files for Monochrome displays.</h2>
        <p>
        This tool help with embedding logos, icons, or custom graphics in your microcontroller projects.
        </p>
        <p>
        It converts any image into a 1-bit black-and-white BMP and generates the corresponding C array for use with monochrome displays. 
        </p>
        <p>
        The output is optimized for a wide range of display types—including OLEDs and e-ink screens—and is fully compatible with popular graphics libraries such as Adafruit GFX. 
        </p>
        <p>Source code for this tool: <a href="https://github.com/impressto/image_to_bw_hex" target="_blank" rel="noopener noreferrer">https://github.com/impressto/image_to_bw_hex</a></p>     
      </div>
      
      <ImageConverter />
    </div>
  )
}
