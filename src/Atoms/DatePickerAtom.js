import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'
import ButtonAtom from './ButtonAtom';
import moment from "moment";

const MONTH = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

export default class DatePickerAtom extends Component {
    constructor(props){
        super(props);
        this.min = new Date(+new Date + 6e5);
        this.max = new Date(new Date().setHours(17,0,0))
        this.firstMin = new Date(new Date().setHours(7,0,0))
        console.log(this.min, this.max, this.firstMin)
    }

    state = {
        date: new Date(),
        newDate: new Date(),
        newTime: new Date(+new Date + 6e5),
        maxDate: new Date(+new Date + 12096e5),
        maxTime: new Date(new Date().setHours(17,0,0)),
        
    }

  render() {
      const day = MONTH[this.state.newDate.getMonth()] + ' ' +this.state.newDate.getDate() + ', ' + this.state.newDate.getFullYear();
      const time = this.state.newTime.toLocaleTimeString();
    return (
      <View style={{ backgroundColor: 'white', width: '100%', paddingTop: 21 }}>
      <Text style={{ alignSelf: 'center', fontFamily: 'Lato-Regular', fontSize: 12 }}>
      {MONTH[this.state.newDate.getMonth()] + ' ' +this.state.newDate.getDate() + ', ' + this.state.newDate.getFullYear()}
      </Text>
        <DatePicker
        date={this.state.newDate}
        mode={'date'}
        style={{ alignSelf: 'center' }}
        minimumDate={this.state.date}
        maximumDate={this.state.maxDate}
        onDateChange={newDate =>{
            console.log(newDate.getDate(), this.state.date.getUTCDate())
            if (newDate.getDate() === this.state.date.getUTCDate()){
                this.setState({ newDate, newTime: new Date(+new Date + 6e5) })
            } else if (newDate.getDate() !== this.state.date.getUTCDate()){
                this.setState({ newDate, newTime: new Date(new Date().setHours(7,0,0))}, console.log(this.state.newTime))
            }
        }}
        />
        <Text style={{ alignSelf: 'center', fontFamily: 'Lato-Regular', fontSize: 12 }}>
        {this.state.newTime.toLocaleTimeString()}
        </Text>
        <DatePicker
        date={this.state.newTime}
        // minimumDate={}
        mode={'time'}
        onDateChange={newTime =>{ 
            let formatted = moment(newTime).format("hh:mm A");
            let todayF = moment(this.min).format("hh:mm A");
            let dayF = todayF.charAt(0) + todayF.charAt(1)
            let now = formatted.charAt(0) + formatted.charAt(1);
            console.log(parseInt(now))
            let len = moment(newTime).format("hh:mm A").length
            // this.setState({ newTime })

            if ((parseInt(now) < 7 || parseInt(now) < parseInt(dayF)) && formatted.charAt(len - 2) === 'A' && this.state.newDate.getDate() === this.state.date.getUTCDate()) {
                this.setState({ newTime: new Date(+new Date + 6e5) })
            } else if ((parseInt(now) < 7 || parseInt(now) === 12) && formatted.charAt(len - 2) === 'A' && this.state.newDate.getDate() !== this.state.date.getUTCDate()) {
                this.setState({ newTime: this.firstMin })
            } else if ((parseInt(now) > 5 || parseInt(now) < parseInt(dayF) || (parseInt(now) === 12 && parseInt(dayF) <= 5)) && formatted.charAt(len - 2) === 'P' && this.state.newDate.getDate() === this.state.date.getUTCDate()) {
                this.setState({ newTime: new Date(+new Date + 6e5) })
            } else if (parseInt(now) > 5 && formatted.charAt(len - 2) === 'P' && parseInt(now) !== 12 && this.state.newDate.getDate() !== this.state.date.getUTCDate()) {
                this.setState({ newTime: this.max })
            } else {
                this.setState({ newTime })
            }
        }}
        style={{ alignSelf: 'center' }}
        />
        <ButtonAtom 
        style={styles.buttonContainer}
        onPress={()=>{
            this.props.onPress(day, time)
        }}
        text={'CONTINUE'}
        normal={true}
        /> 
        <Text style={{ 
            alignSelf: 'center', 
            color: '#BE64FF',
            fontFamily: 'Lato-Regular', 
            fontSize: 12,
            padding: 8
        }}
        onPress={this.props.cancelSchedule}
        >CANCEL</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: '#BE64FF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#C190C7',
      borderRadius: 20,
      height: 40,
      alignSelf: 'center', 
      width: Dimensions.get('window').width - 64
    }
  });
