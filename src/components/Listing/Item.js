import React, { PropTypes as T } from 'react';
import classnames from 'classnames';

import Rating from 'components/Rating/Rating';
import styles from './styles.module.css';

export class Item extends React.Component {

  onClick() {
    this.props.onClick(this.props.place);
  }

  render() {
    const {place} = this.props;
    return (
      <div
        onClick={this.onClick.bind(this)}
        className={styles.item}>
        <h1 className={classnames(styles.title)}>{place.name}</h1>
        <Rating percentage={place.rating/5} />
      </div>
    );
  }
}

export default Item;
