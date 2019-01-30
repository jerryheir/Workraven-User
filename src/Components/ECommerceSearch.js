import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import ECommerceWrapper from './ECommerceWrapper';
import InputAtom from "../Atoms/InputAtom";
import { color } from '../Styles/Color';
import ButtonAtom from "../Atoms/ButtonAtom";
import { Icon } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

const BASE_URL = 'https://workravenshop.com/wp-json/wc/v1/products/categories?per_page=100&consumer_key=ck_5a135f03abdf28b3e6db5d925aab01a25d802ec2&consumer_secret=cs_82fdd5dd8ded6d84fd05b768508155bb79f390a1';
// const USERNAME = 'ck_5a135f03abdf28b3e6db5d925aab01a25d802ec2';
// const PASSWORD = 'cs_82fdd5dd8ded6d84fd05b768508155bb79f390a1';

export default class ECommerceSearch extends Component {
    componentDidMount(){
        this.navListener = this.props.navigation.addListener(
            'didFocus',
            async (payload) => {
                console.log(payload)
                const oldItems = this.props.navigation.getParam('items', [] );
                if (oldItems.length === 0){
                    this.setState({ value: '', confirm: '', choose: false });
                } else {
                    await this.setState({ value: '', confirm: '', choose: false, oldItems: oldItems })
                }
            }
        );
        this.setState({ loading: true })
        fetch(BASE_URL, {
            method: "GET"
        })
        .then((res)=> res.json())
        .then((response)=>{
            this.setState({ loading: false })
            response.shift();
            this.setState({ categories: response, response });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    componentWillUnmount(){
        this.navListener.remove();
    }

    state={
        value: '',
        confirm: '',
        loading: false,
        categories: [],
        response: [],
        choose: false,
        oldItems: []
    }
    select = (val) => {
        this.setState({ value: val.name, confirm: val.name, choose: true });
    }

    done = () => {
        if (this.state.value !== this.state.confirm){
            this.setState({ value: '', confirm: '', choose: false })
        } else {
            if (this.state.oldItems.length === 0) {
                this.props.navigation.navigate('ECommerceResult', { category: this.state.value });
            } else {
                this.props.navigation.navigate('ECommerceResult', { category: this.state.value, items: this.state.oldItems });
            }
        }
    }

  render() {
    let word = this.state.value;
    let result = this.state.categories.filter(cat =>
        cat.name.trim().toLowerCase().slice(0, word.trim().toLowerCase().length) === word.trim().toLowerCase()
    );
    console.log(result);
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <ECommerceWrapper 
        goBack={true}
        title={'E-Commerce'}
        subtitle={'Purchase For: ' + 'Bath Tub Repair'}
        description={'Search for items needed for the job on our workraven store...'}
        onPress={()=>this.props.navigation.goBack()}
        >
            <View style={styles.mainView}>
                <Text style={{ fontFamily: 'Lato-Regular', paddingBottom: Platform.OS === 'ios' ? 8 : 0 }}>Search on 
                <Text style={{ fontFamily: 'HindGuntur-Regular', color: color.primary }}> workravenshop.com</Text>
                </Text>
                <InputAtom 
                onChangeText={value => this.setState({ value })}
                value={this.state.value}
                style={{ height: Platform.OS === 'ios' ? 50 : 40, marginBottom: 10, paddingBottom: 10, width: Dimensions.get('window').width - 44 }}
                placeholder="e.g:'taps'"
                keyboardType="email-address"
                />
                <ScrollView style={{ minHeight: 200 }}>
                {
                    result
                    .map((val, idx)=>{
                        if (word.length > 1 && !this.state.choose && (val !== null || val !== undefined)){
                            console.log('Yes an array ran in search list')
                            return(
                                <TouchableOpacity 
                                style={styles.item} 
                                key={idx} 
                                onPress={()=>this.select(val)}
                                >
                                    <Text style={{ fontFamily: 'HindGuntur-Regular' }}>{val.name}</Text>
                                    <Icon 
                                    name="ios-arrow-forward-outline" 
                                    style={{ color: "#c0c0c0", fontSize: 21, marginTop: 5 }}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    })
                }
                {
                    (word.length > 1 && !this.state.choose && result.length === 0 && !this.state.loading) &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Lato-Regular' }}>No categories found with that word</Text>
                        </View>
                }
                </ScrollView>
                {
                    this.state.choose && 
                    <ButtonAtom 
                    style={styles.buttonContainer}
                    onPress={this.done}
                    text={'DONE'}
                    normal={true}
                    /> 
                }
            </View>
        </ECommerceWrapper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    mainView: { 
        width: Dimensions.get("window").width - 42, 
        alignSelf: 'center', 
        backgroundColor: color.white,
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        paddingTop: Platform.OS === 'ios' ? 10 : 5
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 25,
        height: 50
    },
    item: {
        height: 40,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.white,
        flexDirection: 'row',
        borderBottomColor: "#c0c0c0",
        borderBottomWidth: 1,
        marginBottom: 3,
    }
})
