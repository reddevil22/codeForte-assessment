
import { useMachine } from '@xstate/react';
import { useState } from 'react';
import { tamagotchiMachine } from '../utils';

export const Tamagotchi = () => {
    const [state, send] = useMachine(tamagotchiMachine);

    const [stats, useStats] = useState({
        health: 0,
        weight: 0,
        hunger: 0,
        happiness: 0,
        age: 0,
    });


    const transition = ['sleeping', 'playing', 'eating', 'healing', 'toilet'].some(state.matches);
    const ignoreTransition = ['sleeping', 'playing', 'eating'].some(state.matches);

    return (
        <div className="tamagotchi">
            <h4 className="state">{state.value}</h4>
            <button onClick={() => send('SLEEP')}>Sleeping</button>
            <button onClick={() => send('PLAY')}>Playing</button>
            <button onClick={() => send('EAT')}>Eating</button>
            <button onClick={() => send('HEAL')}>Healing</button>
            <button onClick={() => send('TOILET')}>Toilet</button>
            {ignoreTransition && <button onClick={() => send('IGNORE')}>Ignore</button>}
            {transition && <button onClick={() => send('DONE')}>Done</button>}
        </div>
    );
}