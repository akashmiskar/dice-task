// githubUtils.js
import { Octokit } from '@octokit/core';

const octokit = new Octokit();

export async function searchRepositories( query) {
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: query,
      headers: {
        authorization: `token ${'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'}`,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error searching repositories:', error.message);
    return [];
  }
}
