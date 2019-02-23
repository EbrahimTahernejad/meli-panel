import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../../services/connector.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'meli-panel';
  prevUrl: string = '/home';

  constructor(private connector: ConnectorService, private route: ActivatedRoute, private router: Router){}
  async ngOnInit(){
    this.connector.loginState.subscribe(value => {
      this.loginStateProcess();
    });
    this.loginStateProcess();
  }

  async loginStateProcess(){
    if(this.connector.loginState.value == 0)
      this.router.navigate(['/login']);
    else if(this.connector.loginState.value == 1) {
      let snap = location.pathname;
      this.router.navigate(['/']);
      if(snap.includes('home'))
        this.prevUrl = snap;
      this.connector.checkToken();
    } else {
      await this.router.navigate(['/']);
      await this.connector.getLatestWords();
      await this.connector.getOptions();
      console.log(this.connector.dataStore);
      this.router.navigateByUrl(this.prevUrl);
    }
  }
  
}
