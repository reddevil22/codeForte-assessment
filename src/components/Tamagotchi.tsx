
import { useContext } from 'react';
import { MachineContext } from '../state';

import '../styles/Tamagotchi.css'

export const Tamagotchi = () => {
    //@ts-ignore
    const [machine, sendToMachine] = useContext(MachineContext);

    return (
        <div className="tamagotchi">
            <div className="display">
                <div className="state">
                    <h4 className="state">Current Tamagotchi state: {machine.value}</h4>
                </div>
                <div className="buttons">
                    {machine.value === 'idle' && <div className="activities">
                        <button onClick={() => sendToMachine('SLEEP')}>Sleep</button>
                        <button onClick={() => sendToMachine('PLAY')}>Play</button>
                        <button onClick={() => sendToMachine('EAT')}>Feed</button>
                        <button onClick={() => sendToMachine('HEAL')}>Heal</button>
                        <button onClick={() => sendToMachine('TOILET')}>Take to toilet</button>
                        <button onClick={() => sendToMachine('IGNORE')}>Ignore</button>
                    </div>}
                    {(machine.value !== 'idle' && machine.value !== 'die') && <button onClick={() => sendToMachine('DONE')}>Finish current activity</button>}
                </div>
            </div>
            <div className="stats">
                <h4 className="stats">Stats</h4>
                <div className="health">Health: {machine.context.health}</div>
                <div className="health">Weight: {machine.context.weight}</div>
                <div className="health">Hunger: {machine.context.hunger}</div>
                <div className="health">Happiness: {machine.context.happiness}</div>
                <div className="health">Age: {machine.context.age}</div>
            </div>
        </div>
    );
}