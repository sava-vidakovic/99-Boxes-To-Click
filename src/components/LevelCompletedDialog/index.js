import React from 'react';
import SweetAlert from 'sweetalert-react';

const LevelCompletedDialog = ({show, onConfirm, level}) => {
  const msg = `You have completed level ${level}`;
  return (
    <SweetAlert
      show={show}
      title={msg}
      type="success"
      text="Get ready for next level!"
      onConfirm={onConfirm}
    />
  )
}

export default LevelCompletedDialog;
