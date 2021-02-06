import { CustomPIXIComponent } from "react-pixi-fiber";
import PixiFps from "pixi-fps";

type PixiFpsProps = {};
export const PixiFpsComponent = CustomPIXIComponent<PixiFps, PixiFpsProps>(
  {
    customDisplayObject: (_) => new PixiFps(),
    customApplyProps: (instance, _oldProps, newProps) => {},
    customDidAttach: (instance) => {},
    customWillDetach: (instance) => {},
  },
  "PixiFpsComponent"
);
