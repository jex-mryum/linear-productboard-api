import { parseCommentData } from '../sanitize/comment';

describe(`comment sanitization`, () => {
  it(`\n\tGIVEN zod comment parsing \n\tWHEN valid comment data body received \n\tTHEN successful parsing`, () => {
    const parsed = parseCommentData({
      id: '14039eb0-b094-447d-9ce3-5110dfd28866',
      createdAt: '2022-03-16T23:32:02.573Z',
      updatedAt: '2022-03-16T23:32:02.573Z',
      body: 'Comment on issue',
      issueId: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      userId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      issue: { id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d', title: 'Test Issue' },
      user: { id: '39c9bedd-16e7-4134-91a7-ca0c504d3725', name: 'jex@mryum.com' },
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data).toEqual({
      id: '14039eb0-b094-447d-9ce3-5110dfd28866',
      createdAt: '2022-03-16T23:32:02.573Z',
      updatedAt: '2022-03-16T23:32:02.573Z',
      body: 'Comment on issue',
      issueId: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      userId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
      issue: { id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d', title: 'Test Issue' },
      user: {
        id: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
        name: 'jex@mryum.com',
      },
    });
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN invalid comment data body received \n\tTHEN rejected parsing`, () => {
    const parsed = parseCommentData({
      id: '14039eb0-b094-447d-9ce3-5110dfd28866',
      createdAt: '2022-03-16T23:32:02.573Z',
      updatedAt: '2022-03-16T23:32:02.573Z',
      body: 'Comment on issue',
      issueId: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      userId: 1, // INVALID
      issue: { id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d', title: 'Test Issue' },
      user: { id: '39c9bedd-16e7-4134-91a7-ca0c504d3725', name: 'jex@mryum.com' },
    });
    expect(parsed.success).toBe(false);
  });
  it(`\n\tGIVEN zod comment parsing \n\tWHEN partial comment data body received \n\tTHEN rejected parsing`, () => {
    const parsed = parseCommentData({
      id: '14039eb0-b094-447d-9ce3-5110dfd28866',
      createdAt: '2022-03-16T23:32:02.573Z',
      updatedAt: '2022-03-16T23:32:02.573Z',
      body: 'Comment on issue',
      issueId: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d',
      // userId missing
      issue: { id: '8b0b1cdb-383a-4ed6-9f6c-5577657a253d', title: 'Test Issue' },
      user: { id: '39c9bedd-16e7-4134-91a7-ca0c504d3725', name: 'jex@mryum.com' },
    });
    expect(parsed.success).toBe(false);
  });
});
