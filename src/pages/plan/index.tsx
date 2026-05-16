import { PLANS, useStateStore } from '../../state.store.js';
import '../../components/settings_page/index.css';
import './index.css';

interface PlanProps {
  continue: () => void;
}

export default function PlanPicker(props: PlanProps) {
  const planIdx = useStateStore((state) => state.planIdx);
  const nextPlan = useStateStore((state) => state.nextPlan);
  const prevPlan = useStateStore((state) => state.prevPlan);

  lynx.registerModule('scrollHandler', {
    up: () => {
      nextPlan();
    },
    down: () => {
      prevPlan();
    },
  });

  const plan = PLANS[planIdx];

  return (
    <view className="wrapper">
      <text className="secondary title">Plan</text>
      <view className="valueContainer">
        <text className="primary plan_name">{plan.name}</text>
      </view>
      <view className="buttons">
        <view className="button round secondary" bindtap={prevPlan}>
          <text className="icon">chevron_left</text>
        </view>
        <view className="button square primary" bindtap={props.continue}>
          <text className="icon">check</text>
        </view>
        <view className="button round secondary" bindtap={nextPlan}>
          <text className="icon">chevron_right</text>
        </view>
      </view>
    </view>
  );
}
