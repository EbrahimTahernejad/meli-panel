import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private connector: ConnectorService) { }

  ngOnInit() {
  }

}
