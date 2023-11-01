import axios from 'axios';

const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export interface TokenResponse {
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

export default fetchToken;
