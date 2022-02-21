import { useMachine } from '@xstate/react';
import './App.css';
import { Tamagotchi } from './components';
import { MachineContext, tamagotchiMachine } from './state';

function App() {
  const [currentMachine, sendToMachine] = useMachine(tamagotchiMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <div className="App">
        <Tamagotchi />
      </div>
    </MachineContext.Provider>
  );
}

export default App;
