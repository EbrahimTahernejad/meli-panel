import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchQuery: string = ""

  constructor(private router: Router, private connector: ConnectorService) {
    
  }

  ngOnInit() {
  }

  async onFocus(){
    await this.router.navigate(['/home', 'search']);
  }

  async onSubmit(){
    this.connector.dataStore.searchQuery.next(this.searchQuery);
    this.connector.dataStore.searchLoading = true;
    this.connector.dataStore.searchResult = await this.connector.search(
      this.connector.dataStore.searchQuery.value,
      this.connector.dataStore.searchOptions.order,
      this.connector.dataStore.searchOptions.type
    );
    this.connector.dataStore.searchLoading = false;
  }

}
