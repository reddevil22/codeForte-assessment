
import { useMachine } from '@xstate/react';
import { tamagotchiMachine } from '../utils';

export const Tamagotchi = () => {
    const [state, send] = useMachine(tamagotchiMachine);

    const transition = ['sleeping', 'playing', 'eating', 'healing', 'toilet'].some(state.matches);
    const ignoreTransition = ['sleeping', 'playing', 'eating'].some(state.matches);

    return (
        <div className="tamagotchi">
            <div className="display">
                <h4 className="state">{state.value}</h4>
                <button onClick={() => send('SLEEP')}>Sleeping</button>
                <button onClick={() => send('PLAY')}>Playing</button>
                <button onClick={() => send('EAT')}>Eating</button>
                <button onClick={() => send('HEAL')}>Healing</button>
                <button onClick={() => send('TOILET')}>Toilet</button>
                {ignoreTransition && <button onClick={() => send('IGNORE')}>Ignore</button>}
                {transition && <button onClick={() => send('DONE')}>Done</button>}
            </div>
            <div className="stats">
                <div className="health">Health: {state.context.health}</div>
                <div className="health">Weight: {state.context.weight}</div>
                <div className="health">Hunger: {state.context.hunger}</div>
                <div className="health">Happiness: {state.context.happiness}</div>
                <div className="health">Age: {state.context.age}</div>
            </div>
        </div>
    );
}