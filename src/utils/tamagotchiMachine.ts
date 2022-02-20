import { createMachine } from "xstate";

export const tamagotchiMachine = createMachine({
    id: "tamagotchi",
    initial: "idle",
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
                DONE: "idle",
                IGNORE: "die"
            },
        },
        playing: {
            on: {
                DONE: "idle",
                IGNORE: "die"
            },
        },
        eating: {
            on: {
                DONE: "idle",
                IGNORE: "die"
            },
        },
        healing: {
            on: {
                DONE: "idle"
            },
        },
        toilet: {
            on: {
                DONE: "idle"
            },
        },
        die: {},
    },
});