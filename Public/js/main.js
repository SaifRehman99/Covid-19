const Search = document.querySelector("#search");

module.exports = Search.addEventListener("input", e => {
    e.preventDefault();

    return Search.value;
});