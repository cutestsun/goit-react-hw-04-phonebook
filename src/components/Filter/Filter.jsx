import PropTypes from 'prop-types';

export const Filter = ({ value, onFilterChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onFilterChange}
      placeholder="Search by name"
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
