## User

| Path | Method | Params | Body | Description |
| --- | --- | --- | --- | --- |
| `/user` | `POST` | - | `{ "login":"test01", "password": "password123" }` | Saves user to database and returns it |

## Login
| Path | Method | Params | Body | Description |
| --- | --- | --- | --- | --- |
| `/auth/login` | `POST` | - | `{ "login":"test01", "password": "password123" }` | Validates the user and returns jwt token |

## Geolocation

All geolocation requests requires valid jwt token as header:
`Authorization: Bearer [VALID TOKEN]`

| Path | Method | Params | Body | Description |
| --- | --- | --- | --- | --- |
| `/geolocation` | `GET` | - | - | Gets all geolocations |
| `/geolocation/:query` | `GET` | `query: looked for ip or adress` | - | Gets one geolocation |
| `/geolocation` | `POST` | - | `{"query": "twitch.tv"}` | Saves unique queried adress in database |
| `/geolocation/:query` | `DELETE` | `query: ip or adress to delete` | - | Removes one geolocation from database |
