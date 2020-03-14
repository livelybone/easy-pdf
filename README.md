# @livelybone/easy-pdf
[![NPM Version](http://img.shields.io/npm/v/@livelybone/easy-pdf.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/easy-pdf)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/easy-pdf.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/easy-pdf)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

An easy to use web side PDF rendering plug-in, can be used as a solution to customize the display of PDF in WeChat-applet/App. Based on [mozilla/pdf.js](https://github.com/mozilla/pdfjs-dist), the js/css is loaded via CDN asynchronously

## repository
https://github.com/livelybone/easy-pdf.git

## Demo
https://github.com/livelybone/easy-pdf#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/easy-pdf.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/easy-pdf
```

## Global name - The variable the module exported in `umd` bundle
`EasyPDF`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import * as EasyPDF from '@livelybone/easy-pdf'

const container = document.getElementById('container')
/** Render all page */
EasyPDF.renderPdf('./sample.pdf', { container }).then(res => {
  console.log(res)
})

/** Render single page */
EasyPDF.readPdf('./sample.pdf').then(pdf => {
  EasyPDF.renderPdfPage(pdf, 1, { container }).then(res => {
    console.log(res)
  })
})
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/easy-pdf/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/easy-pdf/lib/umd/<--module-->.js"></script>
```
