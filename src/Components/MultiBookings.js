import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import MultipleBookingAtom from '../Atoms/MultipleBookingAtom';
import { color } from '../Styles/Color';

export default class MultiBookings extends Component {
  state = {
    type: 'INSTANT',
    instant: [
      {
        key: '1',
        name: 'Desmond Tutu',
        category: 'Plumber',
        issue: 'Broken Pipe',
        status: 'In-Transit',
        price: '10,000'
      },
      {
        key: '2',
        name: 'Badmos Jerry',
        category: 'Generator Repair',
        issue: 'Servicing',
        status: 'On-the-job',
        price: '3,200'
      }
    ],
    scheduled: [
      {
        key: '1',
        name: 'Tosin S.',
        category: 'Electrician',
        issue: 'Broken tap and pipe',
        date: 'NOW',
        price: '2,500'
      },
      {
        key: '2',
        name: 'Bride Benny',
        category: 'Carpenter',
        issue: 'Carpenter',
        date: '27-03-2019',
        price: '4,000'
      },
      {
        key: '3',
        name: 'John Cambridge',
        category: 'Plumber',
        issue: 'Broken water heater',
        date: '28-03-2019',
        price: '2,000'
      }
    ]
  }

  renderInstant = ({ item }) => {
    return (
      <MultipleBookingAtom 
      type={'instant'}
      key={item.key}
      name={item.name}
      category={item.category}
      issue={item.issue}
      status={item.status}
      price={item.price}
      />
    )
  }

  renderScheduled = ({ item }) => {
    return (
      <MultipleBookingAtom 
      type={'scheduled'}
      key={item.key}
      name={item.name}
      category={item.category}
      issue={item.issue}
      date={item.date}
      price={item.price}
      />
    )
  }

  addInstant = () => {
    console.log('Add Instant!!!')
  }

  addScheduled = () => {
    console.log('Add Scheduled!!!')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <SemiCircleAtom />
        <TouchableOpacity style={{ 
          height: 32, 
          width: 32, 
          borderRadius: 16, 
          backgroundColor: color.white,
          position: 'absolute', 
          top: 32, 
          right: 21, 
          zIndex: 999,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 1 },
          elevation: 3
        }}
        onPress={()=>this.props.navigation.navigate('Notification')}
        >
            <NotificationIconAtom />
        </TouchableOpacity>
        <SemiCircleAtom />
        <View style={{ width: 250 }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'Lato-Regular',
            paddingTop: 42,
            paddingLeft: 21,
            paddingBottom: 8
          }}>MultiBookings</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Book a new Professional by clicking on the Raven bird (max. 3)</Text>
        </View>
        <View>
          <Text style={{ 
            color: color.primary,
            textAlign: 'right',
            padding: 21
          }}
          onPress={this.state.type === 'INSTANT' ? this.addInstant : this.addScheduled}
          >
          ADD +
          </Text>
        </View>
        <View style={{ 
          width: Dimensions.get('window').width - 42,
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: 11
         }}>
          <TouchableOpacity style={{
            width: '50%',
            borderBottomColor: this.state.type === 'INSTANT' ? color.primary : '#828282',
            borderBottomWidth: this.state.type === 'INSTANT' ? 2 : 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 11
          }}
          onPress={()=>this.setState({ type: 'INSTANT' })}
          >
            <Text style={{ 
              fontFamily: this.state.type === 'INSTANT' ? 'Lato-Bold' : 'Lato-Regular',
              fontSize: 14
            }}>
              INSTANT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: '50%',
            borderBottomColor: this.state.type === 'SCHEDULED' ? color.primary : '#828282',
            borderBottomWidth: this.state.type === 'SCHEDULED' ? 2 : 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 11
          }}
          onPress={()=>this.setState({ type: 'SCHEDULED' })}
          >
            <Text style={{ 
              fontFamily: this.state.type === 'SCHEDULED' ? 'Lato-Bold' : 'Lato-Regular',
              fontSize: 14
            }}>
              SCHEDULED
            </Text>
          </TouchableOpacity>
        </View>
        {
          this.state.type === "INSTANT" && 
          <FlatList 
          data={this.state.instant}
          renderItem={this.renderInstant}
          />
        }
        {
          this.state.type === "SCHEDULED" && 
          <FlatList 
          data={this.state.scheduled}
          renderItem={this.renderScheduled}
          />
        }
      </View>
    )
  }
}
