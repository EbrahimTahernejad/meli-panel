import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean = false

  constructor(private connector: ConnectorService) { }

  async change(){
    this.connector.dataStore.searchLoading = true;
    this.connector.dataStore.searchResult = await this.connector.search(
      this.connector.dataStore.searchQuery.value,
      this.connector.dataStore.searchOptions.order,
      this.connector.dataStore.searchOptions.type
    );
    this.connector.dataStore.searchLoading = false;
  }

  async more(){
    this.isLoading = true;
    let res = await this.connector.search(
      this.connector.dataStore.searchQuery.value,
      this.connector.dataStore.searchOptions.order,
      this.connector.dataStore.searchOptions.type,
      this.connector.dataStore.searchResult.length
    );
    this.connector.dataStore.searchResult 
      = this.connector.dataStore.searchResult.concat(res)
    this.isLoading = false;
  }

  ngOnInit() {
  }

}
