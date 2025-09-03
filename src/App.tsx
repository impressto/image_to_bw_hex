import { ImageConverter } from './components/ImageConverter'
import './App.css'

export function App() {
  return (
    <div className="app">
      <h1>Image to Hex Converter</h1>
      <p>Convert images to hexadecimal format for Arduino and ESP32 LCD displays</p>
      <ImageConverter />
    </div>
  )
}
