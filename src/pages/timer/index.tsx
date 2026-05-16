import { useEffect, useState } from 'react';
import { PLANS, useStateStore } from '../../state.store.js';

import './index.css';

interface TimerProps {
  done: () => void;
}

export default function Timer(props: TimerProps) {
  const state = useStateStore();
  const exercises = PLANS[state.planIdx].exercises;

  const [interval, setIntervalState] = useState<number>();

  useEffect(() => {
    NativeModules.NativeBridgeModule.setInhibitor();
    setIntervalState(
      setInterval(() => {
        state.countdown();
      }, 1000) as unknown as number,
    );
  }, [state.countdown]);

  if (state.finished) {
    NativeModules.NativeBridgeModule.unsetInhibitor();
    clearInterval(interval);
    state.reset();
    props.done();
  }

  return (
    <view className="timer_wrapper">
      <text className="timer_top secondary">
        {state.pause ? 'Pause' : exercises[state.exercise]}
      </text>
      <text className="timer primary">{state.countdown_value}</text>
      <text className="timer_bottom secondary">
        {state.pause
          ? `Next: ${exercises[state.exercise + 1]}`
          : `${state.set_number + 1} / ${state.nSets}`}
      </text>
    </view>
  );
}
