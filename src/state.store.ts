import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const MIN_SETS = 1;
const MAX_SETS = 10;
const STEP_SETS = 1;

const MIN_EX_TIME = 5;
const MAX_EX_TIME = 120;
const STEP_EX_TIME = 5;

const MIN_EX_PAUSE = 5;
const MAX_EX_PAUSE = 120;
const STEP_EX_PAUSE = 5;

const MIN_SET_PAUSE = 5;
const MAX_SET_PAUSE = 300;
const STEP_SET_PAUSE = 5;

export const EXERCISES = ['🍌', '🪵', '🇷🇺🔀', '🦵🆙', '🌉⏸️', '🇱🪑'];

export const useStateStore = create(
  combine(
    {
      nSets: 3,
      exTime: 30,
      exPause: 30,
      setPause: 60,

      countdown_value: 3,
      set_number: 0,
      exercise: -1,
      pause: true,
      finished: false,
    },
    (set) => ({
      countdown: () =>
        set((state) => {
          const result: Partial<{
            countdown_value: number;
            set_number: number;
            exercise: number;
            pause: boolean;
            finished: boolean;
          }> = {};

          result.countdown_value = state.countdown_value - 1;

          switch (result.countdown_value) {
            case 3: case 2: case 1:
              NativeModules.NativeBridgeModule.vibrate(false);
            break;
            case 0:
              NativeModules.NativeBridgeModule.vibrate(true);
          }

          if (result.countdown_value === 0) {
            if (state.pause) {
              result.pause = false;
              result.exercise = state.exercise + 1;
              result.countdown_value = state.exTime;
            } else {
              result.pause = true;
              if (
                state.exercise === EXERCISES.length - 1 &&
                state.set_number === state.nSets - 1
              ) {
                result.exercise = -1;
                result.countdown_value = 3;
                result.set_number = 0;
                result.finished = true;
              } else if (state.exercise === EXERCISES.length - 1) {
                result.countdown_value = state.setPause;
                result.exercise = -1;
                result.set_number = state.set_number + 1;
              } else {
                result.countdown_value = state.exPause;
              }
            }
          }

          return result;
        }),
      reset: () => set((state) => ({ finished: false })),
      lessSets: () =>
        set((state) => ({
          nSets: Math.max(MIN_SETS, state.nSets - STEP_SETS),
        })),
      moreSets: () =>
        set((state) => ({
          nSets: Math.min(state.nSets + STEP_SETS, MAX_SETS),
        })),
      lessWork: () =>
        set((state) => ({
          exTime: Math.max(MIN_EX_TIME, state.exTime - STEP_EX_TIME),
        })),
      moreWork: () =>
        set((state) => ({
          exTime: Math.min(state.exTime + STEP_EX_TIME, MAX_EX_TIME),
        })),
      lessPause: () =>
        set((state) => ({
          exPause: Math.max(MIN_EX_PAUSE, state.exPause - STEP_EX_PAUSE),
        })),
      morePause: () =>
        set((state) => ({
          exPause: Math.min(state.exPause + STEP_EX_PAUSE, MAX_EX_PAUSE),
        })),
      lessRest: () =>
        set((state) => ({
          setPause: Math.max(MIN_SET_PAUSE, state.setPause - STEP_SET_PAUSE),
        })),
      moreRest: () =>
        set((state) => ({
          setPause: Math.min(state.setPause + STEP_SET_PAUSE, MAX_SET_PAUSE),
        })),
    }),
  ),
);
