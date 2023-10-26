import { Component, PropsWithChildren } from 'react';
import CountrySearch from './components/Search';
import countriesService from './services/spotifyApi';

type State = {
  country: object | null;
};

class App extends Component<PropsWithChildren, State> {
  state = {
    country: null,
  };

  searchCountry = async (query: string) => {
    const result = await countriesService.search(query.trim());
    console.log(result);
  };

  render() {
    return (
      <div className="container mx-auto px-4">
        <CountrySearch onSearch={this.searchCountry} />
      </div>
    );
  }
}

export default App;
