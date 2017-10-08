import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import CategoryForm from './CategoryForm';
import CategoryItem from './CategoryItem';
import * as categorySelectors from '../../orm/selectors/category.selectors';
import * as categoryActions from '../../orm/actions/category.actions';

function mapStateToProps(state, props) {
  return {
    categoryIds: categorySelectors.rootCategoryIds(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch)
  };
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Categories extends PureComponent {
  static propTypes = {
    categoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    isAttachMode: false
  };

  componentDidMount() {
    this.checkIsAttachMode(this.props.location);
    this.unlisten = this.props.history.listen(this.checkIsAttachMode);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  checkIsAttachMode = ({pathname}) => {
    const isAttachMode = /\/category\/[^/]+\/todo\/[^/]+/.test(pathname);

    if (this.state.isAttachMode !== isAttachMode) {
      this.setState({
        isAttachMode
      });
    }
  };

  render() {
    const {categoryIds} = this.props;
    const {isAttachMode} = this.state;

    return (
      <div className="category-container">
        <CategoryForm />
        <div className="category-list">
          {categoryIds.map(categoryId => (
            <CategoryItem
              key={categoryId}
              categoryId={categoryId}
              isAttachMode={isAttachMode}
            />
          ))}
        </div>
      </div>
    );
  }
}
