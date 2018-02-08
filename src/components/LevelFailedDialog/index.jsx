import React from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';

const LevelFailedDialog = ({ show, onConfirm, level }) => {
  const msg = `You failed to complete level ${level} <br /> Better luck next time!`;
  const showHtml = true;
  return (
    <SweetAlert
      show={show}
      title=""
      type="warning"
      html={showHtml}
      text={msg}
      onConfirm={onConfirm}
    />
  );
};

LevelFailedDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
};

export default LevelFailedDialog;
