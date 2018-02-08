import React from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';

const LevelCompletedDialog = ({ show, onConfirm, level }) => {
  const msg = `You have completed level ${level}`;
  return (
    <SweetAlert
      show={show}
      title={msg}
      type="success"
      text="Get ready for next level!"
      onConfirm={onConfirm}
    />
  );
};

LevelCompletedDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
};

export default LevelCompletedDialog;
