import React from 'react';
import SweetAlert from 'sweetalert-react';

const LevelFailedDialog = ({show, onConfirm, level}) => {
  const msg = `You failed to complete level ${level} <br /> Better luck next time!`
  return (
    <SweetAlert
      show={show}
      title="Fail"
      html={true}
      text={msg}
      onConfirm={onConfirm}
    />
  )
}

export default LevelFailedDialog;
