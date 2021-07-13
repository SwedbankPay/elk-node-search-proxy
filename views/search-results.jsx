import React from 'react';
import SearchForm from './search-form';

function hitText(hit) {
  if (!hit || !hit.highlight || !hit.highlight.text || !Array.isArray(hit.highlight.text)) {
    console.error('No highlight text found in hit:', hit);
    return '';
  }

  return hit.highlight.text[0];
}

function hydrateHits(props) {
  const results = props?.queryState?.results;

  if (results?.hits == undefined || results?.total == undefined) {
    return {
      lead: 'Type in the query you wish to search for below.'
    };
  } else if (results.hits.length == 0) {
    return {
      lead: `No results were found for "${props.queryState.query}". Please try another search term.`
    };
  }

  return results;
}

function buildBreadcrumbs(hit) {
  const url = new URL(hit.url);
  const path = url.pathname.replace('.html', '');
  const parts = path.split('/');

  return parts
    // Filter away all empty parts:
    .filter(Boolean)
    // And join the parts back into a string separated by '›':
    .join(' › ');
}

function renderHit(hit, index) {
  const breadcrumbs = buildBreadcrumbs(hit);
  const extensionlessUrl = hit.url.replace('.html', '');

  return (
    <a key={index} href={extensionlessUrl} className="cards cards-primary search-result">
      <div className="cards-content">
        <small className="breadcrumbs">{breadcrumbs}</small>
        <span className="h3 mt-3 search-result-title">{hit.title}</span>
        <p className="mt-0 search-result-text" dangerouslySetInnerHTML={{ __html: hitText(hit) }}></p>
      </div>
      <i className="material-icons">arrow_forward</i>
    </a>
  );
}

export default (props) => {
  // const { sidebar, ...x} = props;
  // console.log('Search results:', x);

  const { hits, total, lead } = hydrateHits(props);

  if (!hits || !total) {
    return (
      <div>
        <h2>Search</h2>
        <p>{lead}</p>
        <SearchForm query={props.queryState.query} />
      </div>
    );
  }

  return hits.map(renderHit);
}
