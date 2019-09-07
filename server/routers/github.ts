import * as express from 'express';
import * as asyncRouter from 'express-router-async';
import * as rp from 'request-promise';

const router = asyncRouter();

interface GithubRepo {
  name: string;
  url: string;
}

// repos we dont want to show as a list
const EXCLUDE_REPOS = ['project-template', 'web-app'];

function extractRepoFields(repo: GithubRepo) {
  return {
    url: repo.url,
    name: repo.name,
  };
}

router.post(
  '/api/create',
  async (req: express.Request, res: express.Response) => {
    const { name, desc } = req.body;

    if (!name || !name.trim().length) {
      return res
        .status(400)
        .json({ message: 'You must give your project a name' });
    }

    let result: GithubRepo;
    try {
      result = await rp.post({
        uri:
          'https://api.github.com/repos/coding-projects-repos/project-template/generate',
        headers: {
          'User-Agent': 'Coding Projects Web App',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.baptiste-preview+json',
        },
        body: {
          name: name.trim() + '-WIP',
          description: desc,
          owner: 'coding-projects-repos',
        },
        json: true,
      });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    res.json(extractRepoFields(result));
  },
);

router.get(
  '/api/repos',
  async (req: express.Request, res: express.Response) => {
    const { includeWIP } = req.query;

    let results: Array<GithubRepo>;
    try {
      results = await rp.get({
        uri:
          'https://api.github.com/users/coding-projects-repos/repos?per_page=100',
        headers: {
          'User-Agent': 'Coding Projects Web App',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        json: true,
      });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    if (!includeWIP) {
      results = results.filter(repo => !repo.name.endsWith('-WIP'));
    }

    res.json(
      results
        .filter(repo => !EXCLUDE_REPOS.includes(repo.name))
        .map(extractRepoFields),
    );
  },
);

router.get(
  '/api/gh-limits',
  async (_: express.Request, res: express.Response) => {
    const r = await rp.get({
      uri: 'https://api.github.com/rate_limit',
      headers: {
        'User-Agent': 'Coding Projects Web App',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      json: true,
    });

    res.json(r);
  },
);

export default router;
