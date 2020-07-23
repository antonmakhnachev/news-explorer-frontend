import { URL_MAIN_SERVER, URL_NEWS_SERVER } from './server-url.js';
import { NEWS_API_KEY } from './news-api-key';
import { dateFrom } from '../utils/date-from.js';

export const MAIN_API_OPTIONS = {
    baseUrl: URL_MAIN_SERVER,
    headers: {
        'Content-Type': 'application/json'
    }
};

export const NEWS_API_OPTIONS = {
    baseUrl: URL_NEWS_SERVER,
    apiKey: NEWS_API_KEY,
    from: dateFrom(7),
    to: dateFrom(0),
    pageSize: 100
};

