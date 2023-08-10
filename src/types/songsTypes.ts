export interface Types {
    tracks: Track[];
}

export interface Track {
    layout:   string;
    type:     TrackType;
    key:      string;
    title:    string;
    subtitle: string;
    share:    Share;
    images:   TrackImages;
    hub:      Hub;
    artists:  Artist[];
    url:      string;
}

export interface Artist {
    id:     string;
    adamid: string;
}

export interface Hub {
    type:        HubType;
    image:       string;
    actions:     Action[];
    options:     Option[];
    providers:   Provider[];
    explicit:    boolean;
    displayname: Displayname;
}

export interface Action {
    name?: Name;
    type:  ActionType;
    id?:   string;
    uri?:  string;
}

export enum Name {
    Apple = "apple",
    HubApplemusicDeeplink = "hub:applemusic:deeplink",
    HubDeezerSearchdeeplink = "hub:deezer:searchdeeplink",
    HubSpotifySearchdeeplink = "hub:spotify:searchdeeplink",
}

export enum ActionType {
    Applemusicopen = "applemusicopen",
    Applemusicplay = "applemusicplay",
    URI = "uri",
}

export enum Displayname {
    AppleMusic = "APPLE MUSIC",
}

export interface Option {
    caption:             OptionCaption;
    actions:             Action[];
    beacondata:          Beacondata;
    image:               string;
    type:                BeacondataType;
    listcaption:         Listcaption;
    overflowimage:       string;
    colouroverflowimage: boolean;
    providername:        Providername;
}

export interface Beacondata {
    type:         BeacondataType;
    providername: Providername;
}

export enum Providername {
    Applemusic = "applemusic",
    Itunes = "itunes",
}

export enum BeacondataType {
    Buy = "buy",
    Open = "open",
}

export enum OptionCaption {
    Buy = "BUY",
    Open = "OPEN",
}

export enum Listcaption {
    BuyOnITunes = "Buy on iTunes",
    OpenInAppleMusic = "Open in Apple Music",
}

export interface Provider {
    caption: ProviderCaption;
    images:  ProviderImages;
    actions: Action[];
    type:    ProviderType;
}

export enum ProviderCaption {
    OpenInDeezer = "Open in Deezer",
    OpenInSpotify = "Open in Spotify",
}

export interface ProviderImages {
    overflow: string;
    default:  string;
}

export enum ProviderType {
    Deezer = "DEEZER",
    Spotify = "SPOTIFY",
}

export enum HubType {
    Applemusic = "APPLEMUSIC",
}

export interface TrackImages {
    background: string;
    coverart:   string;
    coverarthq: string;
    joecolor:   string;
}

export interface Share {
    subject:  string;
    text:     string;
    href:     string;
    image:    string;
    twitter:  string;
    html:     string;
    avatar?:  string;
    snapchat: string;
}

export enum TrackType {
    Music = "MUSIC",
}
