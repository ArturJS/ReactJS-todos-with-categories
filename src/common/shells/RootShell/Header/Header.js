import React, {PureComponent} from 'react';
import Collapse from 'react-collapse';

import logo from '../../../../logo.svg';
import UndoRedo from '../../../components/UndoRedo';
import './Header.scss';

export default class Header extends PureComponent {
  state = {
    isExpanded: false
  };

  toggleMenu = () => {
    this.setState(({isExpanded}) => ({
      isExpanded: !isExpanded
    }));
  };

  render() {
    const {children} = this.props;
    const {isExpanded} = this.state;

    return (
      <div className="header">
        <div className="header-content">
          <UndoRedo />
          <img src={logo} className="App-logo hide-till-tablet" alt="logo"/>
          <h2 className="App-logo-text hide-till-tablet">Welcome to React</h2>
          <i
            className="glyphicon glyphicon-menu-hamburger header-menu-toggle hide-from-tablet"
            onClick={this.toggleMenu}/>
        </div>
        <Collapse
          className="header-menu"
          isOpened={isExpanded}
          keepCollapsedContent={true}>
          <div className="header-menu-content">
            {children}
          </div>
        </Collapse>
      </div>
    );
  }
}
