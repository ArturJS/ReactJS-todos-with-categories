import React, {PropTypes} from 'react';
import './Checkbox.scss';

const Checkbox = ({defaultValue, onChange}) => {
  return (
    <label className="chbx-cnt">
      <input type="checkbox"
             className="chbx"
             defaultChecked={defaultValue}
             onChange={(event)=>{
              onChange(event.target.checked);
             }}
      />
      <span className="chbx-img"></span>
    </label>
  );
};

Checkbox.propTypes = {
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
