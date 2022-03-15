import { parseProjectUpdate } from './project';

describe(`project sanitization`, () => {
  it(`\n\tGIVEN project update zod parsing \n\tWHEN complete and valid project update \n\tTHEN successful parse`, () => {
    const parsed = parseProjectUpdate({
      id: '9cde8724-0f3d-422d-818a-344eec37d886',
      createdAt: '2022-03-16T06:00:38.209Z',
      updatedAt: '2022-03-16T23:13:33.910Z',
      name: 'TEST PROJECT',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      slugId: '8f5c9d860b13',
      color: '#bec2c8',
      state: 'planned',
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      sortOrder: 203340.19,
      issueCountHistory: [],
      completedIssueCountHistory: [],
      scopeHistory: [],
      completedScopeHistory: [],
      slackNewIssue: true,
      slackIssueComments: true,
      slackIssueStatuses: true,
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
      memberIds: [],
      leadId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      startDate: '2022-03-16',
      startedAt: '2022-03-16T23:20:34.040Z',
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      id: '9cde8724-0f3d-422d-818a-344eec37d886',
      createdAt: new Date('2022-03-16T06:00:38.209Z'),
      updatedAt: new Date('2022-03-16T23:13:33.910Z'),
      color: '#bec2c8',
      completedIssueCountHistory: [],
      completedScopeHistory: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      issueCountHistory: [],
      memberIds: [],
      name: 'TEST PROJECT',
      scopeHistory: [],
      slackIssueComments: true,
      slackIssueStatuses: true,
      slackNewIssue: true,
      slugId: '8f5c9d860b13',
      sortOrder: 203340.19,
      state: 'planned',
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
      leadId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      startDate: '2022-03-16',
      startedAt: new Date('2022-03-16T23:20:34.040Z'),
    });
  });
  it(`\n\tGIVEN project update zod parsing \n\tWHEN partial and valid project update \n\tTHEN successful parse`, () => {
    const parsed = parseProjectUpdate({
      id: '9cde8724-0f3d-422d-818a-344eec37d886',
      createdAt: '2022-03-16T06:00:38.209Z',
      updatedAt: '2022-03-16T23:13:33.910Z',
      name: 'TEST PROJECT',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      slugId: '8f5c9d860b13',
      color: '#bec2c8',
      state: 'planned',
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      sortOrder: 203340.19,
      issueCountHistory: [],
      completedIssueCountHistory: [],
      scopeHistory: [],
      completedScopeHistory: [],
      slackNewIssue: true,
      slackIssueComments: true,
      slackIssueStatuses: true,
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
      memberIds: [],
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      id: '9cde8724-0f3d-422d-818a-344eec37d886',
      createdAt: new Date('2022-03-16T06:00:38.209Z'),
      updatedAt: new Date('2022-03-16T23:13:33.910Z'),
      color: '#bec2c8',
      completedIssueCountHistory: [],
      completedScopeHistory: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      issueCountHistory: [],
      memberIds: [],
      name: 'TEST PROJECT',
      scopeHistory: [],
      slackIssueComments: true,
      slackIssueStatuses: true,
      slackNewIssue: true,
      slugId: '8f5c9d860b13',
      sortOrder: 203340.19,
      state: 'planned',
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
    });
  });
  it(`\n\tGIVEN project update zod parsing \n\tWHEN invalid typed project update \n\tTHEN rejected parse`, () => {
    const parsed = parseProjectUpdate({
      id: 1, // should be a string
      createdAt: new Date('2022-03-16T06:00:38.209Z'),
      updatedAt: new Date('2022-03-16T23:13:33.910Z'),
      name: 'TEST PROJECT',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      slugId: '8f5c9d860b13',
      color: '#bec2c8',
      state: 'planned',
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      sortOrder: 203340.19,
      issueCountHistory: [],
      completedIssueCountHistory: [],
      scopeHistory: [],
      completedScopeHistory: [],
      slackNewIssue: true,
      slackIssueComments: true,
      slackIssueStatuses: true,
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
      memberIds: [],
    });
    expect(parsed.success).toBe(false);
  });
  it(`\n\tGIVEN project update zod parsing \n\tWHEN incomplete project update \n\tTHEN rejected parse`, () => {
    const parsed = parseProjectUpdate({
      // missing id
      createdAt: new Date('2022-03-16T06:00:38.209Z'),
      updatedAt: new Date('2022-03-16T23:13:33.910Z'),
      name: 'TEST PROJECT',
      description: 'e40ca3c5-6a1d-412d-95a0-281a2ce811e8',
      slugId: '8f5c9d860b13',
      color: '#bec2c8',
      state: 'planned',
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      sortOrder: 203340.19,
      issueCountHistory: [],
      completedIssueCountHistory: [],
      scopeHistory: [],
      completedScopeHistory: [],
      slackNewIssue: true,
      slackIssueComments: true,
      slackIssueStatuses: true,
      teamIds: ['3449d19c-3330-4242-be02-babac08b33c7'],
      memberIds: [],
    });
    expect(parsed.success).toBe(false);
  });
});
