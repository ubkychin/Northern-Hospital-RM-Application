import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-resource',
  templateUrl: './pdf-resource.component.html',
  styleUrls: ['./pdf-resource.component.css']
})
export class PdfResourceComponent implements OnInit {

  pdfSrc: string | PDFSource | ArrayBuffer = '../assets/IPC.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
