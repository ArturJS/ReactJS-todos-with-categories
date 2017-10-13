import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    location: PropTypes.object.isRequired,
    editingTodoTitle: PropTypes.string,
    children: PropTypes.any.isRequired
  };

  static childContextTypes = {
    showCategories: PropTypes.func.isRequired,
    showTodos: PropTypes.func.isRequired
  };

  state = {
    slideIndex: 0
  };

  getChildContext() {
    return {
      showCategories: this.showCategories,
      showTodos: this.showTodos
    };
  }

  showCategories = () => {
    this.setState({
      slideIndex: 0
    });
  };

  showTodos = () => {
    this.setState({
      slideIndex: 1
    });
  };

  isIndexPage = () => {
    return this.props.location.pathname.indexOf('todo') === -1;
  };

  onChangeIndex = (index) => {
    this.setState({
      slideIndex: index
    });
  };

  render() {
    const isIndexPage = this.isIndexPage();
    const {
      editingTodoTitle,
      children
    } = this.props;
    const {
      slideIndex
    } = this.state;

    return (
      <div className="root-shell">
        <Header>
          <div className="layout-subheading">
            <h2 className="page-name">
              {isIndexPage ? 'To-do list' : editingTodoTitle}
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
            index={slideIndex}
            onChangeIndex={this.onChangeIndex}
          >
            <div className="layout-left-pane">
              <Categories />
            </div>
            <div className="layout-right-pane">
              {children}
            </div>
          </SwipeableViews>
        </div>
        <ModalDialog />
      </div>
    );
  }
}
