import * as React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';

const routes = [
  { href: '/', label: 'Search' },
  { href: '/create', label: 'Create' },
  { href: 'https://github.com/coding-projects-repos', label: 'Github' },
];

function Header(props: WithRouterProps) {
  const currentPage = props.router ? props.router.pathname : '';

  return (
    <div className="header">
      {routes.map(route => (
        <Link href={route.href} key={`header-route-${route.label}`}>
          <a
            className={classnames('route', {
              active: currentPage === route.href,
            })}
          >
            {route.label}
          </a>
        </Link>
      ))}
      <style jsx>{`
        .header {
          display: flex;
          height: 40px;
          border-bottom: 1px solid #ccc;
        }
        .route {
          height: 100%;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          color: black;
          cursor: pointer;
        }
        .route:hover {
          background: #ccc;
        }
        .route.active {
        }
      `}</style>
    </div>
  );
}

export default withRouter(Header);
