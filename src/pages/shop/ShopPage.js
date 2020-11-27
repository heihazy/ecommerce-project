import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import Collection from "../collection/Collection";
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.action';
import {firestore, convertConllectionsSnapshotToMap} from '../../firebase/firebase.utils';
class ShopPage extends React.Component {
  unsubsribeFromSnapshot = null;

  componentDidMount(){
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubsribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertConllectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
    })
  }
  render (){
    const {match} = this.props;
    return (
        <div className="shop-page">
          <Route exact path={`${match.path}`} component={CollectionsOverview} />
          <Route path={`${match.path}/:collectionId`} component={Collection} />
        </div>
    )
  }
}  

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
