export interface Types {
    data: TypesDatum[];
}

export interface TypesDatum {
    id:            string;
    type:          string;
    attributes:    Attributes;
    relationships: Relationships;
}

export interface Attributes {
    genreNames: string[];
    name:       string;
    artwork:    Artwork;
    url:        string;
}

export interface Artwork {
    width:      number;
    url:        string;
    height:     number;
    textColor3: string;
    textColor2: string;
    textColor4: string;
    textColor1: string;
    bgColor:    string;
    hasP3:      boolean;
}

export interface Relationships {
    albums: Albums;
}

export interface Albums {
    data: AlbumsDatum[];
}

export interface AlbumsDatum {
    id:   string;
    type: Type;
}

export enum Type {
    Albums = "albums",
}
