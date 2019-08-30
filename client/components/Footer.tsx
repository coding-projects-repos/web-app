import * as React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <div className="main-footer">
      This is a footer!
      <style jsx>{`
        .main-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          width: 100vw;
        }
        .nav {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          width: 250px;
        }
      `}</style>
    </div>
  );
}

export default Footer;
