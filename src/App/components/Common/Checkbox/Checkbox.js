import React, {PropTypes, Component} from 'react';
import './Checkbox.scss';

export default class Checkbox extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };
  
  render() {
    let {value, onChange} = this.props;
    
    return (
      <label className="chbx-cnt">
        <input type="checkbox"
               className="chbx"
               checked={value}
               onChange={(event)=>{
              onChange(event.target.checked);
             }}
        />
        <span className="chbx-img" />
      </label>
    );
  }
}
