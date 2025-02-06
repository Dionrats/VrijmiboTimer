import { Injectable } from '@angular/core';
import { IGifRetriever } from './igif-retriever';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalGifService implements IGifRetriever {
  private accessToken = 'sl.u.AFiVq7-oiar5aDiutEkNREw20Eh1Ppr1kWLUmp4QN94QSdfElqqg5jTW4oKgVwicvxmwjPxPifjh6fWIGd96i9sa691uUzMYMtk3cri1gpfr4jKvQW5bEM5ejtCmVNGuR2W9vUvQ1w1QqcRiU8GvOJfrN3vzbZTxnklb0OzCyPpX71zxLsUORsL_y2S6g3lWtcmJ_EFdMST2zTxn7L_dMbuGCz7qGkgngawUXkjnNVDUWJ1RZx0qtA5Sv7h8aS8MWfvvDtlF62nyyMBAx1Rnxbgad7WPwulJ0_gjYwq8vUehuQEGCN-PA_-j849y9IO5bOfdG5lO3Qu0iUD7-5rZQP3jxeN2gecTcVOrS_5Lqa2Vv4CLVIoRTVPoqSF4RwUoDV761y3iyqpHpu2YvQcsOzeNg8CMi-9p-MxzBNzU-69SBgLPRR7gg9ULz3EfNwmfcGWvM-RKQAXeF3alChUm8OBorFNXtB4Js4JjKt-MlEb2rv-J-fuptHxqmfdHtPlErvszB61fQGwQq061kY14nESBEyeVrcA6y0EKSyBNHI3lzcugYKYz238xCg21Q0ys-ut5nKvfZfJj99qJ8wOF1mZGkZaFKDeYX0lLsjI2Hltbvozm1AtcHpckfRZ_Qs1KkYN6Vez6qQ0DLKVSysiULrPDoXv-dHjK6GHEei3YRX07i59D_PNfZGuehZNBuGoVmn-czvZubNVLULZu7cPHrdYgP4XPs5D3nOx-MMvclsOqrOIaazDATsGVBSTo1thCxV2yzkeqS13TJquWZod8-Lgv89xBaEY5gz7t_pCZzUamh-DONA6mIAQ7r7hlZLVB2LAJB0I5Cq4d2wlJ2XAuaKfYuUBwlJuDoxDwT23-sgLoeIRYbkAcozzubfL3sV7IYx5R6jK9UmdbbkiQwnh9QsjU0XltIr3DuSPsQnjPaLDmlSKjJ14R5y9EepS6hbVUI5j6WhxbWBPiG373jf6vBPkjQiPUxmShnmvgL4kOAhDeHtObGbJLGHimZJ-w7v6Af08UYEiM_MVYOrwUGvxyKuklCOl-0krwABAeLuBET_T6i3q67n5bTH8eKKUCCP4k6e1iJ2mUHXK2G4D7WO1DHJ1G2TUOFsyDkwmEHdBEZzOwuXOIHRA5Lr1x92IyNTwoTT8E24bawzU-wsOhqo8PSbmcvjGBSDUo103z0Txx04GFKT5l3z3baf8zHELPHtWnnsBgHMehoiLRW_PI25O5gFjcez4QzqX7b4MoPvOXwNl0QIEoiog0DY4qqAFhmo8MP3-T2brx9NlSsVmX3QGyxUc2e8WJTFKJZVToWe9No0ajiLYOmOLRrNhhT5oNKWRYiCOXT-kpPHatXEN7N_w1s928y4UTU9OgSqtpVaJWcLWRoBhlRsCr7aUfwPEoDJlfme3cLWTK-GnOiNRN3dFUIYLR7QqWGEaZEc4AsZVbf9Epxw'; 
  private folderPath = '/apps/vrijmibotimer/db';
  private gifUrls: string[] = []; 
  private lastFetched: number = 0;
  private refreshInterval: number = 3 * 60 * 60 * 1000; 

  constructor(private http: HttpClient) {
    this.fetchGifUrls();
  }

  private fetchGifUrls(): void {
    const currentTime = Date.now();

    if (currentTime - this.lastFetched < this.refreshInterval && this.gifUrls.length > 0) {
      return;
    }

    this.getGifUrlsFromDropbox().subscribe((urls) => {
      this.gifUrls = urls;
      this.lastFetched = Date.now();
    });
  }

  retrieveGif(context?: string): Observable<string> {
    this.fetchGifUrls();

    if (this.gifUrls.length === 0) {
      return of('');
    }

    const randomIndex = Math.floor(Math.random() * this.gifUrls.length);
    return of(this.gifUrls[randomIndex]);
  }

  private listGifs(): Observable<any[]> {
    const url = 'https://api.dropboxapi.com/2/files/list_folder';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });
    const body = {
      path: this.folderPath,
      recursive: false,
      limit: 2000
    };

    return this.http.post<any>(url, body, { headers }).pipe(
      map((response) =>
        response.entries.filter(
          (entry: any) =>
            entry['.tag'] === 'file' && entry.name.toLowerCase().endsWith('.gif')
        )
      )
    );
  }

  private getTemporaryLink(path: string): Observable<string> {
    const url = 'https://api.dropboxapi.com/2/files/get_temporary_link';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });
    const body = { path };

    return this.http.post<any>(url, body, { headers }).pipe(
      map((response) => response.link)
    );
  }

  private getGifUrlsFromDropbox(): Observable<string[]> {
    return this.listGifs().pipe(
      mergeMap((files) => from(files)),
      mergeMap((file) => this.getTemporaryLink(file.path_lower)),
      map((link) => link),
      toArray()
    );
  }
}
