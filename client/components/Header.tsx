import * as React from 'react';
import colors from 'client/styles/colors';
import { headerHeight } from 'client/lib/pageMeasurements';

function Header() {
  return (
    <div className="header">
      This is a header!
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: ${headerHeight}px;
          background-color: ${colors.blue};
        }
      `}</style>
    </div>
  );
}

export default Header;
