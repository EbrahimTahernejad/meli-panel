import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { APIOption } from 'src/app/services/response';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  type: string
  option: APIOption
  values: { [name: string]: any }
  text: string = ""

  isLoading: boolean = false

  constructor(private connector: ConnectorService) {
    this.type = this.connector.dataStore.wordOptions[0].value
    this.option = this.connector.dataStore.wordOptionsLabel[this.type];
    this.setValues()
  }

  async submit(){
    if(this.text.length == 0) return;
    console.log(this.values);
    this.isLoading = true;
    this.connector.addWord(this.text, this.type, this.values).then(word => {
      console.log(word);
      this.isLoading = false;
      this.setValues();
      this.text = "";
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
    })
  }

  setValues(){
    this.values = {};
    let names = [];
    names = names.concat(this.connector.dataStore.wordOptionsLabel[this.option.value].dependencies);
    names = names.concat(this.option.value);
    for(let name of names) {
      this.values[name] = {};
      for(let item of this.connector.dataStore.wordOptionsLabel[name].switches){
        this.values[name][item.value] = false
      }
      for(let item of this.connector.dataStore.wordOptionsLabel[name].lists){
        this.values[name][item.value] = item.options[0].value
      }
    }
  }

  ngOnInit() {
    this.change()
  }

  async change(){
    this.option = this.connector.dataStore.wordOptionsLabel[this.type];
    this.setValues();
  }

}
