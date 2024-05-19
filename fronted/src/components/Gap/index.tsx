import React from 'react';

export const Gap: React.FC<{
  vertical?: number | string;
  horizontal?: number | string;
}> = (props) => {
  return <div style={{ height: props.vertical, width: props.horizontal }} />;
};
