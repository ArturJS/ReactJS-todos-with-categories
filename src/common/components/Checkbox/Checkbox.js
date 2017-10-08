import React, {PropTypes, PureComponent} from 'react';
import './Checkbox.scss';

export default class Checkbox extends PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  onChange = (event) => {
    this.props.onChange(event.target.checked);
  };
  
  render() {
    let {value} = this.props;
    
    return (
      <label className="chbx-cnt">
        <input type="checkbox"
               className="chbx"
               checked={value}
               onChange={this.onChange}
        />
        <span className="chbx-img" />
      </label>
    );
  }
}
