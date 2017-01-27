import React from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import {searchNearby} from 'utils/googleApiHelpers';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';

export class Container extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    };
  }

  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    };

    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        });
      }).catch((status, result) => {
        // There was an error
      });
  }

  showDetailView(item) {
    const {push} = this.context.router;
    const {place} = item;
    push(`/map/detail/${place.place_id}`);
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = this.props.children;
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          showDetailView: this.showDetailView.bind(this)
        }
      );
    }
    return (
      <div>
        <Map
          onReady={this.onReady.bind(this)}
          google={this.props.google}
          visible={false}
          className={styles.wrapper}>

          <Header />
          <Sidebar
            title={'Restaurants'}
            places={this.state.places}
            onListItemClick={this.showDetailView.bind(this)} />
          <div className={styles.content}>
            {children}
          </div>
        </Map>
      </div>
    );
  }
}

Container.contextTypes = {
  router: React.PropTypes.object
};

export default GoogleApiWrapper({
  version: '3.exp',
  apiKey: __GAPI_KEY__
})(Container);
