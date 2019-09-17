import * as models from './models';

export type APISearch = models.Word[];

export class APIUser {
    id: number
    username: string
    access_level: number
}

export class APILogin {
    token: string
    user: APIUser
}

class APIOptionListItem {
    value: number
    label: string
}

class APIOptionList {
    value: number
    label: string
    options: APIOptionListItem[]
}

class APIOptionSwitch {
    anti: string
    value: string
    label: string
}

export class APIOption {
    value: string
    label: string
    switches: APIOptionSwitch[]
    lists: APIOptionList[]
    dependencies: string[]
}

export type APIOptions = APIOption[]

export class APISentence {
    question: string
    answer: string
}

export type APISentences = APISentence[]

export class APIGenerate {
    id: number
    sentence: string
    questions: models.Question[]
}

export class APIQuestion {
    page_url: string
    sentence: string
}

export class APIResponse<T> {
    success: boolean
    result?: T
    error?: string
}