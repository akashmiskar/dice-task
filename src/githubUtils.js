// githubUtils.js
import { Octokit } from '@octokit/core';

const octokit = new Octokit();

export async function searchRepositories(token, query) {
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: query,
      headers: {
        authorization: `token ${token}`,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error searching repositories:', error.message);
    return [];
  }
}
