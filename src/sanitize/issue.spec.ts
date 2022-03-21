import { parseIssueData } from '../sanitize/issue';

describe(`issue sanitization`, () => {
  it(`\n\tGIVEN zod comment parsing \n\tWHEN complete valid issue data body received \n\tTHEN successful parsing`, () => {
    const parsed = parseIssueData({
      id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      createdAt: '2022-03-16T23:25:39.330Z',
      updatedAt: '2022-03-16T23:40:31.518Z',
      archivedAt: '2022-03-17T00:15:37.254Z',
      number: 24,
      title: 'Test Issue',
      description: 'Edit description',
      priority: 0,
      boardOrder: 0,
      sortOrder: -897.33,
      startedAt: '2022-03-16T23:30:44.744Z',
      trashed: true,
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      cycleId: 'a829e97a-77b7-4423-815a-8ac99e86a35c',
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      previousIdentifiers: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      assigneeId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      stateId: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
      priorityLabel: 'No priority',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      labelIds: [],
      assignee: { id: '39c9bedd-16e7-4134-91a7-ca0c504d3725', name: 'jex@mryum.com' },
      project: { id: '9cde8724-0f3d-422d-818a-344eec37d886', name: 'TEST PROJECT - Change' },
      cycle: {
        id: 'a829e97a-77b7-4423-815a-8ac99e86a35c',
        number: 2,
        name: 'Cycle 22',
        startsAt: '2022-03-13T13:00:00.000Z',
        endsAt: '2022-03-27T13:00:00.000Z',
      },
      state: {
        id: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
        name: 'In Progress',
        color: '#f2c94c',
        type: 'started',
      },
      team: { id: '3449d19c-3330-4242-be02-babac08b33c7', name: 'Internal Development', key: 'IDEV' },
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      archivedAt: new Date(`2022-03-17T00:15:37.254Z`),
      assignee: {
        id: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
        name: 'jex@mryum.com',
      },
      assigneeId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      boardOrder: 0,
      createdAt: new Date(`2022-03-16T23:25:39.330Z`),
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      cycle: {
        endsAt: new Date(`2022-03-27T13:00:00.000Z`),
        id: 'a829e97a-77b7-4423-815a-8ac99e86a35c',
        name: 'Cycle 22',
        number: 2,
        startsAt: new Date(`2022-03-13T13:00:00.000Z`),
      },
      cycleId: 'a829e97a-77b7-4423-815a-8ac99e86a35c',
      description: 'Edit description',
      id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      labelIds: [],
      number: 24,
      previousIdentifiers: [],
      priority: 0,
      priorityLabel: 'No priority',
      project: {
        id: '9cde8724-0f3d-422d-818a-344eec37d886',
        name: 'TEST PROJECT - Change',
      },
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      sortOrder: -897.33,
      startedAt: new Date(`2022-03-16T23:30:44.744Z`),
      state: {
        color: '#f2c94c',
        id: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
        name: 'In Progress',
        type: 'started',
      },
      stateId: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      team: {
        id: '3449d19c-3330-4242-be02-babac08b33c7',
        key: 'IDEV',
        name: 'Internal Development',
      },
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      title: 'Test Issue',
      trashed: true,
      updatedAt: new Date(`2022-03-16T23:40:31.518Z`),
    });
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN partial valid issue data body received \n\tTHEN successful parsing`, () => {
    const parsed = parseIssueData({
      id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      createdAt: '2022-03-16T23:25:39.330Z',
      updatedAt: '2022-03-16T23:40:31.518Z',
      number: 24,
      title: 'Test Issue',
      priority: 0,
      boardOrder: 0,
      sortOrder: -897.33,
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      previousIdentifiers: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      stateId: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
      priorityLabel: 'No priority',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      labelIds: [],
      project: { id: '9cde8724-0f3d-422d-818a-344eec37d886', name: 'TEST PROJECT - Change' },
      state: {
        id: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
        name: 'In Progress',
        color: '#f2c94c',
        type: 'started',
      },
      team: { id: '3449d19c-3330-4242-be02-babac08b33c7', name: 'Internal Development', key: 'IDEV' },
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      boardOrder: 0,
      createdAt: new Date(`2022-03-16T23:25:39.330Z`),
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      labelIds: [],
      number: 24,
      previousIdentifiers: [],
      priority: 0,
      priorityLabel: 'No priority',
      project: {
        id: '9cde8724-0f3d-422d-818a-344eec37d886',
        name: 'TEST PROJECT - Change',
      },
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      sortOrder: -897.33,
      state: {
        color: '#f2c94c',
        id: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
        name: 'In Progress',
        type: 'started',
      },
      stateId: '97e60ab8-f6b0-42c7-b60b-6b1aadd32d4b',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      team: {
        id: '3449d19c-3330-4242-be02-babac08b33c7',
        key: 'IDEV',
        name: 'Internal Development',
      },
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      title: 'Test Issue',
      updatedAt: new Date(`2022-03-16T23:40:31.518Z`),
    });
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN invalid issue data body received \n\tTHEN rejected parsing`, () => {
    const parsed = parseIssueData({
      id: true, // should be string
      createdAt: '2022-03-16T23:25:39.330Z',
      updatedAt: '2022-03-16T23:25:39.330Z',
      number: 24,
      title: 'Test Issue',
      priority: 0,
      boardOrder: 0,
      sortOrder: -7308.47,
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      previousIdentifiers: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      stateId: '39b492b8-4894-45d5-ad94-2b7821c01a07',
      priorityLabel: 'No priority',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      labelIds: [],
      project: { id: '9cde8724-0f3d-422d-818a-344eec37d886', name: 'TEST PROJECT - Change' },
      state: { id: '39b492b8-4894-45d5-ad94-2b7821c01a07', name: 'Backlog', color: '#bec2c8', type: 'backlog' },
      team: { id: '3449d19c-3330-4242-be02-babac08b33c7', name: 'Internal Development', key: 'IDEV' },
    });
    expect(parsed.success).toBe(false);
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN invalid partial issue data body received \n\tTHEN rejected parsing`, () => {
    const parsed = parseIssueData({
      id: 1, // should be string uuid
      createdAt: '2022-03-16T23:25:39.330Z',
      updatedAt: '2022-03-16T23:25:39.330Z',
      number: 24,
      title: 'Test Issue',
      priority: 0,
      boardOrder: 0,
      sortOrder: -7308.47,
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      previousIdentifiers: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      stateId: '39b492b8-4894-45d5-ad94-2b7821c01a07',
      priorityLabel: 'No priority',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      labelIds: [],
      project: { id: '9cde8724-0f3d-422d-818a-344eec37d886', name: 'TEST PROJECT - Change' },
      state: { id: '39b492b8-4894-45d5-ad94-2b7821c01a07', name: 'Backlog', color: '#bec2c8', type: 'backlog' },
      team: { id: '3449d19c-3330-4242-be02-babac08b33c7', name: 'Internal Development', key: 'IDEV' },
    });
    expect(parsed.success).toBe(false);
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN complete invalid issue data body (type error) received \n\tTHEN rejected parsing`, () => {
    const parsed = parseIssueData({
      //missing id - required field
      createdAt: '2022-03-16T23:25:39.330Z',
      updatedAt: '2022-03-16T23:25:39.330Z',
      number: 24,
      title: 'Test Issue',
      priority: 0,
      boardOrder: 0,
      sortOrder: -7308.47,
      teamId: '3449d19c-3330-4242-be02-babac08b33c7',
      projectId: '9cde8724-0f3d-422d-818a-344eec37d886',
      previousIdentifiers: [],
      creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      stateId: '39b492b8-4894-45d5-ad94-2b7821c01a07',
      priorityLabel: 'No priority',
      subscriberIds: ['39c9bedd-16e7-4134-91a7-ca0c504d3725'],
      labelIds: [],
      project: { id: '9cde8724-0f3d-422d-818a-344eec37d886', name: 'TEST PROJECT - Change' },
      state: { id: '39b492b8-4894-45d5-ad94-2b7821c01a07', name: 'Backlog', color: '#bec2c8', type: 'backlog' },
      team: { id: '3449d19c-3330-4242-be02-babac08b33c7', name: 'Internal Development', key: 'IDEV' },
    });
    expect(parsed.success).toBe(false);
  });
});
