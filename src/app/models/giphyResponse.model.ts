import { giphyResonseDataPartial } from './giphyResponseDataPartial.model';

export interface giphyResponse {
    data: giphyResonseDataPartial[];
    pagination: any;
    meta: any;
}