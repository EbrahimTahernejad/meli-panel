import { APIOptions, APISearch, APIOption } from "./response";
import { BehaviorSubject } from 'rxjs';

export class DataStore {

    wordOptions: APIOptions = [];
    wordOptionsLabel: { [name: string]: APIOption } = {};

    searchLoading: boolean = false
    searchOptions = {
        type: "",
        order: "name"
    }
    searchQuery: BehaviorSubject<string> = new BehaviorSubject("");
    searchResult: APISearch = [];

    latestWords: APISearch | null;

}