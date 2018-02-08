import React from 'react';
import SweetAlert from 'sweetalert-react';
import swal from 'sweetalert';
import _ from 'lodash';
import PropTypes from 'prop-types';

const getLevelMessage = (maxLevel, defaultLevel) => {
  let levelMessage = '';
  if (maxLevel === defaultLevel) {
    levelMessage = `You can start from level ${defaultLevel}`;
  } else {
    levelMessage = `You can pick levels from ${defaultLevel} to ${maxLevel}.`;
  }
  return levelMessage;
};

const WelcomeDialog = ({
  show,
  maxLevel,
  onLevelSelected,
  defaultLevel,
}) => {
  const levelMessage = getLevelMessage(maxLevel, defaultLevel);
  const welcomeMessage = `Select Level and try click on all available boxes! 
                          <br /> 
                          ${levelMessage} <br />
                          Good Luck!`;

  const showHtml = true;
  return (
    <SweetAlert
      show={show}
      title=""
      html={showHtml}
      type="input"
      inputType="number"
      inputValue={defaultLevel.toString()} // SweetAlert, expected `string`.
      inputPlaceholder="Start level"
      onConfirm={(level) => {
        if (_.inRange(level, defaultLevel, maxLevel + 1)) {
          onLevelSelected(parseInt(level, 10));
        } else {
          swal.showInputError(levelMessage);
        }
      }}
      text={welcomeMessage}
    />
  );
};

WelcomeDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onLevelSelected: PropTypes.func.isRequired,
  defaultLevel: PropTypes.number.isRequired,
  maxLevel: PropTypes.number.isRequired,
};

export default WelcomeDialog;
