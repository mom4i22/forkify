class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const searchFieldValue =
      this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return searchFieldValue;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
