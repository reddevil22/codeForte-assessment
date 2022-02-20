import { assign, createMachine } from "xstate";

interface StateContext {
    health: number;
    weight: number;
    hunger: number;
    happiness: number;
    age: number;
}

export const tamagotchiMachine = createMachine({
    id: "tamagotchi",
    initial: "idle",
    context: {
        health: 5,
        weight: 0,
        hunger: 5,
        happiness: 0,
        age: 0,
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
                    actions: ['changeAge', 'increaseHunger', 'changeHealth']
                },
                IGNORE: "die"
            },
        },
        playing: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeHappiness', 'increaseHunger']
                },
                IGNORE: "die"
            },
        },
        eating: {
            on: {
                DONE: {
                    target: "idle",
                    actions: ['changeHealth', 'changeWeight', 'decreaseHunger', 'changeHappiness']
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
                DONE: "idle"
            },
        },
        die: {},
    }
}, {
    actions: {
        changeHealth: assign({
            health: (context) => context.health + 1,
        }),
        changeWeight: assign({
            weight: (context) => context.weight + 1,
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
    }
});