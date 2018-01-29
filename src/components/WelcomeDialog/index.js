import React from 'react';
import SweetAlert from 'sweetalert-react';

const WelcomeDialog = ({show, onConfirm}) => {
  return (
    <SweetAlert
      show={show}
      title="Welcome!"
      html={true}
      text="Try click on all available boxes! <br/> Good Luck!"
      onConfirm={onConfirm}
    />
  )
}

export default WelcomeDialog;
