import axios from 'axios';

const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const storageKey = 'MUSIC_SEARCHER_AUTH';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TokenStore extends TokenResponse {
  expireTimestamp: number;
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
  const now = Date.now();

  const tokenStore: TokenStore = {
    ...tokenResp,
    expireTimestamp: now + tokenResp.expires_in * 1000,
  };

  localStorage.setItem(storageKey, JSON.stringify(tokenStore));

  return tokenStore.access_token;
};

const authenticate = async () => {
  const existingToken: TokenStore | null = JSON.parse(localStorage.getItem(storageKey) ?? 'null');

  if (existingToken) {
    const now = Date.now();
    const isExpired = existingToken.expireTimestamp - now <= 0;

    if (isExpired) {
      return updateToken();
    }

    return existingToken.access_token;
  } else {
    return updateToken();
  }
};

const token = await authenticate();

export default token;
