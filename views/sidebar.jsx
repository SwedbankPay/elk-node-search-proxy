import React from 'react';
import SearchForm from './search-form';

export default (props) => {
  function sidebar() {
    if (!props || !props.sidebar) {
      console.error('No or invalid sidebar object:', props);
      return '';
    }

    const activeItem = props.sidebar.search('<li class="nav-group active">');

    return props.sidebar
      .slice(0, activeItem)
      .replace(/href="/g, 'href="https://developer.swedbankpay.com')
  };

  return (
    <div className="col-xxl-2 col-lg-3 pr-0 border-right">
      <div className="sidebar dg-sidebar">
        <nav className="sidebar-nav">
          <a href="/" className="sidebar-header ">
            <img src="https://design.swedbankpay.com/v/5.0.1/img/swedbankpay-logo-v.svg" alt="Swedbank Pay vertical logo" className="logotype-vertical logotype-lg" />
            <div className="sidebar-header-text mt-2">
              <span>{"{"}</span>developer portal<span>{"}"}</span>
            </div>
          </a>
          <SearchForm query={props.query} />

          <ul dangerouslySetInnerHTML={{ __html: sidebar() }} id="dx-sidebar-main-nav-ul" className="main-nav-ul">
          </ul>
        </nav>
      </div>
    </div>
  );
}
