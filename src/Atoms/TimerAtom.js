import React, { PureComponent, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default class TimerAtom extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            time: {}, 
            seconds: this.props.seconds, 
            percent: "0",
            text: this.props.text,
            showText: false
        };
        this.timer = 0;
    }
    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
        if (this.props.seconds === 0){
            this.setState({ showText: true })
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = async () => {
        let seconds = this.state.seconds - 1;
        let multi = await seconds * 100;
        let percent = await multi / this.props.seconds;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
            percent: percent
        });
        
        if (seconds == 0) { 
            clearInterval(this.timer);
            this.setState({ showText: true });
            if(this.props.onPress){
                this.props.onPress();
            }
        }
    }
    
    render() {
        const text = (!this.state.showText)
         ? (<Fragment>
             <Text style={{ fontFamily: "Lato-Regular", fontSize: 10 }}>
             Time left
             </Text>
             <Text style={{ fontSize: 24, fontFamily: "HindGuntur-Bold" }}>
             {'0'}:{this.state.time.m}:{this.state.time.s}
             </Text>
             </Fragment>)
         : (<Text style={{ fontFamily: "HindGuntur-Bold", fontSize: 20 }}>
            {this.state.text}
            </Text>)
    return (
        <View style={styles.container}>
            <ProgressCircle
                percent={parseInt(this.state.percent)}
                radius={100}
                borderWidth={12}
                color="#BE64FF"
                shadowColor="#F77F7F"
                bgColor="#fff"
            >
                {text}
            </ProgressCircle>
        </View>
    );
    }
}
    
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 8,
    }
});
    