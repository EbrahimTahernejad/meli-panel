export class Word {
    id: number
    text: string
    type: string
    phonetic: string
}

export class Noun extends Word {
    isGeneral: boolean
    isSingle: boolean
    simplicity: number
    isKnown: boolean
    isDerived: boolean
    kind: number
}

export class Adjective extends Noun {
    kind: number
}

export class Adverb extends Noun {
    kind: number
}

export class Pronoun extends Noun {
    kind: number
}

export class Letter extends Word {
    conjunction: number
    isPrepositions: boolean
    isInterjection: boolean
}

export class PastPrincipal extends Word {}

export class PresentPrincipal extends Word {}

export class Verb extends Word {
    isCopula: boolean
    isPassive: boolean
    kind: number
    prefixes: string[]
    suffixes: string[]
    isIntransitive: boolean
    tense: number
    mood: number
}

export class Question {
    text: string = ""
    answer: string = ""
}
