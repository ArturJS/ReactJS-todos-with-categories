import React, {Component} from 'react';
import UndoRedo from './../components/Common/UndoRedo/UndoRedo.js';
import logo from '../../logo.svg';
import {connect} from 'react-redux';

import { RouteTransition } from 'react-router-transition';


import TodoFilter from './Common/TodoFilter/TodoFilter';
import ProgressBar from './Common/ProgressBar/ProgressBar';
import CategoryContainer from './Common/CategoryContainer/CategoryContainer';

function mapStateToProps(state, props) {
  return {
    pageTitle: state.pageTitle
  };
}

@connect(mapStateToProps)
export default class Shell extends Component {

  isIndexPage = () => {
    return this.props.location.pathname.indexOf('todo') === -1;
  };

  render() {
    console.log(this.props.location);

    return (
      <div className="App wh100">
        <div className="App-header">
          <UndoRedo />
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-logo-text">Welcome to React</h2>
        </div>
        <div className="App-body">
          <div className="layout-header">
            <div className="layout-subheading">
              <h2 className="page-name">
                {this.props.pageTitle}
              </h2>
              {
                this.isIndexPage() && <TodoFilter />
              }
            </div>
            {
              this.isIndexPage() && <ProgressBar />
            }
          </div>
          <div className="layout-body">
            <div className="layout-left-pane">
              <CategoryContainer />
            </div>
            <div className="layout-right-pane">
              <RouteTransition
                pathname={this.props.location.pathname}
                atEnter={{ translateX: 100 }}
                atLeave={{ translateX: -100 }}
                atActive={{ translateX: 0 }}
                mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
              >
                {this.props.children}
              </RouteTransition>

            </div>
          </div>

        </div>

      </div>
    );
  }
}
