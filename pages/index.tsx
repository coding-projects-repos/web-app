import * as React from 'react';
import { Header, Loader, Card, Message } from 'semantic-ui-react';
import axios from 'axios';

interface GithubRepo {
  name: string;
  url: string;
  description: string;
}

export default () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [repos, setRepos] = React.useState<Array<GithubRepo>>([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let data;

    try {
      const res = await axios.get('/api/repos');
      data = res.data;
    } catch (e) {
      setError(e.message);
      setLoading(false);

      return;
    }

    setLoading(false);
    setRepos(data);
  };

  return (
    <div className="landing-page">
      <Header as="h1">Discover Coding Projects</Header>
      <p>Search coming soon!</p>
      {error && (
        <Message negative>
          {error + '\n\nPlease contact tim@codingprojects.net'}
        </Message>
      )}
      <div className="repo-list">
        {loading ? (
          <Loader active>Loading Projects</Loader>
        ) : (
          <Card.Group>
            {repos.map(repo => (
              <a href={repo.url} className="ui card">
                <Card.Content>
                  <Card.Header>{repo.name}</Card.Header>
                  <Card.Description>{repo.description}</Card.Description>
                </Card.Content>
              </a>
            ))}
          </Card.Group>
        )}
      </div>
      <style jsx>{`
        .landing-page {
          margin: 50px;
        }
        .repo-list {
          min-height: 300px;
          position: relative;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};
