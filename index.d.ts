interface PdfResources {
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.css' */
  pdfViewerCssUrl?: string
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.min.js' */
  pdfJsUrl?: string
  /** Default: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/web/pdf_viewer.js' */
  pdfViewerJsUrl?: string
}

declare function loadPdfResources(resources?: PdfResources): Promise<any>

interface ReadPdfOptions extends PdfResources {
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

interface RenderPdfOptions {
  container: HTMLElement
  viewer?: HTMLElement
  readPdfOptions?: ReadPdfOptions
}

declare function readPdf(
  url: string,
  options?: Pick<
    ReadPdfOptions,
    Exclude<keyof ReadPdfOptions, 'pdfViewerCssUrl' | 'pdfViewerJsUrl'>
  >,
): Promise<any>

declare function renderPdf(
  url: string,
  options: RenderPdfOptions,
): Promise<{
  pdfViewer: any
  pdf: any
  pdfjsLib: any
  pdfjsViewer: any
}>

/**
 * @param pdf         The result of readPdf
 * @param pageIndex
 * @param options
 * */
declare function renderPdfPage(
  pdf: any,
  pageIndex: number,
  options: Pick<RenderPdfOptions, 'container'> & {
    loadPdfViewOptions?: Pick<
      ReadPdfOptions,
      'pdfViewerCssUrl' | 'pdfViewerJsUrl'
    >
  },
): Promise<{
  pdfViewer: any
  pdfPage: any
  pdfjsLib: any
  pdfjsViewer: any
}>

export {
  PdfResources,
  ReadPdfOptions,
  RenderPdfOptions,
  loadPdfResources,
  readPdf,
  renderPdf,
  renderPdfPage,
}
