// https://jakelazaroff.com/words/an-interactive-intro-to-crdts/
export interface Mergable {
    merge(other: this): void;
    toMerged(other: this): Mergable;
}

export type SiteID = string;

export interface Clock {
    value: any;
    tick(args: any): void;
    merge(other: this): void;
}
