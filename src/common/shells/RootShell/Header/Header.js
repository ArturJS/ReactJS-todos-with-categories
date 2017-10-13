import React, {PureComponent} from 'react';
import Collapse from 'react-collapse';
import classNames from 'classnames';

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
          <div
            className={classNames('header-hamburger hide-from-tablet', {'active': isExpanded})}
            onClick={this.toggleMenu}>
            <div className="header-hamburger-times"/>
            <div className="header-hamburger-line"/>
          </div>
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
