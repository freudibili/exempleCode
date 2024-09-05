import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface SVGComponentProps {
  width: number;
  height: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const SVGComponent: React.FC<SVGComponentProps> = ({
  primaryColor = 'currentColor',
  secondaryColor = 'currentColor',
  ...props
}) => (
  <Svg id="Calque_1" data-name="Calque 1" viewBox="0 0 512 512" {...props}>
    <Path
      fill={secondaryColor}
      d="m465.1,403.59c-46.33,65.56-122.7,108.41-209.1,108.41C114.63,512,0,397.37,0,256h306.63c28.23,69.8,86.36,124.23,158.47,147.59Z"
    />
    <Path
      fill={primaryColor}
      d="m512,256H0C0,114.63,114.63,0,256,0s256,114.63,256,256Z"
    />
  </Svg>
);

export default SVGComponent;
