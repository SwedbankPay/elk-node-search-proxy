import React from 'react';

export default (props) => {
  if (props.queryState == null) {
    return null;
  }

  const { total, current_page, size, originalUrl } = props
  const total_pages = Math.ceil(total / size)
  const url = originalUrl
    ? originalUrl.includes("page=")
      ? originalUrl.slice(0, -1)
      : originalUrl + '&page='
    : ''

  const previousPage = current_page != 0 ? url + (Number(current_page) - 1) : ''
  const nextPage = current_page != total_pages - 1 ? url + (Number(current_page) + 1) : ''

  const pagination = []

  for (let i = 0; i < total_pages; i++) (
    pagination.push(<a href={url + i} className={`btn btn-primary btn-sm m-1
            ${Number(current_page) === i
        ? 'current-page' : ''}`}>
      {i + 1}</a>)
  )

  return (
    <div className="search-pagination">
      <a href={previousPage} className={`btn btn-primary btn-sm m-1 ${current_page == 0 ? 'disabled' : ''}`}>Prev</a>
      {pagination}
      <a href={nextPage} className={`btn btn-primary btn-sm m-1 ${current_page == total_pages - 1 ? 'disabled' : ''}`}>Next</a>
    </div>
  );
};
