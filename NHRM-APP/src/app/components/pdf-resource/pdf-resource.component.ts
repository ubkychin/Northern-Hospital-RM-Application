import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pdf-resource',
  templateUrl: './pdf-resource.component.html',
  styleUrls: ['./pdf-resource.component.css']
})
export class PdfResourceComponent implements OnInit {

  pdfSrc: string | PDFSource | ArrayBuffer;

  constructor(private dataService: DataService) { 
    this.pdfSrc = this.dataService.pdfResource;
  }

  ngOnInit(): void {
  }

}
