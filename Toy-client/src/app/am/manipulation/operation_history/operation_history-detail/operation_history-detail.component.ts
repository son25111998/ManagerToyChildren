import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OperationHistory } from '../operation_history';
import { ActivatedRoute } from '@angular/router';
import { OperationHistoryService } from '../operation_history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-operation_history-detail',
  templateUrl: './operation_history-detail.component.html',
  providers: [OperationHistoryService]
})
export class OperationHistoryDetailComponent implements OnInit {
  private sub: any;
  id: string;
  operationHistory: OperationHistory;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private operationHistoryService: OperationHistoryService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.operationHistoryService.findOne(this.id)
      .then(response => {
        this.operationHistory = response.data;
        console.log(this.operationHistory);
      })
      .catch(error =>{
        console.log("errors: " + error);
      })
    });
  }
  goBack() {
    this.location.back();
  }

}
