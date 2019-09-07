import * as React from 'react';
import {
  Form,
  Header,
  Input,
  Button,
  TextArea,
  Message,
} from 'semantic-ui-react';
import axios from 'axios';
import Router from 'next/router';

interface GithubRepo {
  name: string;
  url: string;
  avatar_url: string;
}

function CreatePage() {
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onCreate = async () => {
    setError('');
    setLoading(true);
    let response;
    try {
      response = await axios.post('/api/create', { name, desc });
    } catch (e) {
      setError(e.message);
      setLoading(false);

      return;
    }

    const data: GithubRepo = response.data;

    const query = {
      url: data.url,
      name: data.name,
    };

    Router.push(
      { pathname: '/created', query },
      { pathname: '/create/complete', query },
    );
  };

  return (
    <div className="create-page">
      <Header as="h1">Create a New Coding Project Repo</Header>
      <Form>
        <Form.Field>
          <label>Project Name</label>
          <Input
            placeholder="Project Name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Short Description</label>
          <TextArea
            placeholder="Summarize in one sentence"
            value={desc}
            onChange={e => setDesc(e.currentTarget.value)}
          />
        </Form.Field>
        <Button
          size="large"
          type="submit"
          color="blue"
          onClick={onCreate}
          disabled={loading || !name || !desc}
        >
          Create Repo
        </Button>
        {error && <Message negative>{error}</Message>}
      </Form>
      <style jsx>{`
        .create-page {
          margin: 50px auto;
          max-width: 500px;
        }
        .create-page :global(h1) {
          text-align: center;
        }
        .create-page :global(form) {
          margin: 50px 0;
        }
      `}</style>
    </div>
  );
}

export default CreatePage;
