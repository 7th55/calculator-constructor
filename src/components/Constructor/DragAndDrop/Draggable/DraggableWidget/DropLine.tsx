import React, { FC } from 'react';

import { DropLineProps } from './types';
import { StyledDropLine } from './styles';

export const DropLine: FC<DropLineProps> = ({
  children,
  mode,
  index,
  dropIndex,
}) => {
  if (!mode) {
    return <>{children}</>;
  }

  

  const topStatement = dropIndex !== null && dropIndex > index;
  const bottomStatement = dropIndex !== null && dropIndex < index;
  return (
    <>
      <StyledDropLine borderTop={topStatement} borderBottom={bottomStatement}>
        {children}
      </StyledDropLine>
    </>
  );
};
