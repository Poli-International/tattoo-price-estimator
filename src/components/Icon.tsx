// Drawn icon from the site sprite (tools/shared/icons.svg), same markup as the site's icon pass.
import React from 'react';

export const Icon: React.FC<{ name: string }> = ({ name }) => (
  <svg className="ti-i" width="1.15em" height="1.15em" aria-hidden="true" style={{ verticalAlign: '-.18em', flex: 'none' }}>
    <use href={`../shared/icons.svg#i-${name}`} />
  </svg>
);
