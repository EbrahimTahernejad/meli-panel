import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Word } from './models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIResponse, APISearch, APIUser, APILogin, APIOptions, APISentences } from './response';
import { APIError } from './error';
import { CookieService } from 'ngx-cookie-service';
import { DataStore } from './data-store';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  private baseUrl: string = 'http://194.5.177.224/api';
  private token: string = '';
  private user: APIUser;

  public dataStore: DataStore = new DataStore();

  loginState: BehaviorSubject<number>
  constructor(private http: HttpClient, private cookie: CookieService) { 
    this.loginState = new BehaviorSubject<number>(1);
  }

  private async _checkToken(token: string): Promise<boolean> {
    return new Promise< boolean >((resolve, reject) => {
      this.request< APIUser >('POST', '/check').then(user => {
        this.user = user;
        resolve(true);
      }).catch(error => {
        resolve(false);
      });
    });
  }

  async checkToken(){
    if(this.cookie.check('MELI_TOKEN')){
      let token: string = this.cookie.get('MELI_TOKEN');
      if(await this._checkToken(token)) {
        this.token = token;
        this.loginState.next(2);
      } else {
        this.loginState.next(0);
      }
    } else {
      this.loginState.next(0);
    }
  }

  private createQueryString(params?: any): string {
    if(params == undefined) return '';
    let p = <any>params;
    if(Object.keys(p).length == 0) return '';
    let out: string = '?';
    let o: string[] = []
    for(let [key, value] of Object.entries(p)) {
      if(value !== ""){
        out += encodeURIComponent(key) + '=' + encodeURIComponent(<string>value) + '&';
      }
    }
    out = out.substr(0, out.length - 1);
    return out;
  }

  private async request<T>(method: "POST" | "GET", url: string, params?: any, token: boolean = true): Promise<T> {
    url = this.baseUrl + url + (method == 'GET' ? this.createQueryString(params) : '');
    let body: any = method == 'POST' ? (params == undefined ? <any>{} : <any>params) : <any>{};
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Token': this.token
    });
    let req: Promise< APIResponse<T> >;
    if(method == 'GET') req = this.http.get< APIResponse<T> >(url, { headers: headers }).toPromise();
    else req = this.http.post< APIResponse<T> >(url, JSON.stringify(body), { headers: headers }).toPromise();
    return req.then(response => {
      console.log(response);
      if(!response.success) throw new Error(APIError[response.error].message);
      return response.result;
    });
  }

  async getOptions(): Promise<APIOptions> {
    return this.request< APIOptions >('GET', '/word/options').then(result => {
      for(let item of result){
        this.dataStore.wordOptionsLabel[item.value] = item;
      }
      return (this.dataStore.wordOptions = result)
    });
  }

  async getLatestWords(): Promise<APISearch> {
    return this.search('').then(result => {
      return (this.dataStore.latestWords = result);
    });
  }

  async addWord(text: string, type: string, options: any): Promise<Word> {
    for(let item of Object.keys(options)) {
      options[item].text = text;
    }
    let q: any = options;
    q['type'] = type;
    return this.request< Word >('POST', '/word/add', q)
  }

  async search(query: string, order: string = "name", type: string = "", offset: number = 0, limit: number = 10): Promise<Word[]> {
    return this.request< APISearch >('GET', '/word/search', {
      limit: limit,
      offset: offset,
      query: query,
      order: order,
      type: type
    });
  }

  async generateQuestion(text: string): Promise<APISentences> {
    return this.request< APISentences >('GET', '/generate', {
      query: text
    })
  }

  async login(username: string, password: string): Promise<APILogin> {
    return this.request< APILogin >('POST', '/login', {
      username: username,
      password: password
    }).then(result => {
      this.token = result.token;
      this.cookie.set('MELI_TOKEN', this.token);
      this.loginState.next(2);
      return result;
    })
  }

}
