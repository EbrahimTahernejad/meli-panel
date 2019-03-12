import { Component, OnInit } from '@angular/core';
import { Question } from '../../services/models';
import { ConnectorService } from 'src/app/services/connector.service';
import { APIQuestion } from 'src/app/services/response';

class QuestionIndexed extends Question {
  id: number = 0
  constructor(id: number){
    super();
    this.id = id;
  }
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  maxId = 0;
  isLoading: boolean = true;
  questions: QuestionIndexed[] = [];
  sentence: APIQuestion;
  constructor(private connector: ConnectorService) { }

  async ngOnInit() {
    this.isLoading = true;
    this.sentence = await this.connector.getSentence()
    this.isLoading = false
    this.add();
  }

  add(){
    let q = new QuestionIndexed(++this.maxId);
    this.questions.push(q);
  }

  delete(id: number) {
    for(let i = 0 ; i < this.questions.length ; i++)
      if(this.questions[i].id == id){
        this.questions.splice(i, 1);
        return;
      }
  }

}
