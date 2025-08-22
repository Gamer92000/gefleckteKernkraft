import NSets from './pages/nSets/index.jsx';
import ExTime from './pages/exTime/index.jsx';
import ExPause from './pages/exPause/index.jsx';
import SetPause from './pages/setPause/index.jsx';

import './App.css';
import {useState} from 'react';
import Ready from './pages/ready/index.jsx';
import Timer from './pages/timer/index.jsx';

// biome-ignore lint/style/useEnumInitializers: <explanation>
enum STEP {
  NSETS,
  EXTIME,
  EXPAUSE,
  SETPAUSE,
  READY,
  TIMER,
}

export function App() {
  const [step, setStep] = useState<STEP>(STEP.NSETS);
  const platform = NativeModules.NativeBridgeModule.getPlatform()
  const mobile = platform === 'mobile'

  return (
    <view className="App">
      <view className={ mobile ? "wrapper-mobile" : "wrapper-wear" }>
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
              setStep(STEP.NSETS);
            }}
          />
        )}
      </view>
    </view>
  );
}
