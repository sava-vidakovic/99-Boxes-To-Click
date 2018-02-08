import PropTypes from 'prop-types';

const SharedPropTypes = {};

SharedPropTypes.CellPropType = {
  key: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  filled: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};


export default SharedPropTypes;
