# @livelybone/easy-pdf
[![NPM Version](http://img.shields.io/npm/v/@livelybone/easy-pdf.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/easy-pdf)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/easy-pdf.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/easy-pdf)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

一个简便易用的，原生使用方式的（适用于各大框架）网页端 PDF 渲染插件，也可作为小程序/App webview 中自定义展示 pdf 的解决方案。基于 pdf.js，使用 CDN 异步加载 pdf.js 脚本。

## repository
https://github.com/livelybone/easy-pdf.git

## Demo
https://github.com/livelybone/easy-pdf#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/easy-pdf.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/easy-pdf
```

## Global name - The variable the module exported in `umd` bundle
`EasyPDF`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/easy-pdf/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/easy-pdf/lib/umd/<--module-->.js"></script>
```
