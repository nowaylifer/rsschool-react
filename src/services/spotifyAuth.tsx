import axios from 'axios';
import lscache from 'lscache';

const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const storageKey = 'auth';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

const fetchToken = async () => {
  const response = await axios.post<TokenResponse>(
    'https://accounts.spotify.com/api/token',
    `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
};

const updateToken = async () => {
  const tokenResp = await fetchToken();
  lscache.set(storageKey, tokenResp, tokenResp.expires_in / 60);
  return tokenResp.access_token;
};

const authenticate = async () => {
  lscache.setBucket('nowaylifer-');
  const existingToken: TokenResponse | null = lscache.get(storageKey);

  if (existingToken) {
    return existingToken.access_token;
  } else {
    return updateToken();
  }
};

const token = await authenticate();

export default token;
