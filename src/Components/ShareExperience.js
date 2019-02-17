import React, { Component } from 'react';
import { Text, View, Image, Dimensions, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import MapComponent from './MapComponent';
import { color } from '../Styles/Color';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Share, { ShareSheet } from 'react-native-share';
import { shuffle, GenerateRandomNumber } from '../Functions';
import { RAVEN_BIRD } from '../config/ravenBase64';
import { Icon } from "native-base";

/*const whatsappBase64 = {
  title: "React Native",
  message: "Hola mundo",
  url: RAVEN_BIRD,
  social: Share.Social.WHATSAPP
};

const facebookBase64 = {
  title: "React Native",
  message: "Hola mundo",
  url: RAVEN_BIRD,
  social: Share.Social.FACEBOOK
};

const instagramBase64 = {
  title: "React Native",
  message: "Hola mundo",
  url: RAVEN_BIRD,
  social: Share.Social.INSTAGRAM
};

const twitterBase64 = {
  title: "React Native",
  message: "Hola mundo",
  url: RAVEN_BIRD,
  social: "twitter"
};*/

let shareImageBase64 = {
  title: "React Native",
  message: "Hola mundo",
  url: RAVEN_BIRD,
  subject: "Share Link" //  for email
};

class ShareExperience extends Component {
  async componentDidMount(){
    this.gif = (
      <Image
      source={require('../assests/images/wrBird.png')}
      style={{ height: 25, width: 25, marginTop: 15, marginRight: 10, marginLeft: 15 }}
      />
    );
    const category = await this.props.navigation.getParam('category', '');
    const price = await this.props.navigation.getParam('price', '');
    const issue = await this.props.navigation.getParam('issue', '');
    let bookingId = GenerateRandomNumber(9);
    this.setState({ category, price, issue, bookingId: bookingId.toString() },
      async ()=>{
        await this.getArtisans(category);
      })
  }

  state = {
    artisans: [],
    proId: '',
    proName: '',
    accepted: false,
    latlng: {},
    bookingId: '',
    visible: false
  }

  openIt = () => {
    console.log('openIt ran');
    Share.open(shareImageBase64)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }

  onCancel = () => {
    console.log("CANCEL")
    this.setState({ visible:false });
  }
  onOpen = () => {
    console.log("OPEN")
    this.setState({ visible:true });
  }

  getArtisans = async (category) => {
    firebase.database().ref().child(`artisans/${category}`).orderByChild("neighborhood").equalTo(this.props.currentLocate.neighborhood).once("value",snapshot => {
      if (snapshot.exists()){
        const userData = Object.values(snapshot.val());
        const a = userData.filter((value)=>{
          return value.status === "available";
        })
        if (a.length > 0) {
          // this.setState({ artisans: a });
          const shuffledArray = shuffle(a);
          this.setState({ artisans: shuffledArray },
            async ()=>{
              await this.createBooking(0);
            })
        } else { this.increaseRadius() }
      } else {
        this.increaseRadius()
      }
    })
  }

  createBooking = async (i) => {
    const tempArray = await this.state.artisans,
    arrays = [],
    size = 3;
    while (tempArray.length > 0) {
      arrays.push(tempArray.splice(0, size));
    }
    console.log(arrays[i]);
      if (i < arrays.length && arrays[i] !== undefined ){
      arrays[i].forEach((value, key)=>{
        firebase.database().ref(`artisans/${this.state.category}`).orderByChild("id").equalTo(value.id).once('child_added', (snapshot) => {
            snapshot.ref.update({ status: "unavailable" })
        }).then(() => {
            firebase.database().ref('bookings/instant').push(
            {
                  userId: this.props.userIdToken.userId,
                  bookingId: this.state.bookingId,
                  proId: value.id,
                  proName: value.name,
                  status: 'create',
                  duration: '',
                  accept: false,
                  latlng: {},
                  price: this.state.price,
                  category: this.state.category,
                  issue: this.state.issue,
                  address: this.props.currentLocate.address
            })
            .then((a)=>{
              console.log(a.key);
            }).catch((error)=>{
                console.log(error);
            })
        }).catch((error)=>{
          console.log(error);
        })
      })
      i++;
     setTimeout(()=>{
        firebase.database().ref('bookings/instant/').orderByChild("bookingId").equalTo(this.state.bookingId).on('value', (snapshot) => {
          snapshot.forEach((childSnapshot)=>{
            if (childSnapshot.val().accept === false ) {
              firebase.database().ref('bookings/instant/').child(childSnapshot.key).remove().then(()=>{
                  firebase.database().ref(`artisans/${this.state.category}`).orderByChild("id").equalTo(childSnapshot.val().proId).once('child_added', (snapshot) => {
                    snapshot.ref.update({ status: "available" })
                  })
              })
              .catch((error)=>{
                console.log(error)
              })
            } else {
              const artisan = childSnapshot.val();
              this.setState({ proId: artisan.proId, proName: artisan.proName, accepted: true, latlng: artisan.latlng })
            }
          });
        })
          if (i !== arrays.length && this.state.accepted === false ){
              this.createBooking(i)
          } else if (i === arrays.length && this.state.accepted === false ){
            // write query function to search for artisans on the Lagos Mainland
          }
      }, 30000)
  }
}

  increaseRadius = () => {
    firebase.database().ref().child(`artisans/${category}`).orderByChild("admin2").equalTo(this.props.currentLocate.address.admin2).once("value",snapshot => {

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent pinkStyle={true} />
        <View style={{ 
            flexDirection: 'row',
            position: 'absolute',
            top: 21,
            left: 10,
            height: 50,
            width: '100%'
          }}>
            {this.gif}
            <View>
              <View style={{
                backgroundColor: '#FFF',
                padding: 10,
                margin: 8,
                maxWidth: 250,
                borderRadius: 10,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2
              }}>
                  <Text style={{ fontSize: 11, fontFamily: 'Lato-Regular' }}>Kindly hold on while we get you a professional.</Text>
              </View>
            </View>
          </View>
          <Image 
          source={require('../assests/images/newRaven.gif')} 
          style={{ position: 'absolute', height: 300, width: '100%', top: 150 }}
          />
          <TouchableOpacity style={{ 
              borderRadius: 14, 
              backgroundColor: color.primary, 
              height: 28, 
              width: Dimensions.get('window').width - 100, 
              alignSelf: 'center', 
              position: 'absolute', 
              bottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOpacity: 1,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2
            }}
            onPress={this.openIt}
            >
              <Text style={{ color: color.white, fontSize: 12, fontFamily: 'Lato-Regular' }}>Share your experience</Text>
          </TouchableOpacity>
          {/*<ShareSheet visible={this.state.visible} onCancel={this.onCancel}>
            <TouchableOpacity onPress={()=>Share.shareSingle(facebookBase64)}>
              <Icon type="FontAwesome" name="facebook-square" style={{ padding: 11 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Share.shareSingle(whatsappBase64)}>
              <Icon name="logo-whatsapp" style={{ padding: 11 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Share.shareSingle(instagramBase64)}>
              <Icon type="FontAwesome" name="instagram" style={{ padding: 11 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Share.shareSingle(twitterBase64)}>
              <Icon type="FontAwesome" name="twitter-square" style={{ padding: 11 }} />
            </TouchableOpacity>
          </ShareSheet>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});


ShareExperience.propsTypes = {
  currentLocate: PropTypes.object.isRequired,
  userIdToken: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  userIdToken: state.fetch.userIdToken,
  currentLocate: state.fetch.currentLocate
})

export default connect(mapStateToProps)(ShareExperience);
