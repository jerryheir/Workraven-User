import React, { Component } from 'react';
import { StyleSheet, Platform, View, Dimensions, KeyboardAvoidingView, TouchableOpacity, Text, Image } from 'react-native';
import { Input, Item, Icon } from "native-base";
import { color } from '../Styles/Color';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputAtom from './InputAtom';
import ButtonAtom from './ButtonAtom';

class BookingChatAtom extends Component {
  componentDidMount(){

  }

  state = {
    disabled: false,
    color: '#BE64FF',
    value: '',
    maxWidth: null,
    height: 28, 
    phone: '',
    price: '',
    address: '',
    category: ''
  }

  onClick = () => {
    this.setState({ disabled: true, color: '#C190C7' })
  }
  updateText = (value) => {
    this.setState({ value })
  }

  static getDerivedStateFromProps(props, state){
    if (props.userData.phone !== state.phone){
        return {
            phone: props.userData.phone,
        }
    }
    if (props.currentLocate.address !== state.address){
      return {
          address: props.currentLocate.address,
      }
    }
    return null;
  }


  openConfirm = (value) => {
    if (value.price !== undefined && value.category && this.props.showBooking === 'instant') {
      return (
        <View style={{ minHeight: 390, width: '100%', backgroundColor: 'white', padding: 21 }}>
          <InputAtom
            onChangeText={category => this.setState({ category })}
            value={value.category}
            label="Service Type"
            disabled={true}
            labelFontSize={12}
            top={-7}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            label="Address"
            labelFontSize={12}
            top={-7}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            label="Phone"
            top={-7}
            labelFontSize={12}
            keyboardType={"numeric"}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={14}
          />
          <InputAtom
            onChangeText={price => this.setState({ price })}
            value={value.price}
            label="Price"
            top={-7}
            labelFontSize={12}
            disabled={true}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.props.confirm}
          text={'CONFIRM'}
          normal={true}
          disabled={false}
          />
          <Text 
          style={{ fontFamily: 'Lato-Bold', textAlign: 'center', color: color.primary, fontSize: 12, paddingVertical: 10 }}
          onPress={()=>{
            this.props.bigCancel('Cancel');
            this.onClick();
          }}
          >CANCEL</Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="MaterialCommunityIcons" name="shield" style={{ paddingTop: 3, color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>Billed Service Charge Upon Completion</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="SimpleLineIcons" name="badge" style={{ color: color.white, fontSize: 14 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>100% Satisfaction Guaranteed</Text>
            </View>
          </View>
        </View>
        </View>
      )
    } else if (value.price === undefined && value.category && this.props.showBooking === 'instant') {
      return (
        <View style={{ minHeight: 350, width: '100%', backgroundColor: 'white', padding: 21 }}>
          <InputAtom
            onChangeText={category => this.setState({ category })}
            value={value.category}
            label="Service Type"
            disabled={true}
            labelFontSize={12}
            top={-7}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            label="Address"
            top={-7}
            labelFontSize={12}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            label="Phone"
            top={-7}
            labelFontSize={12}
            keyboardType={"numeric"}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={14}
          />
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.props.confirm}
          text={'CONFIRM'}
          normal={true}
          disabled={false}
          />
          <Text 
          style={{ fontFamily: 'Lato-Bold', textAlign: 'center', color: color.primary, fontSize: 12, paddingVertical: 10 }}
          onPress={()=>{
            this.props.bigCancel('Cancel');
            this.onClick();
          }}
          >CANCEL</Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="MaterialCommunityIcons" name="shield" style={{ paddingTop: 3, color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>Billed Service Charge Upon Completion</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="SimpleLineIcons" name="badge" style={{ color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>100% Satisfaction Guaranteed</Text>
            </View>
          </View>
        </View>
        </View>
      )
    } else if (value.price !== undefined && value.category && this.props.showBooking === 'scheduled'){
      return (
        <View style={{ minHeight: 390, width: '100%', backgroundColor: 'white', padding: 21 }}>
          <InputAtom
            onChangeText={category => this.setState({ category })}
            value={value.category}
            label="Service Type"
            disabled={true}
            labelFontSize={12}
            top={-7}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            label="Address"
            labelFontSize={12}
            top={-7}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            label="Phone"
            top={-7}
            labelFontSize={12}
            keyboardType={"numeric"}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={14}
          />
          <InputAtom
            onChangeText={price => this.setState({ price })}
            value={value.price}
            label="Price"
            top={-7}
            labelFontSize={12}
            disabled={true}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
          <View style={{ 
            flex: 1,
            flexDirection: 'row', 
            justifyContent: 'center', 
            backgroundColor: '#FFF',
            height: 40,
            width: Dimensions.get('window').width - 42,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 1 },
            elevation: 1,
            marginBottom: 25
            }}>
            <View style={{ justifyContent: 'center', height: 40, flex: .42 }}>
              <Text style={{ paddingLeft: 11, fontFamily: 'Lato-Regular', fontSize: 12, color: color.black }}>{value.day}</Text>
            </View>
            <View style={{ justifyContent: 'center', height: 40, flex: .42 }}>
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.black }}>{value.time}</Text>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', height: 40, flex: .16, flexDirection: 'row' }}>
              <Icon 
              type={"FontAwesome"} 
              name={'calendar-o'} 
              style={{ color: color.primary, fontSize: 14,}}
              />
              <Text style={{ fontFamily: 'Lato-Regular', paddingLeft: 8, fontSize: 14, color: color.primary }}>Edit</Text>
            </TouchableOpacity>
          </View>
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.props.confirm}
          text={'CONFIRM'}
          normal={true}
          disabled={false}
          />
          <Text 
          style={{ fontFamily: 'Lato-Bold', textAlign: 'center', color: color.primary, fontSize: 12, paddingVertical: 10 }}
          onPress={()=>{
            this.props.bigCancel('Cancel');
            this.onClick();
          }}
          >CANCEL</Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="MaterialCommunityIcons" name="shield" style={{ paddingTop: 3, color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>Billed Service Charge Upon Completion</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="SimpleLineIcons" name="badge" style={{ color: color.white, fontSize: 14 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>100% Satisfaction Guaranteed</Text>
            </View>
          </View>
        </View>
        </View>
      )
    } else if (value.price === undefined && value.category && this.props.showBooking === 'scheduled') {
      return (
        <View style={{ minHeight: 350, width: '100%', backgroundColor: 'white', padding: 21 }}>
          <InputAtom
            onChangeText={category => this.setState({ category })}
            value={value.category}
            label="Service Type"
            disabled={true}
            labelFontSize={12}
            top={-7}
            style={{ height: 40, backgroundColor: '#F2F2F2', elevation: 1 }}
            itemStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            input={{ height: 35, backgroundColor: '#F2F2F2', fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            label="Address"
            top={-7}
            labelFontSize={12}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            label="Phone"
            top={-7}
            labelFontSize={12}
            keyboardType={"numeric"}
            style={{ height: 40, elevation: 1 }}
            itemStyle={{ height: 40 }}
            input={{ height: 35, fontSize: 14 }}
            maxLength={14}
          />
          <View style={{ 
            flex: 1,
            flexDirection: 'row', 
            justifyContent: 'center', 
            backgroundColor: '#FFF',
            height: 40,
            width: Dimensions.get('window').width - 42,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 1 },
            elevation: 1,
            marginBottom: 25
            }}>
            <View style={{ justifyContent: 'center', height: 40, flex: .42 }}>
              <Text style={{ paddingLeft: 11, fontFamily: 'Lato-Regular', fontSize: 12, color: color.black }}>{value.day}</Text>
            </View>
            <View style={{ justifyContent: 'center', height: 40, flex: .42 }}>
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, color: color.black }}>{value.time}</Text>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', height: 40, flex: .16, flexDirection: 'row' }}>
              <Icon 
              type={"FontAwesome"} 
              name={'calendar-o'} 
              style={{ color: color.primary, fontSize: 14,}}
              />
              <Text style={{ fontFamily: 'Lato-Regular', paddingLeft: 8, fontSize: 14, color: color.primary }}>Edit</Text>
            </TouchableOpacity>
          </View>
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.props.confirm}
          text={'CONFIRM'}
          normal={true}
          disabled={false}
          />
          <Text 
          style={{ fontFamily: 'Lato-Bold', textAlign: 'center', color: color.primary, fontSize: 12, paddingVertical: 10 }}
          onPress={()=>{
            this.props.bigCancel('Cancel');
            this.onClick();
          }}
          >CANCEL</Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="MaterialCommunityIcons" name="shield" style={{ paddingTop: 3, color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>Billed Service Charge Upon Completion</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'flex-start' }}>
              <View style={{ height: 22, width: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',marginRight: 4, backgroundColor: color.primary }}>
                <Icon type="SimpleLineIcons" name="badge" style={{ color: color.white, fontSize: 12 }} />
              </View>
              <Text style={{ fontSize: 11, color: color.gray, fontFamily: 'Lato-Regular' }}>100% Satisfaction Guaranteed</Text>
            </View>
          </View>
        </View>
        </View>
      )
    }
  }

  displayChat = () => {
    switch(true){
      case (this.props.type === 'raven') :
        return (
          <View style={{ 
            flexDirection: 'row',
          }}>
            <Image
            source={require('../assests/images/wrBird.png')}
            style={{ height: 25, width: 25, marginTop: 15, marginRight: 10, marginLeft: 15 }}
            />
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
                  <Text style={{ fontSize: Platform.OS === 'ios' ? 11 : 10, fontFamily: 'Lato-Regular' }}>{this.props.body}</Text>
              </View>
              {this.props.additional !== '' && 
                <View style={{ 
                  backgroundColor: '#FFF', padding: 10, margin: 8, borderRadius: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 1 },
                  elevation: 2
                }}>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: Platform.OS === 'ios' ? 11 : 10 }}>{this.props.additional}</Text>
                </View>
              }
            </View>
          </View>
        )
      case (this.props.type === 'reply' && Array.isArray(this.props.body)) :
        return (
          <View style={{ alignSelf: 'flex-end', paddingBottom: 8 }}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', maxHeight: 200, maxWidth: 320, justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 10 }}>
            {this.props.body.map((value, key)=>{
              return <TouchableOpacity disabled={this.state.disabled} style={[styles.atom, { backgroundColor: this.state.color, height: value.length > 30 ? 42 : 28 }]} key={key} onPress={
                ()=>{
                this.props.onPress(value);
                this.onClick();
              }}><Text style={[styles.paragraph, { textAlign:  value.length > 30 ? 'left' : 'center' }]}>{value}</Text></TouchableOpacity>
            })}
            </View>
          </View>
        )
      case (this.props.type === 'reply' && this.props.body === 'text-input') :
        return (
            <Item style={{ backgroundColor: 'transparent', alignSelf: 'flex-end', height: 32, borderColor: 'transparent', marginTop: 3, marginBottom: 10, marginRight: 14 }}>
              <Input 
              onChangeText={this.updateText}
              value={this.state.value}
              keyboardType={'default'}
              returnKeyType='send'
              placeholder={'   Type here'}
              placeholderTextColor={color.gray}
              onSubmitEditing={()=>{
                this.props.onPress(this.state.value);
                this.onClick();
              }}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ 
                height: 32, 
                maxWidth: '70%', 
                backgroundColor: color.white,
                fontSize: 10, 
                color: color.inputPurple,
                borderRadius: 16,
                fontFamily: 'Lato-Regular',
                borderWidth: 1, 
                borderColor: '#c0c0c0'
              }}
              // onFocus={()=> this.setState({ inputmarginBottom: 150 })}
              maxLength={50}
              />
            </Item>
        )
        case (this.props.type === 'confirm' && this.props.body === 'Cancel') :
        return (
          <View style={{ backgroundColor: 'transparent', alignSelf: 'flex-end', paddingBottom: 8 }}>
            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', maxHeight: 200, maxWidth: 320, justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 10 }}>
            <TouchableOpacity disabled={true} style={[styles.atom, { backgroundColor: '#C190C7', height: 28 }]} onPress={
                ()=>{
                this.onClick();
              }}><Text style={[styles.paragraph, { textAlign: 'center' }]}>{'Cancel'}</Text></TouchableOpacity>
            </View>
          </View>
        )
        case (this.props.type === 'confirm' && this.props.body !== 'Cancel') :
         return this.openConfirm(this.props.body)
    }
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: (this.props.type === 'confirm' && this.props.body !== 'Cancel') ? color.white : 'transparent' }]}>
        {this.displayChat()}
      </View>
    );
  }
}

BookingChatAtom.propsTypes = {
  phone: PropTypes.string.isRequired,
  showBooking: PropTypes.string,
}

const mapStateToProps = state => ({
  userData: state.fetch.userData,
  showBooking: state.fetch.showBooking, 
  currentLocate: state.fetch.currentLocate
  // address: state.fetch.gpsLocation
})

export default connect(mapStateToProps)(BookingChatAtom);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  atom: {
    margin: 3,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderRadius: 10,
    height: 28,
    backgroundColor: '#BE64FF',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  paragraph: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 11 : 10
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 21,
    height: 42
  }
});