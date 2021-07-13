import React from 'react';

export default (props) => {
  return (
    <form className="search-form mx-2 my-4 px-3 py-2 d-flex" method="get" action="/">
      <input
        name="q"
        type="text"
        className="search-input w-100"
        placeholder="Search in documentation"
        onFocus="this.placeholder=''"
        onBlur="this.placeholder='Search in documentation'"
        required
        pattern=".{3,}"
        title="At least 3 characters"
        defaultValue={props.query} />
      <button className="submit-form-btn mb-0">
        <i className="material-icons m-0" aria-hidden="true">search</i>
      </button>
    </form>
  );
}
