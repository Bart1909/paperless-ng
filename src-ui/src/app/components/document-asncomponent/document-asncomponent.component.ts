import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../services/rest/document.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CorrespondentService} from "../../services/rest/correspondent.service";
import {DocumentTypeService} from "../../services/rest/document-type.service";
import {FILTER_ASN} from "../../data/filter-rule-type";

@Component({
  selector: 'app-document-asncomponent',
  templateUrl: './document-asncomponent.component.html',
  styleUrls: ['./document-asncomponent.component.scss']
})
export class DocumentASNComponentComponent implements OnInit {

  asn: string;
  constructor(
    private documentsService: DocumentService,
    private route: ActivatedRoute,
    private correspondentService: CorrespondentService,
    private documentTypeService: DocumentTypeService,
    private router: Router) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      this.asn = paramMap.get('id');
      this.documentsService.listAllFilteredIds([{rule_type: FILTER_ASN, value: this.asn}]).subscribe(documentId => {
        if (documentId.length == 1) {
          this.router.navigate(['documents', documentId[0]])
        } else {
          this.router.navigate(['404'])
        }
      })
    })

  }
}