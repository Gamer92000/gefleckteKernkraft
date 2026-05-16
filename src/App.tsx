import ExPause from './pages/exPause/index.jsx';
import ExTime from './pages/exTime/index.jsx';
import NSets from './pages/nSets/index.jsx';
import SetPause from './pages/setPause/index.jsx';

import './App.css';
import { useState } from 'react';
import PlanPicker from './pages/plan/index.jsx';
import Ready from './pages/ready/index.jsx';
import Timer from './pages/timer/index.jsx';

// biome-ignore lint/style/useEnumInitializers: <explanation>
enum STEP {
  PLAN,
  NSETS,
  EXTIME,
  EXPAUSE,
  SETPAUSE,
  READY,
  TIMER,
}

export function App() {
  const [step, setStep] = useState<STEP>(STEP.PLAN);
  const platform = __BACKGROUND__
    ? NativeModules.NativeBridgeModule.getPlatform()
    : 'mobile';
  const mobile = platform === 'mobile';

  if (__BACKGROUND__) {
    lynx.registerModule('backHandler', {
      back: () => {
        setStep((current) => {
          if (current === STEP.PLAN) {
            NativeModules.NativeBridgeModule.exitApp();
            return current;
          }
          if (current <= STEP.READY) {
            return (current - 1) as STEP;
          }
          return current;
        });
      },
    });
  }

  return (
    <view className="App">
      <view className={mobile ? 'wrapper-mobile' : 'wrapper-wear'}>
        {step === STEP.PLAN && (
          <PlanPicker
            continue={() => {
              setStep(STEP.NSETS);
            }}
          />
        )}
        {step === STEP.NSETS && (
          <NSets
            continue={() => {
              setStep(STEP.EXTIME);
            }}
          />
        )}
        {step === STEP.EXTIME && (
          <ExTime
            continue={() => {
              setStep(STEP.EXPAUSE);
            }}
          />
        )}
        {step === STEP.EXPAUSE && (
          <ExPause
            continue={() => {
              setStep(STEP.SETPAUSE);
            }}
          />
        )}
        {step === STEP.SETPAUSE && (
          <SetPause
            continue={() => {
              setStep(STEP.READY);
            }}
          />
        )}
        {step === STEP.READY && (
          <Ready
            continue={() => {
              setStep(STEP.TIMER);
            }}
          />
        )}
        {step === STEP.TIMER && (
          <Timer
            done={() => {
              setStep(STEP.PLAN);
            }}
          />
        )}
      </view>
    </view>
  );
}
