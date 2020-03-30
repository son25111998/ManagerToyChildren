import { Component, OnInit } from '@angular/core';
import { Constants } from '../../util/constants';
import { Product } from '../../../categories/product/product';
import { ProductService } from '../../../categories/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProductService]
})
export class HomeComponent implements OnInit {
  isUpdatedBarChart: boolean;
  barChartOptions = {
    chart: {
      type: 'column'
    },
    title: { text: 'PRODUCT OF THE MOST USED' },
    series: [{
      name: 'Request Number',
      colorByPoint: true,
      data: []
    }],
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Request Number'
      }
    },
    xAxis: {
      type: 'category'
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    width: null,
    height: null
  };
   productTheMostUsedList: Product[];
  

  constructor(
     private productService: ProductService
  ) { }

  ngOnInit() {
    this.getApiVersionTheMostUsed();
  }
  public getApiVersionTheMostUsed() {
    this.isUpdatedBarChart = false;
    this.productService.getListProduct()
      .then(response => {
        this.productTheMostUsedList = response.data;
        console.log(this.productTheMostUsedList);
        // let barChartLables: Array<String> = [];
        let barChartData = [];
        let barChartDataItems: Array<BarChartDataItem> = [];
        this.productTheMostUsedList.forEach(apiVersionStatisticResponseItem => {
          let barChartDataItem = new BarChartDataItem();
          barChartDataItem.name =
            apiVersionStatisticResponseItem.name +
            //+ apiVersionStatisticResponseItem.description + 
            ", ID: "+ apiVersionStatisticResponseItem.id;
          barChartDataItem.y = apiVersionStatisticResponseItem.amount;
          barChartDataItems.push(barChartDataItem);
        });
        this.isUpdatedBarChart = true;
        this.barChartOptions.series[0].data = JSON.parse(JSON.stringify(barChartDataItems));
      })
      .catch(error => console.log(error));
  }

}

class BarChartDataItem {
  name: string;
  y: number;
}


