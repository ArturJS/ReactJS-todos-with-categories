import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import SwipeableViews from 'react-swipeable-views';

import TodosFilter from '../../components/TodosFilter';
import ProgressBar from '../../components/ProgressBar';
import Categories from '../../components/Categories';
import ModalDialog from '../../features/modals/ModalDialog';
import Header from './Header';
import './RootShell.scss';


const styles = {
  swipeableContainer:{
    width: '100%'
  },
  slideStyle: {
    display: 'flex',
    flexGrow: '1',
    overflow: 'hidden'
  }
};

function mapStateToProps(state, props) {
  return {
    editingTodoTitle: state.editingTodo.title
  };
}

@withRouter
@connect(mapStateToProps)
export default class RootShell extends PureComponent {
  isIndexPage = () => {
    return this.props.location.pathname.indexOf('todo') === -1;
  };

  render() {
    const isIndexPage = this.isIndexPage();

    return (
      <div className="root-shell">
        <Header>
          <div className="layout-subheading">
            <h2 className="page-name">
              {isIndexPage ? 'To-do list' : this.props.editingTodoTitle}
            </h2>
            {
              isIndexPage && <TodosFilter />
            }
          </div>
        </Header>
        <div className="root-shell--body">
          {
            isIndexPage && <ProgressBar />
          }
          <SwipeableViews
            className="layout-body"
            containerStyle={styles.swipeableContainer}
            slideStyle={styles.slideStyle}
          >
            <div className="layout-left-pane">
              <Categories />
            </div>
            <div className="layout-right-pane">
              {this.props.children}
            </div>
          </SwipeableViews>
        </div>
        <ModalDialog />
      </div>
    );
  }
}
