import './index.css';

interface SettingsPageProps {
  title: string;
  current: number;
  unit?: string;
  increase: () => void;
  decrease: () => void;
  continue: () => void;
}

export default function SettingsPage(props: SettingsPageProps) {
  if (__BACKGROUND__) {
    lynx.registerModule('scrollHandler', {
      up: () => {
        props.increase();
      },
      down: () => {
        props.decrease();
      },
    });
  }

  return (
    <view className="wrapper">
      <text className="secondary title">{props.title}</text>
      <view className="valueContainer">
        <text className="primary value">{props.current}</text>
        {props.unit && <text className="secondary unit">{props.unit}</text>}
      </view>
      <view className="buttons">
        <view className="button round secondary" bindtap={props.decrease}>
          <text className="icon">remove</text>
        </view>
        <view className="button square primary" bindtap={props.continue}>
          <text className="icon">check</text>
        </view>
        <view className="button round secondary" bindtap={props.increase}>
          <text className="icon">add</text>
        </view>
      </view>
    </view>
  );
}
