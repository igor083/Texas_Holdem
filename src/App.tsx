import Card from './components/Card';
import Player from './components/Player';

const players = [
  {
    name: 'Player 1',
    pot: 100,
    cards: [],
  }
]

const App = () => {
  return (
    <div>
      <Card suit="copas" rank="2" />
      <Card suit="copas" rank="k" />
      <Card suit="copas" rank="3" />
    </div>
  );
};

export default App;