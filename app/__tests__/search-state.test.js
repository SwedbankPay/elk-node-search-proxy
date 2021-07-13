import QueryState from '../query-state.js';

describe(QueryState, () => {
  test("empty returns instance", () => {
    expect(new QueryState({})).toBeInstanceOf(QueryState);
  });

  test("no query returns defaults", () => {
    const req = {};
    const queryState = new QueryState(req);

    expect(queryState.page).toBe(0);
    expect(queryState.size).toBe(5);
    expect(queryState.originalUrl).toBe(undefined);
    expect(queryState.results).toBe(null);
    expect(queryState.query).toBe(undefined);
    expect(queryState.startIndex).toBe(undefined);
    expect(queryState.elasticQuery).toBe(undefined);
  });

  test("query returns values", () => {
    const req = {
      originalUrl: 'http://example.com/',
      query: {
        page: 1,
        size: 10,
        q: 'payment url'
      }
    };
    const queryState = new QueryState(req);

    expect(queryState.page).toBe(req.query.page);
    expect(queryState.size).toBe(req.query.size);
    expect(queryState.originalUrl).toBe(req.originalUrl);
    expect(queryState.results).toBe(null);
    expect(queryState.query).toBe(req.query.q);
    expect(queryState.startIndex).toBe(req.query.size * req.query.page);
    expect(queryState.elasticQuery).toBe('payment~1 url~1');
  });
});
