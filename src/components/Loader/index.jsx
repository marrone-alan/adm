import React from 'react';
import Loading from 'react-loader-spinner';

//variables
import { loader } from '../../config';

// styles
import { colors } from '../../styles/variables';
import { LoaderStyle } from './style';

const Loader = () => {
  return (
    <LoaderStyle>
      <Loading
        type={loader.type}
        color={colors.primary}
        height={loader.height}
        width={loader.width}
      ></Loading>
    </LoaderStyle>
  );
};

export default Loader;
