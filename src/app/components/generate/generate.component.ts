import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { APIGenerate } from 'src/app/services/response';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  generate: APIGenerate;
  isLoading: boolean = false;

  constructor(private connector: ConnectorService, private cookie: CookieService) { }

  async ngOnInit() {
    this.isLoading = true;
    if (this.cookie.check('MELI_GENERATE')) {
      const json = this.cookie.getAll()['MELI_GENERATE'];
      const generate = JSON.parse(json);
      this.generate = <APIGenerate>generate;
    } else {
      await this.refreshSentence();
    }
    this.isLoading = false;
  }

  async refreshSentence() {
    this.generate = await this.connector.generateAll();
    this.cookie.set('MELI_GENERATE', JSON.stringify(this.generate));
  }

  async reload() {
    this.isLoading = true;
    await this.refreshSentence();
    this.isLoading = false;
  }

}
