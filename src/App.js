import { Button } from 'antd';
import pokemonLogoSrc from './assets/images/pokedex.png';
import { Image } from 'antd';

function App() {
  return (
    <div>
      <div className="App">React App</div>
      <Image width={200} src={pokemonLogoSrc} />
      <Button type="primary">Clickme</Button>
    </div>
  );
}

export default App;
