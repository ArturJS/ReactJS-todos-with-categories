import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';

import CategoryForm from './CategoryForm';
import CategoryItem from './CategoryItem';
import './Categories.scss';


@withRouter
@inject('categoriesStore')
@observer
export default class Categories extends PureComponent {
  static propTypes = {
    categoriesStore: PropTypes.object.isRequired,
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
    const {rootCategories, categories} = this.props.categoriesStore;
    const {isAttachMode} = this.state;

    console.log('categories', categories.map(category => category.name));

    return (
      <div className="category-container">
        <CategoryForm />
        <div className="category-list">
          {rootCategories.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              isAttachMode={isAttachMode}
            />
          ))}
        </div>
      </div>
    );
  }
}
