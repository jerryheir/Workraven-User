import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Platform, YellowBox, KeyboardAvoidingView } from 'react-native'
import StarRating from "react-native-star-rating";
import ReversedFlatList from 'react-native-reversed-flat-list';
import ChatAtom from '../Atoms/ChatAtom';
import JobHeaderWrapper from "./JobHeaderWrapper";
import { ratingFiveList, ratingOneTwoList, ratingThreeFourList } from '../config/data';
import { color } from '../Styles/Color';
import { BASE_URL } from '../config/api';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

YellowBox.ignoreWarnings([
    "Virtual"
])
const BOOKING_ID = "889892389";
const USER_ID = "893";
const PRO_ID = "920";

export default class Ratings extends Component {
    componentDidMount(){
        this.timer = null;
        this.timers = null;
    }
    state = {
        starCount: 0,
        rated: false,
        item: [],
        newIndex: 2,
        disabled: false,
        showButton: false,
        indeterminate: true,
        progress: 0.2,
        clicked: ''
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
        clearTimeout(this.timers);
    }

    rate = (rating) => {
        this.setState({ starCount: rating, indeterminate: false })
        this.timer = setTimeout(()=>{
            this.setState({ progress: 0.7 }, 
                ()=>{
                    this.setState({ progress: 1 })
                })
        }, 1000)
    }

    onStarRatingPress = async (rating) => {
        let firstFromList;
        let secondFromList;
        if (rating === 5){
            firstFromList = ratingFiveList[0];
            secondFromList = ratingFiveList[1];
        } else if (rating === 3 || rating === 4) {
            firstFromList = ratingThreeFourList[0];
            secondFromList = ratingThreeFourList[1];
        } else {
            firstFromList = ratingOneTwoList[0];
            secondFromList = ratingOneTwoList[1];
        }
        await this.setState({
          // starCount: rating,
          // rated: true,
          rated: true,
          disabled: true,
          item: [...this.state.item, firstFromList, secondFromList]
        });
        console.log(this.state.item)
    }

    pushFirst = async (obj, idx) => {
        if (obj !== ''){
            await this.setState({item: [...this.state.item, obj], newIndex: idx + 1 });
        } else {
            this.timers = await setTimeout(()=>this.props.navigation.navigate('Investigation'), 2500);
        }
    }

    saveInState = (value) => {
        this.setState({ clicked: value });
        this.itemList(value);
    }

    sendToApi1 = async (value) => {
        let word = this.state.clicked;
        await this.setState({ clicked: word + ' Value Inputed: ' + value })
        console.log(this.state.clicked);

        fetch(`${BASE_URL}/v1/rating`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feedback": this.state.clicked,
                "user_id": USER_ID,
                "pro_id": PRO_ID,
                "booking_id": BOOKING_ID,
                "rating": this.state.starCount,
                "type": "pro"
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((err)=>{
            console.log(err);
        })
        this.itemList(value);
    }
    
    sendToApi2 = () => {
        fetch(`${BASE_URL}/v1/rating`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feedback": this.state.clicked,
                "user_id": USER_ID,
                "pro_id": PRO_ID,
                "booking_id": BOOKING_ID,
                "rating": this.state.starCount,
                "type": "pro"
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.props.navigation.navigate('Investigation');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    itemList = async (value) => {
        console.log(value, this.state.newIndex - 1);
        let newState = Object.assign({}, this.state);
        newState.item[this.state.newIndex - 1].body = [value];
        this.setState(newState);
            let newObjectFromList;
            if (this.state.starCount === 5){
                newObjectFromList = ratingFiveList[this.state.newIndex] ? ratingFiveList[this.state.newIndex] : '';
            } else if (this.state.starCount === 3 || this.state.starCount === 4) {
                newObjectFromList = ratingThreeFourList[this.state.newIndex] ? ratingThreeFourList[this.state.newIndex] : '';
            } else {
                newObjectFromList = ratingOneTwoList[this.state.newIndex] ? ratingOneTwoList[this.state.newIndex] : '';
            }
            await this.setState({item: [...this.state.item, newObjectFromList], newIndex: this.state.newIndex + 1 });
            let nextObjectFromList;
            if (this.state.starCount === 5){
                nextObjectFromList = await ratingFiveList[this.state.newIndex] ? ratingFiveList[this.state.newIndex] : '';
            } else if (this.state.starCount === 3 || this.state.starCount === 4) {
                nextObjectFromList = await ratingThreeFourList[this.state.newIndex] ? ratingThreeFourList[this.state.newIndex] : '';
            } else {
                nextObjectFromList = await ratingOneTwoList[this.state.newIndex] ? ratingOneTwoList[this.state.newIndex] : '';
            }
            this.timers = await setTimeout(()=>this.pushFirst(nextObjectFromList, this.state.newIndex), 1000);
    }
    renderItem = ({ item }) => {
        return (
                <ChatAtom 
                body={item.body}
                type={item.type}
                additional={item.additional}
                onPress={(item.type === 'reply' && Array.isArray(item.body)) 
                ? this.saveInState :
                (item.type === 'reply' && item.body === 'text-input') ?
                this.sendToApi1 :
                (item.type === 'reply' && item.body === 'share-reply') ?
                this.sendToApi2
                : this.itemList}
                />
        );
    }  
  render() {
    if (Platform.OS === 'ios'){
        return (
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: '#FFF' }}>
                <JobHeaderWrapper
                title={"Conclude"}
                subtitle={"Please rate the Artisan's service"}
                indeterminate={this.state.indeterminate}
                progress={this.state.progress}
                remove={true}
                >
                    <View style={styles.elevatedView}>
                        <StarRating
                        disabled={false}
                        maxStars={5}
                        emptyStarColor={this.state.starCount > 0 ? '#ECFF0F' : '#c0c0c0'}
                        fullStarColor={(this.state.starCount === 1 || this.state.starCount === 2) ? '#FF5454' 
                        : (this.state.starCount === 3 || this.state.starCount === 4) ? '#ECFF0F' 
                        : '#45FA90' }
                        rating={this.state.starCount}
                        starStyle={{ marginHorizontal: 8 }}
                        selectedStar={(rating) => this.rate(rating)}
                        disabled={this.state.disabled}
                        />
                    </View>
                    {
                        !this.state.rated &&
                        <TouchableOpacity
                        style={{ 
                            width: 80, 
                            height: 35, 
                            borderRadius: 18, 
                            backgroundColor: color.white,
                            margin: 21,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            justifyContent: 'center'
                        }}
                        onPress={()=> this.onStarRatingPress(this.state.starCount)}
                        >
                            <Text style={{ color: color.primary, fontSize: 14, fontFamily: 'Lato-Regular' }}>SUBMIT</Text>
                        </TouchableOpacity>
                    }
                    {
                        this.state.rated &&
                            <ReversedFlatList
                            data={this.state.item}
                            renderItem={this.renderItem}
                            style={{ flex: 1, marginBottom: 10, paddingBottom: 10 }}
                            />
                    }
                </JobHeaderWrapper>
            </KeyboardAvoidingView>
        )
    } else {
        return (
            <KeyboardAwareScrollView
            overScrollMode='never'
            keyboardShouldPersistTaps='always'
            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
            style={{ flex: 1, backgroundColor: '#FFF' }}
            >
            <JobHeaderWrapper
            title={"Conclude"}
            subtitle={"Please rate the Artisan's service"}
            indeterminate={this.state.indeterminate}
            progress={this.state.progress}
            remove={true}
            removeClose={true}
            >
                <View style={styles.elevatedView}>
                    <StarRating
                    disabled={false}
                    maxStars={5}
                    emptyStarColor={this.state.starCount > 0 ? '#ECFF0F' : '#c0c0c0'}
                    fullStarColor={(this.state.starCount === 1 || this.state.starCount === 2) ? '#FF5454' 
                    : (this.state.starCount === 3 || this.state.starCount === 4) ? '#ECFF0F' 
                    : '#45FA90' }
                    rating={this.state.starCount}
                    starStyle={{ marginHorizontal: 8 }}
                    selectedStar={(rating) => this.rate(rating)}
                    disabled={this.state.disabled}
                    />
                </View>
                {
                    !this.state.rated &&
                    <TouchableOpacity
                    style={{ 
                        width: 80, 
                        height: 35, 
                        borderRadius: 18, 
                        backgroundColor: color.white,
                        margin: 21,
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        justifyContent: 'center'
                    }}
                    onPress={()=> this.onStarRatingPress(this.state.starCount)}
                    >
                        <Text style={{ color: color.primary, fontSize: 14, fontFamily: 'Lato-Regular' }}>SUBMIT</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.rated &&
                        <ReversedFlatList
                        data={this.state.item}
                        renderItem={this.renderItem}
                        style={{ flex: 1, marginBottom: 10, paddingBottom: 10 }}
                        />
                }
            </JobHeaderWrapper>
        </KeyboardAwareScrollView>
        )
    }
  }
}

const styles = StyleSheet.create({
    elevatedView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        backgroundColor: '#FFF',
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowOffset: { width: 5, height: 3 },
        elevation: 5,
        margin: 21,
        marginBottom: 0,
        borderRadius: 5
    },
})
