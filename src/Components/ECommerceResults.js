import React, { Component } from 'react'
import { Text, View, Platform ,ScrollView, Animated, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import { Icon, CheckBox } from 'native-base';
import { color } from '../Styles/Color';
import ButtonAtom from "../Atoms/ButtonAtom";
import { WOO_COMMERCE_BASE_URL, WC_KEY, WC_SECRET } from "../config/api";
import ECommerceItemAtom from '../Atoms/ECommerceItemAtom';

export default class ECommerceResults extends Component {
    async componentDidMount(){
        const category = this.props.navigation.getParam('category', 'Uncategorized');
        const oldItems = this.props.navigation.getParam('items', [] );
        console.log(oldItems);
        if (oldItems.length === 0){
            await this.setState({ loading: true, category })
        } else {
            await this.setState({ loading: true, category, oldItems: oldItems})
        }
        fetch(`${WOO_COMMERCE_BASE_URL}products?filter[product_cat]=${category}
        &_fields[]=id&_fields[]=name&_fields[]=price&_fields[]=images&${WC_KEY}&${WC_SECRET}`, {
            method: "GET"
        })
        .then((res)=> res.json())
        .then((response)=>{
            this.setState({ items: response });
        })
        .catch((error)=>{
            console.log(error);
        }).done(()=> this.setState({ loading: false }))
    }
    state = {
        items: [],
        selected: 0,
        ids: [],
        available: 'Available',
        selectedItems: [],
        loading: true,
        category: '',
        quantity: '1',
        name: '',
        price: '',
        totalPrice: 0,
        image: '',
        oldItems: []
    }

    sum = a => a.reduce((x, y) => x + y);

    checkout = async () => {
        const { name, price, quantity, selected, totalPrice, oldItems, image, selectedItems } = this.state;
        let totalAmount = this.sum(selectedItems.map(x => Number(x.price)));
        console.log(totalAmount);
        await this.setState({ totalPrice: this.state.selectedItems.length === 1 ? this.state.selectedItems[0].price : totalAmount })
        console.log(selectedItems, this.state.totalPrice);
        if (selected === 0){
            alert('Pick an option');
        } else {
            if (this.state.oldItems === [] ){
                this.props.navigation.navigate('ECommerceReview', {
                    name,
                    price,
                    quantity,
                    image,
                    id: selected,
                    totalPrice,
                    selectedItems
                })
            } else {
                this.props.navigation.navigate('ECommerceReview', {
                    name,
                    price,
                    quantity,
                    image,
                    id: selected,
                    items: oldItems,
                    totalPrice: this.state.totalPrice,
                    selectedItems
                })
            }
        }
    }

    displayList = () =>{
            if (this.state.items.length !== 0){
                return (
                    this.state.items.map((value, idx)=>{
                            return (
                                <ECommerceItemAtom
                                key={idx}
                                price={value.price}
                                image={value.images[0].src}
                                name={value.name}
                                type={"results"}
                                checked={(this.state.ids.includes(value.id)) ? true : false } 
                                onPress={(num)=>{
                                    let obj = {
                                        id: value.id,
                                        price: parseInt(value.price) * parseInt(num),
                                        name: value.name,
                                        quantity: num,
                                        image: value.images[0].src
                                    }
                                    this.setState({ 
                                        ids: [...this.state.ids, value.id], 
                                        selected: value.id, 
                                        price: value.price, 
                                        name: value.name, 
                                        quantity: '1', 
                                        image: value.images[0].src,
                                        selectedItems: [...this.state.selectedItems, obj] // this.state.selectedItems.filter((_, i) => _.id !== value.id)
                                    })
                                }}
                                onClick={()=>{
                                    this.setState({ 
                                        ids: this.state.ids.filter((_, i) => _ !== value.id), 
                                        selectedItems: this.state.selectedItems.filter((_, i) => _.id !== value.id) // this.state.selectedItems.filter((_, i) => _.id !== value.id)
                                    })
                                }}
                                />
                            )
                    })
                )
        } else if (this.state.items.length === 0 && this.state.loading === false ) {
            this.setState({ available: 'Not Available' });
            return (
                <View style={{ height: 200, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>We apologize, No Items were available on this category... Its either this or you have no internet connection</Text>
                </View>
            )
        }
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <SemiCircleAtom color={"#E6E6FA"} />
        <View>
            <Icon 
            name="ios-arrow-round-back" 
            style={{ 
                paddingTop: 30,
                paddingLeft: 21,
                paddingBottom: 0,
                fontSize: 35
            }}
            onPress={()=>
                this.props.navigation.goBack()
            }
            />
        </View>
        <View style={{ paddingHorizontal: 21, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
                <Text style={styles.label}>Selected Items</Text>
                <Text style={styles.labelValue}>{this.state.category}</Text>
            </View>
            <View>
                <Text style={styles.label}>Item</Text>
                <Text style={styles.labelValue}>{this.state.available}</Text>
            </View>
        </View>
        <View>
            <Text style={{ paddingTop: Platform.OS === 'ios' ? 21 : 11, paddingLeft: 21, fontFamily: 'Lato-Regular', fontSize: Platform.OS === 'ios' ? 14 : 12}}>Results</Text>
            <View style={styles.line} />
                {
                    this.state.loading && 
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={color.primary} size={"large"} />
                    </View>
                }
                <ScrollView style={{ height: 350 }} scrollEnabled={this.state.items.length > 0 ? true : false }>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 21, }}>
                    {
                        this.displayList()
                    }
                    </View>
                </ScrollView>
        </View>
        <View style={{ alignSelf: 'center', position: 'absolute', bottom: 10, backgroundColor: color.white }}>
            <View style={styles.delivery}>
                <Text style={styles.textBold}>Delivery Fee: </Text>
                <Text style={styles.textBold}>N 300</Text>
            </View>
            <ButtonAtom 
            style={styles.buttonContainer}
            onPress={this.checkout}
            text={'CONTINUE TO BUY'}
            normal={true}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    line: {
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        borderTopColor: "#c0c0c0",
        borderTopWidth: 1,
        marginTop: 8,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    item: {
        maxWidth: '45%',
        height: 130,
        backgroundColor: color.white,
        marginTop: 20, 
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        elevation: 3
    },
    innerView: { 
        flexDirection: 'row', 
        padding: 10, 
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'Lato-Bold',
        fontSize: Platform.OS === 'ios' ? 14 : 12
    },
    labelValue: {
        fontFamily: 'Lato-Regular',
        fontSize: Platform.OS === 'ios' ? 12 : 10
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get("window").width - 42,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: Platform.OS === 'ios' ? 25 : 23,
        height: Platform.OS === 'ios' ? 50 : 46
    },
    delivery: {
        width: Dimensions.get("window").width,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 21  
    },
    textBold: { 
        fontFamily: 'Lato-Bold', 
        fontSize: 12
    },
    text: { 
        fontFamily: 'Lato-Regular', 
        fontSize: 12,
        width: 90,
        height: 50
    },
    text1: { 
        fontFamily: 'Lato-Regular', 
        fontSize: 12
    }
})
