import React, { PropTypes as T } from 'react';
import classnames from 'classnames';

import Item from './Item';
import styles from './styles.module.css';

export class Listing extends React.Component {
  render() {
    return (
      <div className={classnames(styles.container)}>
      {this.props.places.map(place => {
        return (
          <Item place={place}
                onClick={this.props.onClick}
                key={place.id} />
        );
      })}
      </div>
    );
  }
}

Listing.propTypes = {
  places: T.array.isRequired,
  onClick: T.func
};

Listing.defaultProps = {
  onClick: () => {}
};

export default Listing;
