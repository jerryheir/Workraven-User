import React from "react";
import { 
    Platform,
    ScrollView, 
    Dimensions, 
    View,
    StyleSheet,
    Alert
 } from "react-native";
import { color } from "../Styles/Color";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import ImageAtom from "../Atoms/ImageAtom";
import { storeItem, retrieveItem } from '../Functions';
import { BASE_URL } from '../config/api';

class EditProfile extends React.Component {
    async componentDidMount() {
        const userId = await retrieveItem('userId');
        const token = await retrieveItem('encoded'); 
        const pic = await retrieveItem('imageUrl');
        if (pic !== null) {
          this.setState({ pic: pic });
        } else {
          this.setState({ pic: '' });
        }


        fetch(`${BASE_URL}/v1/users/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-user-token': token
          }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({ 
                firstName: responseJson.data.firstname,
                lastName: responseJson.data.lastname,
                address: responseJson.data.address,
                email: responseJson.data.email,
                pic: responseJson.data.image_url === '' ? '' : responseJson.data.image_url === null ? '' : responseJson.data.image_url 
            });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    state = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        pic: ''
    }
  
  handleSubmit = async () => {
    const token = await retrieveItem('encoded');
    const userId = await retrieveItem('userId');
    const { firstName, lastName, address } = this.state;
    const pic = await retrieveItem('imageUrl');

    const body = (pic === null) ? {
      firstname: firstName,
      lastname: lastName,
      address: address
    } : {
      firstname: firstName,
      lastname: lastName,
      address: address,
      image_url: pic
    };
    if (firstName.length === 0 || lastName.length === 0 || address.length === 0) {
      return Alert.alert('All fields are required')
    } else {
      fetch(`${BASE_URL}/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-user-token': token
            },
            body: JSON.stringify(body),
          }) .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status === 'success') {
              storeItem('firstname', firstName);
              this.props.navigation.state.params.returnData( pic, firstName, lastName );
              this.props.navigation.goBack();
            } else {
              console.log(responseJson);
              Alert.alert('An error occured, please try again');
            }
          })
          .catch((error) => {
            console.log(error);
            this.refs.toast.show('Error');
          })
    }
  }
    render(){
        return (
            <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
                <ImageAtom navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 42, justifyContent: 'space-between'}}>
                        <InputAtom
                        onChangeText={firstName => this.setState({ firstName })}
                        value={this.state.firstName}
                        label="First Name"
                        keyboardType="default"
                        style={{width: '46%' }}
                        itemStyle={{ width: '46%' }}
                        />
                        <InputAtom
                        onChangeText={lastName => this.setState({ lastName })}
                        value={this.state.lastName}
                        label="Last Name"
                        keyboardType="default"
                        style={{width: '46%' }}
                        itemStyle={{ width: '46%' }}
                        />
                    </View>
                        <InputAtom
                        onChangeText={address => this.setState({ address })}
                        value={this.state.address}
                        label="Address"
                        keyboardType="default"
                        />
                        <InputAtom
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        label="Email"
                        keyboardType="email-address"
                        disabledItem={true}
                        disabled={true}
                        style={{ backgroundColor: '#F2F2F2'}}
                        />
                        <ButtonAtom
                        style={styles.buttonContainer}
                        onPress={this.handleSubmit}
                        text={'UPDATE'}
                        normal={true}
                        />
                </View>
            </ScrollView>
        );
    }
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 15,
      paddingBottom: 10,
      width: Dimensions.get('window').width - 42,
      alignSelf: 'center',
      backgroundColor: 'white',
      marginTop: 29
    },
    buttonContainer: {
      backgroundColor: '#BE64FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Platform.OS === 'android' ? 10 : 0,
      borderWidth: 1,
      borderColor: '#C190C7',
      borderRadius: 25,
      height: 50
    },
    imageBackground: {
        width: '100%',
        height: 226,
        paddingTop: 20
    },
    viewPad: {
        flex: 1,
        paddingLeft: 21,
        paddingRight: 21,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fab: {
        position: "absolute",
        top: 200,
        right: 30,
        height: 52,
        width: 52,
        borderRadius: 27,
        backgroundColor: color.white,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
    }
});
