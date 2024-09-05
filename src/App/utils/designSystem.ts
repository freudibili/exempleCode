import {MD3LightTheme} from 'react-native-paper';
import {customColorTheme} from './colorHelper';
import {customThemeFonts} from './fontHelper';
import {customStyle} from './styleHelper';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  fonts: customThemeFonts,
  colors: customColorTheme,
};

const designSystem = {
  theme,
  styles: {
    customStyle,
  },
  imagePlaceholders: {
    emptyUserImage:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
    emptyTrocItemImage: 'https://www.sacsleaf.ca/assets/img/frontend/none.png',
  },
};

export default designSystem;
