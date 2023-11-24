import React, { memo } from '../../lib/teact/teact';

import buildClassName from '../../util/buildClassName';

import Spinner from './Spinner';

import './Loading.scss';

/**
 * TL - Custom Loading Component, add gray color
 */
type OwnProps = {
  color?: 'blue' | 'white' | 'black' | 'yellow' | 'gray';
  backgroundColor?: 'light' | 'dark';
  className?: string;
  onClick?: NoneToVoidFunction;
  ref?: React.Ref<HTMLDivElement>;
};

const Loading = ({
  color, backgroundColor, ref, className, onClick,
}: OwnProps) => {
  return (
    <div ref={ref} className={buildClassName('Loading', onClick && 'interactive', className)} onClick={onClick}>
      <Spinner color={color} backgroundColor={backgroundColor} />
    </div>
  );
};

export default memo(Loading);
