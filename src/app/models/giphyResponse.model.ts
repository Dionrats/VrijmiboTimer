import {GiphyResponseDataPartial} from './giphyResponseDataPartial.model';

export interface giphyResponse {
    data: GiphyResponseDataPartial[];
    pagination: any;
    meta: any;
}
