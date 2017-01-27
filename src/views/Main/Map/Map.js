import React, { PropTypes as T } from 'react';
import classnames from 'classnames';
import Map, { Marker } from 'google-maps-react';

import styles from './styles.module.css';

export class MapComponent extends React.Component {
  _renderMarkers() {
    if (!this.props.places) {
      return null;
    }

    return this.props.places.map(place =>{
      return <Marker key={place.id}
                name={place.id}
                place={place}
                onClick={this.props.showDetailView.bind(this)}
                position={place.geometry.location}
              />;
    });
  }

  _renderChildren() {
    const {children} = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        });
      });
    } else {
      return this._renderMarkers();
    }
  }


  render() {
    const {children} = this.props;

    return (
      <Map
        google={this.props.google}
        className={styles.map}
        visible={!children || React.Children.count(children) == 0}
      >
        {this._renderChildren()}
      </Map>
    );
  }
}

export default MapComponent;
