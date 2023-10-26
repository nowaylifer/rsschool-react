import axios from 'axios';

const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const response = await axios.post(
  'https://accounts.spotify.com/api/token',
  `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
);

const token = response.data['access_token'];

export default token;
