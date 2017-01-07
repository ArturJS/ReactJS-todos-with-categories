import React, {PropTypes} from 'react';
import './Checkbox.scss';

const Checkbox = ({value, onChange}) => {
  return (
    <label className="chbx-cnt">
      <input type="checkbox"
             className="chbx"
             checked={value}
             onChange={(event)=>{
              onChange(event.target.checked);
             }}
      />
      <span className="chbx-img"></span>
    </label>
  );
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
