import React from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';

const GameOverDialog = ({ show, onConfirm }) => (
  <SweetAlert
    show={show}
    title="Game Over"
    type="error"
    text="Better luck next time!"
    onConfirm={onConfirm}
  />
);


GameOverDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default GameOverDialog;
