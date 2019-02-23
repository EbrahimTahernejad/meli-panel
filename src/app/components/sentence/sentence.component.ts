import { Component, OnInit } from '@angular/core';
import { APISentences } from 'src/app/services/response';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {

  sentence: string = "";
  q: APISentences = [];
  isLoading: boolean = false;

  constructor(private connector: ConnectorService) { }

  ngOnInit() {
  }

  async submit(){
    this.q = [];
    this.isLoading = true;
    this.q = await this.connector.generateQuestion(this.sentence);
    this.isLoading = false;
  }

}
