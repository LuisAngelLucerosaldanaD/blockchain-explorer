import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as pdfJsLib from 'pdfjs-dist';
import {PdfDimensions} from "@app/core/models/pdf";
import {PDFDocumentProxy} from "pdfjs-dist";
import {PDFPageProxy} from "pdfjs-dist/types/src/display/api";


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  @ViewChild('pdfLib') pdfLib!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLDivElement>;
  @Input('src') pdfBase64: string = '';
  @Input('current-page') currentPage: number = 1;
  @Output('total-pages') totalPagesEmit: EventEmitter<number> = new EventEmitter<number>();
  @Input('show-all') showAll: boolean = true;
  @Output('current-dimensions-page') dimensionsPage: EventEmitter<PdfDimensions> = new EventEmitter<PdfDimensions>();
  @Output('dimensions-pages') dimensionsAllPages: EventEmitter<PdfDimensions[]> = new EventEmitter<PdfDimensions[]>();
  @Output('end-render') endRender: EventEmitter<PDFPageProxy> = new EventEmitter<PDFPageProxy>();

  public pdfDoc!: PDFDocumentProxy;
  public totalPages: number = 0;
  public isFinishRender: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initPDF();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentPage') && !changes['currentPage'].firstChange && !this.showAll) {
      this.renderPage(this.currentPage);
    }
  }

  public initPDF(): void {
    pdfJsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJsLib.version}/pdf.worker.js`;
    pdfJsLib.getDocument({data: atob(this.pdfBase64)}).promise.then((pdfDoc_: any) => {
      // pdfJsLib.getDocument('assets/pdf_formulario_solicitud_de_credito.pdf').promise.then((pdfDoc_) => {
      this.pdfDoc = pdfDoc_;
      this.totalPages = this.pdfDoc.numPages;
      this.totalPagesEmit.emit(this.totalPages);
      if (this.showAll) this.renderAllPages(1);
      else this.renderPage(1);
    });
  }

  public renderPage(num: number): void {
    this.pdfDoc.getPage(num).then((page: any) => {
      let viewport = page.getViewport({scale: 1});
      this.pdfLib.nativeElement.height = viewport.height;
      this.pdfLib.nativeElement.width = viewport.width;

      let renderContext = {
        canvasContext: this.pdfLib.nativeElement.getContext('2d'),
        viewport: viewport
      };
      let renderTask = page.render(renderContext);

      this.dimensionsPage.emit({height: viewport.height, width: viewport.width});

      renderTask.promise.then(() => {
        this.isFinishRender = true;
        this.endRender.emit(page);
      });
    });

    this.currentPage = num;
  }

  public renderAllPages(num: number): void {
    this.pdfDoc.getPage(num).then((page: any) => {
      let viewport = page.getViewport({scale: 1});
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.classList.add('shadow-xl');

      let renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      let renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        this.pdfViewer.nativeElement.appendChild(canvas);
        if (num < this.pdfDoc.numPages) {
          this.renderAllPages(num + 1);
          return;
        }
        this.isFinishRender = true;
        this.endRender.emit(page);
      });
    });

    this.currentPage = num;
  }

}
