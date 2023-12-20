import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

Details : any[] =[]
totalcartvalue : any
  ngOnInit(): void {

     this.Details = JSON.parse(localStorage.getItem("cartProduct") || "[]")
 
     this.totalcartvalue = JSON.parse(localStorage.getItem("totalcartvalue")|| "")

    }
  
}
