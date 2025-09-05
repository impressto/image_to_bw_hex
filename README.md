
# image\_to\_bw\_hex

A lightweight tool to convert images into black-and-white (monochrome) hexadecimal arrays for easy integration into C-based microcontroller projects.

---

## Features

- **Monochrome Conversion**: Transforms input images into pure black-and-white bitmaps.
- **Compact C Output**: Generates C-style arrays of hex values (e.g., `0xFF`, `0x00`) ready for embedding in source code.
- **Microcontroller Focused**: Tailored for use in memory-constrained environments like embedded systems.
- **Web-Based Interface**: Easy-to-use GUI (`index.html`) for quick image uploads and conversions.
- **Flexible Backend**: Compatible with local or server-side processing (`image2hex.php`) for broader deployment needs.

---

## Getting Started

### Usage Options

#### 1. **Web Interface**

- Launch the local UI via `index.html` in your browser.
- Upload an image, adjust settings (if available), and generate the corresponding C header or source file with the hex array.

#### 2. **Server-Side Conversion (`image2hex.php`)**

- Send an image to the PHP script via POST.
- Receive a downloadable or printable hex array as output—ideal for integration into build pipelines or APIs.

---

## Installation &amp; Setup

1. Clone this repository:
    
    <div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs">  
    </div></div></div><div class="overflow-y-auto p-4" dir="ltr">`git <span class="hljs-built_in">clone</span> https://github.com/impressto/image_to_bw_hex.git<span class="hljs-built_in">cd</span> image_to_bw_hex`</div></div>
2. Ensure you have a PHP-enabled environment for `image2hex.php` (e.g., Apache with PHP, or PHP’s built-in server).
3. Open `index.html` in any web browser for the quick-and-easy interface option.

---

## Example Output

<div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary" id="bkmrk-%2F%2F-generated-from-in"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs">  
</div></div></div><div class="overflow-y-auto p-4" dir="ltr">`<span class="hljs-comment">// Generated from input.jpg — width: 128px, height: 64px</span><span class="hljs-type">const</span> <span class="hljs-type">uint8_t</span> img_data[<span class="hljs-number">1024</span>] = {    <span class="hljs-number">0xFF</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0xAA</span>, <span class="hljs-number">0x55</span>, <span class="hljs-comment">// ...and so on for each row</span>};`</div></div>---

## Customization Ideas

- **Threshold Adjustment**: Allow users to set custom luminance thresholds for black vs. white.
- **Bit-Depth Options**: Support for formats like 1-bit monochrome, grayscale, or inverted outputs.
- **Language Variants**: Export arrays not only for C, but also for C++, Arduino, or other embedded frameworks.
- **Build Tool Integration**: Turn it into a CLI tool or integrate with build systems to automate asset generation.

---

## When To Use This

Perfect for use cases like:

- **OLED/LCD Displays**—embedding graphics in microcontrollers for displays.
- **Boot Screens** or **Icon Assets**—simple static graphics for low-power devices.
- **Firmware Dashboards**—lightweight image rendering in memory-constrained environments.

---

## License &amp; Contribution

- **License**: *(Please add your license here, e.g., MIT, GPL, etc.)*
- **Contributions**: Issues, pull requests, and feature suggestions are warmly welcome! Please include before-and-after examples when possible for clarity.

---

## Contact

Built by **Impressto**. Feedback, questions, or ideas? Feel free to open an issue or connect via GitHub.
