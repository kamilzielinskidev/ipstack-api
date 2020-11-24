import Axios from 'axios';
import { from, of, throwError } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { config } from '@config/config';

const { key } = config.ipstackAPI;

type IPStackResponseSuccess = {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: number;
    capital: string;
    languages: [
      {
        code: string;
        name: string;
        native: string;
      },
    ];
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: true;
  };
};

type IPStackResponseError = {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
};

export const fetchGeolocationData$ = (query: string) =>
  from(
    Axios.get<IPStackResponseSuccess & IPStackResponseError>(`http://api.ipstack.com/${query}?access_key=${key}`),
  ).pipe(
    pluck('data'),
    switchMap((data) => ('success' in data && !data.success ? throwError(new Error()) : of(data))),
  );
