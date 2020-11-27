import Axios from 'axios';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { config } from '@config';
import { errorCondition } from '@utils';

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

type IpStackResponse = IPStackResponseError & IPStackResponseSuccess;

export const fetchGeolocationData$ = (query: string) =>
  from(Axios.get<IpStackResponse>(`http://api.ipstack.com/${query}?access_key=${key}`)).pipe(
    pluck('data'),
    errorCondition((data) => !('success' in data && !data.success), 'Failed to fetch from IPStack API'),
    errorCondition((data) => data.type !== null, 'Requested data not found'),
  );
