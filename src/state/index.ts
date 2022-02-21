import { createContext } from "react";
import { assign, createMachine } from "xstate";

interface StateContext {
    health: number;
    weight: number;
    hunger: number;
    happiness: number;
    age: number;
    attention: number;
}

export const MachineContext = createContext({});

export const tamagotchiMachine = createMachine({
    id: "tamagotchi",
    initial: "idle",
    context: {
        health: 5,
        weight: 5,
        hunger: 5,
        happiness: 5,
        age: 0,
        attention: 0,
    } as StateContext,
    states: {
        idle: {
            on: {
                SLEEP: "sleeping",
                PLAY: "playing",
                EAT: "eating",
                HEAL: "healing",
                TOILET: "toilet",
                IGNORE: "die"
            }
        },
        sleeping: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeAge', 'increaseHunger', 'changeHealth', 'changeAttention']
                },
                IGNORE: "die"
            },
        },
        playing: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeHappiness', 'increaseHunger', 'decreaseWeight']
                },
                IGNORE: "die"
            },
        },
        eating: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeHealth', 'increaseWeight', 'decreaseHunger', 'changeHappiness']
                },
                IGNORE: "die"
            },
        },
        healing: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeHealth']
                }
            },
        },
        toilet: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['increaseHunger']
                }
            },
        },
        die: {
            on: {
                RESET: {
                    target: "idle",
                    actions: ['resetStats']
                },
                
            }
        },
    }
}, {
    actions: {
        changeHealth: assign({
            health: (context) => context.health + 1,
        }),
        increaseWeight: assign({
            weight: (context) => context.weight + 1,
        }),
        decreaseWeight: assign({
            weight: (context) => context.weight - 1,
        }),
        increaseHunger: assign({
            hunger: (context) => context.hunger + 1,
        }),
        decreaseHunger: assign({
            hunger: (context) => context.hunger - 1,
        }),
        changeHappiness: assign({
            happiness: (context) => context.happiness + 1,
        }),
        changeAge: assign({
            age: (context) => context.age + 1,
        }),
        resetStats: assign({
            health: (context) => context.health = 5,
            weight: (context) => context.weight = 5,
            hunger: (context) => context.hunger = 5,
            happiness: (context) => context.happiness = 5,
            age: (context) => context.age = 0,
            attention: (context) => context.age = 0,
        })
    }
});