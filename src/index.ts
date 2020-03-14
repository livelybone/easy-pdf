import { loadRemote } from 'load-remote'

export interface PdfResources {
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.css' */
  pdfViewerCssUrl?: string
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.min.js' */
  pdfJsUrl?: string
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.js' */
  pdfViewerJsUrl?: string
}

/**
 * Reachable in readPdf().then() or renderPdf().then()
 * */
declare const pdfjsLib: any

/**
 * Reachable in renderPdf().then() or renderPdfPage().then()
 * */
declare const pdfjsViewer: any

export function loadPdfResources(resources?: PdfResources): Promise<any> {
  const cssFiles = [
    (resources && resources.pdfViewerCssUrl) ||
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.css',
  ]
  const scripts = [
    (resources && resources.pdfJsUrl) ||
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.min.js',
    (resources && resources.pdfViewerJsUrl) ||
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.js',
  ]
  const arr = cssFiles.map(url => loadRemote(url))
  arr.push(
    scripts.reduce(
      (pre, str) => pre.then(() => loadRemote(str)),
      Promise.resolve<any>(0),
    ),
  )
  return Promise.all(arr).catch(e => {
    console.error(e)
    throw new Error('pdf 脚本加载失败，无法打开 PDF')
  })
}

export interface ReadPdfOptions extends PdfResources {
  cMapPacked: boolean
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/' */
  cMapUrl: string
  disableAutoFetch: boolean
  disableCreateObjectURL: boolean
  disableFontFace: boolean
  disableRange: boolean
  disableStream: boolean
  docBaseUrl: string
  isEvalSupported: string
  maxImageSize: number
  pdfBug: boolean
  verbosity: number
}

export interface RenderPdfOptions {
  container: HTMLElement
  viewer?: HTMLElement
  readPdfOptions?: ReadPdfOptions
}

function addClass(el: Element, className: string) {
  const $className = el.className
  // eslint-disable-next-line no-param-reassign
  if (!$className) el.className = className
  else {
    // eslint-disable-next-line no-param-reassign
    el.className = $className
      .split(/\s+/)
      .filter(str => str !== className)
      .concat(className)
      .join(' ')
  }
}

function getDefaultViewport(page: any) {
  return page.getViewport({ scale: 96.0 / 72.0 })
}

export function readPdf(
  url: string,
  options?: Pick<
    ReadPdfOptions,
    Exclude<keyof ReadPdfOptions, 'pdfViewerCssUrl' | 'pdfViewerJsUrl'>
  >,
): Promise<any> {
  return loadRemote(
    (options && options.pdfJsUrl) ||
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.min.js',
  ).then(() => {
    return pdfjsLib.getDocument({
      url,
      cMapPacked: true,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/',
      disableAutoFetch: false,
      disableCreateObjectURL: false,
      disableFontFace: false,
      disableRange: false,
      disableStream: false,
      docBaseUrl: window.location.href,
      isEvalSupported: true,
      maxImageSize: -1,
      pdfBug: false,
      verbosity: 1,
      ...options,
    })
  })
}

export function renderPdf(
  url: string,
  options: RenderPdfOptions,
): Promise<{ pdfViewer: any; pdf: any; pdfjsLib: any; pdfjsViewer: any }> {
  return loadPdfResources(options.readPdfOptions)
    .then(() => readPdf(url, options.readPdfOptions))
    .then(pdf => {
      const viewer = options.viewer || document.createElement('div')
      if (!options.viewer) options.container.appendChild(viewer)
      addClass(options.container, 'pdf-container')
      addClass(viewer, 'pdf-viewer')

      const pdfViewer = new pdfjsViewer.PDFViewer({
        container: options.container,
        viewer,
      })

      pdfViewer.setDocument(pdf)
      return pdf
        .getPage(1)
        .then(getDefaultViewport)
        .then((viewport: any) => {
          const viewerWidth = pdfViewer.viewer.clientWidth
          pdfViewer.currentScaleValue = viewerWidth / viewport.width

          return { pdfViewer, pdf, pdfjsLib, pdfjsViewer }
        })
    })
}

/**
 * @param pdf         The result of readPdf
 * @param pageIndex
 * @param options
 * */
export function renderPdfPage(
  pdf: any,
  pageIndex: number,
  options: Pick<RenderPdfOptions, 'container'> & {
    loadPdfViewOptions?: Pick<
      ReadPdfOptions,
      'pdfViewerCssUrl' | 'pdfViewerJsUrl'
    >
  },
): Promise<{ pdfViewer: any; pdfPage: any; pdfjsLib: any; pdfjsViewer: any }> {
  return loadPdfResources(options.loadPdfViewOptions).then(() => {
    addClass(options.container, 'pdf-container')
    return pdf.getPage(pageIndex).then((pdfPage: any) => {
      const viewport = pdfPage.getViewport({ scale: 96.0 / 72.0 })
      let viewer = options.container.getElementsByClassName('pdf-viewer')[0]
      if (!viewer) {
        viewer = document.createElement('div')
        addClass(viewer, 'pdf-viewer')
        options.container.appendChild(viewer)
      }
      const viewerWidth = viewer.clientWidth
      const pageViewer = new pdfjsViewer.PDFPageView({
        container: viewer,
        eventBus: pdf.eventBus,
        id: pageIndex,
        scale: viewerWidth / viewport.width,
        defaultViewport: viewport.clone(),
        enableWebGL: true,
      })

      pageViewer.setPdfPage(pdfPage)
      pageViewer.draw()

      return { pageViewer, pdfPage, pdfjsLib, pdfjsViewer }
    })
  })
}
