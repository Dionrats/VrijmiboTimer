import { Observable } from "rxjs";

export interface IGifRetriever {
  retrieveGif(context?: string): Observable<string>;
}
