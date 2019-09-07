import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { withRouter, WithRouterProps } from 'next/router';

interface Query {
  name: string;
  url: string;
}

function CreatedPage(props: WithRouterProps<Query>) {
  if (!props.router) {
    return <div>something went wrong</div>;
  }

  const { name, url: repoUrl } = props.router.query || {
    name: '',
    url: '',
  };

  return (
    <div className="created-page">
      <Header as="h1">Created: {name}</Header>
      <Header as="h3">
        The WIP (Work in Progress) tag will be removed once the project
        description is complete.
      </Header>
      <Header as="h3">
        Click{' '}
        <a href={repoUrl} target="_blank">
          here
        </a>{' '}
        to view the new repo.
      </Header>
      <style jsx>{`
        .created-page {
          margin: 50px;
        }
      `}</style>
    </div>
  );
}

export default withRouter(CreatedPage);
