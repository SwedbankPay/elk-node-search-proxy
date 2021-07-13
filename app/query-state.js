class QueryState {
  constructor(req) {
    this.page = 0;
    this.size = 5;
    this.originalUrl = req.originalUrl;
    this.results = null;

    if (req.query != null) {
      this.page = req.query.page || this.page;
      this.size = req.query.size || this.size;
      this.query = req.query.q;
      this.startIndex = req.query.page > 0 ? req.query.size * req.query.page : 0;
      this.elasticQuery = this.query
        ? this.query.trim().split(' ').map(x => `${x}~1`).join(' ')
        : null;
    }
  }
}

export default QueryState;
