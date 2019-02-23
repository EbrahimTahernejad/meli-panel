import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  isDisabled: boolean = false;

  constructor(private connector: ConnectorService) { }

  ngOnInit() {}

  formSubmit(){

    this.loginForm.disable();
    this.isDisabled = true;

    this.connector.login(this.loginForm.controls.username.value, 
      this.loginForm.controls.password.value).catch(error => {

        this.loginForm.enable();
        this.isDisabled = false;

      });

  }

}
