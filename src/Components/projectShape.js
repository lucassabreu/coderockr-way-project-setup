import PropTypes from 'prop-types'

const projectShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});

export default projectShape