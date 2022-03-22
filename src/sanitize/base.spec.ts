import { parseBasePayload } from './base';

describe(`base sanitization`, () => {
  it(`\n\tGIVEN zod base parsing \n\tWHEN complete and valid base data body received with nulled update values \n\tTHEN successful parsing`, () => {
    const parsed = parseBasePayload({
      action: 'update',
      createdAt: '2022-03-16T23:20:34.046Z',
      data: {
        // not evaluated
      },
      updatedFrom: { state: 'planned', updatedAt: '2022-03-16T23:19:26.615Z', startDate: null, startedAt: null },
      url: 'https://linear.app/mr-yum/project/test-project-change-8f5c9d860b13',
      type: 'Project',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      action: 'update',
      createdAt: new Date('2022-03-16T23:20:34.046Z'),
      updatedFrom: {
        state: 'planned',
        updatedAt: new Date('2022-03-16T23:19:26.615Z'),
      },
      url: 'https://linear.app/mr-yum/project/test-project-change-8f5c9d860b13',
      type: 'Project',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
  });
  it(`\n\tGIVEN zod base parsing \n\tWHEN partial and valid base data body received without updates \n\tTHEN successful parsing`, () => {
    const parsed = parseBasePayload({
      action: 'update',
      createdAt: '2022-03-16T23:20:34.046Z',
      data: {
        // not evaluated
      },
      //no update or url (create / delete respectively)
      type: 'Project',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      action: 'update',
      createdAt: new Date('2022-03-16T23:20:34.046Z'),
      type: 'Project',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
  });
  it(`\n\tGIVEN zod base parsing \n\tWHEN incomplete base data body received with update values \n\tTHEN failed parsing`, () => {
    const parsed = parseBasePayload({
      // missing action
      createdAt: '2022-03-16T23:20:34.046Z',
      data: {
        // not evaluated
      },
      updatedFrom: { state: 'planned', updatedAt: '2022-03-16T23:19:26.615Z', startDate: null, startedAt: null },
      url: 'https://linear.app/mr-yum/project/test-project-change-8f5c9d860b13',
      type: 'Project',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
    expect(parsed.success).toBe(false);
  });
  it(`\n\tGIVEN zod base parsing \n\tWHEN invalid types on complete base data body received with update values \n\tTHEN failed parsing`, () => {
    const parsed = parseBasePayload({
      action: 'invalid', // enum([create update remove])
      type: 'invalid', // enum([Project Issue Comment])
      createdAt: '2022-03-16T23:20:34.046Z',
      data: {
        // not evaluated
      },
      updatedFrom: { state: 'planned', updatedAt: '2022-03-16T23:19:26.615Z', startDate: null, startedAt: null },
      url: 'https://linear.app/mr-yum/project/test-project-change-8f5c9d860b13',
      organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1',
    });
    expect(parsed.success).toBe(false);
  });
});
