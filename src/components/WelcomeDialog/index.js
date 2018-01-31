import React from 'react';
import SweetAlert from 'sweetalert-react';
import swal from 'sweetalert';
import _ from 'lodash';

const WelcomeDialog = ({show, onConfirm, maxLevel, onLevelSelected, defaultLevel}) => {
  let errorMessage = '';
  if(maxLevel === defaultLevel) {
    errorMessage = `You can only play level ${defaultLevel}`;
  } else {
    errorMessage = `You can select level ${defaultLevel} to ${maxLevel}`;
  }
  return (
    <SweetAlert
      show={show}
      title="Welcome!"
      html={true}
      type="input"
      inputType="number"
      inputValue={defaultLevel.toString()} // SweetAlert, expected `string`.
      inputPlaceholder="Start level"
      onConfirm={level => {
        if (_.inRange(level, defaultLevel, maxLevel+1)) {
          onLevelSelected(parseInt(level, 10));
        } else {
          swal.showInputError(errorMessage);
        }
      }}
      text="Select Level and Try click on all available boxes! <br/> Good Luck!"
    />
  )
}

export default WelcomeDialog;
