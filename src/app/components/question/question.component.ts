import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Question } from '../../services/models';
import { ConnectorService } from 'src/app/services/connector.service';
import { APIQuestion } from 'src/app/services/response';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
  constructor(private connector: ConnectorService, private cookie: CookieService, private ngxSmartModalService: NgxSmartModalService) { }

  async refreshSentence() {
    this.sentence = await this.connector.getSentence();
    this.cookie.set('MELI_SENTENCE', JSON.stringify(this.sentence));
  }

  async reload() {
    this.isLoading = true;
    await this.refreshSentence();
    this.isLoading = false;
  }

  async ngOnInit() {
    this.isLoading = true;
    if (this.cookie.check('MELI_SENTENCE')) {
      const json = this.cookie.getAll()['MELI_SENTENCE'];
      const sentence = JSON.parse(json);
      this.sentence = <APIQuestion>sentence;
    } else {
      await this.refreshSentence();
    }
    this.isLoading = false;
    this.add();
  }

  add() {
    const q = new QuestionIndexed(++this.maxId);
    this.questions.push(q);
  }

  delete(id: number) {
    for (let i = 0 ; i < this.questions.length ; i++) {
      if (this.questions[i].id === id) {
        this.questions.splice(i, 1);
        return;
      }
    }
  }

  async send() {
    this.isLoading = true;
    const notAllowed: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    for (const question of this.questions) {
      for (const char of notAllowed) {
        if (question.text.includes(char) || question.answer.includes(char)) {
          this.ngxSmartModalService.getModal('myModal').open();
          this.isLoading = false;
          return;
        }
      }
    }
    await this.connector.addQuestions(this.sentence.sentence, <Question[]>this.questions);
    this.questions = [];
    await this.refreshSentence();
    this.isLoading = false;
    this.add();
  }

}
