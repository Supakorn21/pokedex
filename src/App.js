import pokemonLogoSrc from './assets/images/pokedex.png';
import { Image } from 'antd';
import { Button } from '@atomic';
import { log } from '@utils';

function App() {
  log('hello');
  return (
    <div>
      <div className="App">React App</div>
      <Image width={200} src={pokemonLogoSrc} />
      <Button type="primary">Clickme</Button>
    </div>
  );
}

export default App;
