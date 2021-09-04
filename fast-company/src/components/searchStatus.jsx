const renderPhrase = (number) => {
  if (number === 0) {
    return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
  }

  const countString =
    number === 1 ? "1 человек тусанёт" : `${number} человек тусанут`;

  return <span className="badge bg-info">{countString} с тобой чегодня</span>;
};

const SearchStatus = ({ totalItems }) => {
  return <h1>{renderPhrase(totalItems)}</h1>;
};

export default SearchStatus;
