import React from 'react';
import DefaultLayout from './layouts/default';
import Pagination from './pagination'
import Sidebar from './sidebar'
import SearchHeader from './search-header';
import SearchResults from './search-results';

export default (props) => {
  const title = props?.queryState?.query
    ? `Search results for "${props.queryState.query}"`
    : 'Search the Swedbank Pay Developer Portal';

  return (
    <DefaultLayout title={title}>
      <Sidebar sidebar={props.sidebar} query={props.queryState.query} />
      <main className="doc-view">
        <div className="doc-container">
          <SearchHeader queryState={props.queryState} />
          <div id="search-content">
            <div className="search-results">
              <SearchResults queryState={props.queryState} />
            </div>
            <Pagination {...props} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
