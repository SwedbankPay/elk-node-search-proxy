const React = require('react');

module.exports = (props) => {
  const isIndex = props.query == null;
  let searchHeaderTitle;
  let resultsLead = '';

  if (isIndex) {
    searchHeaderTitle = "Search the Developer Portal";
  } else {
    searchHeaderTitle = `Results for \"${props.query}\"`;
    resultsLead = `${props.results.total} results found`;
  }

  return (
    <div className="search-header">
      <div className="doc-container py-5">
        <p className="mb-0">Developer Portal</p>
        <h1 className="my-2">{searchHeaderTitle}</h1>
        <small className="total-results">{resultsLead}</small>
      </div>
    </div>
  );
}
