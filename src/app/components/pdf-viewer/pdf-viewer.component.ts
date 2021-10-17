import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() src: string;
  @Input() type: string;
  @Input() nameDocument: string;
  @Input() base64Document: string;
  zoom = 1;
  rotation = 0;
  outline: any[];
  numPages: number;
  actualPage = 1;

  isShowDownload = false;
  error: any;
  srcSafeResourceUrl: SafeResourceUrl;
  nameDownload = '';

  constructor(private _domSanitizer: DomSanitizer, private datePipe: DatePipe) {
    this.src='';
    this.type='';
    this.nameDocument='';
    this.base64Document='';
    this.outline=[];
    this.numPages=0;
    this.srcSafeResourceUrl='';
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {}

  public nextPage(): void {
    if (this.actualPage < this.numPages) {
      this.actualPage++;
    }
  }

  public backPage(): void {
    if (this.actualPage > 1) {
      this.actualPage--;
    }
  }

  public reduce(): void {
    this.zoom = this.zoom - 0.2;
  }

  public expand(): void {
    this.zoom = this.zoom + 0.2;
  }

  public rotateRight(): void {
    this.rotation = this.rotation + 90;
  }

  public rotateLeft(): void {
    this.rotation = this.rotation - 90;
  }

  // afterLoadComplete(pdf: PDFDocumentProxy) {
  //   this.pdf = pdf;
  //   this.numPages = pdf?.numPages;
  // }

  public cancelDownload(): void {
    this.isShowDownload = false;
  }

  public closeDownload(): void {
    this.isShowDownload = false;
  }

  public download(): void {
    this.srcSafeResourceUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    this.nameDownload = this.nameDocument;
    this.isShowDownload = true;
  }

  scrollUp(event:any): void {}
}
