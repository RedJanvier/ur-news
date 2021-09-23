interface ILocation {
  text: string;
  abbr: string;
}

interface ISearchLocation {
  text?: string;
  abbr: string;
}

interface ILocationContainer {
  [key: string]: ILocation[];
}
