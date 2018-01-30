import React from 'react';
import SweetAlert from 'sweetalert-react';

const GameOverDialog = ({show, onConfirm}) => {
  return (
    <SweetAlert
      show={show}
      title="Game Over"
      text="Better luck next time!"
      onConfirm={onConfirm}
    />
  )
}

export default GameOverDialog;
