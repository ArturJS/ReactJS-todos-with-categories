import React, {Component} from 'react';
import UndoRedo from './Containers/UndoRedo/UndoRedo.js';
import logo from '../../logo.svg';
import {connect} from 'react-redux';

import {RouteTransition} from 'react-router-transition';


import TodoFilter from './Containers/TodoFilter/TodoFilter';
import ProgressBar from './Containers/ProgressBar/ProgressBar';
import CategoryContainer from './Containers/Categories/Categories';

function mapStateToProps(state, props) {
  return {
    currentTodoTitle: state.currentTodo.title
  };
}

@connect(mapStateToProps)
export default class Shell extends Component {

  isIndexPage = () => {
    return this.props.location.pathname.indexOf('todo') === -1;
  };

  stylesAtEnter = () => {
    return {translateX: this.isIndexPage() ? -100 : 100};
  };

  stylesAtLeave = () => {
    return {translateX: this.isIndexPage() ? 100 : -100};
  };

  render() {
    let isIndexPage = this.isIndexPage();

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
                {isIndexPage ? 'To-do list' : this.props.currentTodoTitle}
              </h2>
              {
                isIndexPage && <TodoFilter />
              }
            </div>
            {
              isIndexPage && <ProgressBar />
            }
          </div>
          <div className="layout-body">
            <div className="layout-left-pane">
              <CategoryContainer />
            </div>
            <div className="layout-right-pane">
              <RouteTransition
                pathname={this.isIndexPage().toString()}
                atEnter={this.stylesAtEnter()}
                atLeave={this.stylesAtLeave()}
                atActive={{translateX: 0}}
                mapStyles={styles => ({transform: `translateX(${styles.translateX}%)`})}
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
