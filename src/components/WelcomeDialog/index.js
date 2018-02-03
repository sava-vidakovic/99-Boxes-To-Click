import React from 'react';
import SweetAlert from 'sweetalert-react';
import swal from 'sweetalert';
import _ from 'lodash';

const WelcomeDialog = ({show, onConfirm, maxLevel, onLevelSelected, defaultLevel}) => {
  let levelMessage = '';
  if(maxLevel === defaultLevel) {
    levelMessage = `You can start from level ${defaultLevel}`;
  } else {
    levelMessage = `You can pick levels from ${defaultLevel} to ${maxLevel}.`;
  }

  const welcomeMessage = `Select Level and try click on all available boxes! 
                          <br /> 
                          ${levelMessage} <br />
                          Good Luck!`;

  return (
    <SweetAlert
      show={show}
      title=""
      html={true}
      type="input"
      inputType="number"
      inputValue={defaultLevel.toString()} // SweetAlert, expected `string`.
      inputPlaceholder="Start level"
      onConfirm={level => {
        if (_.inRange(level, defaultLevel, maxLevel+1)) {
          onLevelSelected(parseInt(level, 10));
        } else {
          swal.showInputError(levelMessage);
        }
      }}
      text={welcomeMessage}
    />
  )
}

export default WelcomeDialog;
