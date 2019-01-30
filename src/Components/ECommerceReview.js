import React, { Component } from 'react'
import { Text, View, Platform, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import ECommerceWrapper from './ECommerceWrapper';
import { color } from '../Styles/Color';
import ButtonAtom from "../Atoms/ButtonAtom";
import ECommerceItemAtom from '../Atoms/ECommerceItemAtom';
import { WOO_COMMERCE_BASE_URL, WC_KEY, WC_SECRET } from "../config/api";

const NAME = "Jerry";
const SURNAME = "Nwaeze";
const ADDRESS_ONE = "161 Muyibi Street, Lagos";
const CITY = "Sabo yaba";
const STATE = "LA";
const POST_CODE = "101001";
const EMAIL = "jerry@karixchange.com";
const PHONE = "09053643784";

const { height, width } = Dimensions.get('window');

class Modal extends React.PureComponent {
    render(){
        return (
                <View style={{ backgroundColor: color.white, height: 100, width: 100, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={color.primary} size={"large"} />
                </View>
        );
    }
}

export default class ECommerceReview extends Component {
    async componentDidMount(){
        const name = this.props.navigation.getParam('name', 'NO NAME');
        const price = this.props.navigation.getParam('price', '0');
        const image = this.props.navigation.getParam('image', 'https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20170219125728');
        const quantity = this.props.navigation.getParam('quantity', '1');
        const id = this.props.navigation.getParam('id', 'NO ID');
        const oldItems = this.props.navigation.getParam('items', [] );
        const selectedItems = this.props.navigation.getParam('selectedItems', [] );
        const totalPrice = this.props.navigation.getParam('totalPrice', 0 );

        if (oldItems.length === 0) {
            await this.setState({ items: selectedItems, price: totalPrice });
        } else {
            await this.setState({ oldItems, selectedItems });
            await this.setState({ items: [...this.state.oldItems, ...this.state.selectedItems]},
                () => {
                    let totalAmount = this.sum(this.state.items.map(x => Number(x.price)));
                    this.setState({ price: totalAmount })
                }
            )
        }
        console.log(this.state.items)
    }

    sum = a => a.reduce((x, y) => x + y);

    state = {
        items: [],
        oldItems: [],
        price: 0,
        selectedItems: [],
        line_items: [],
        loading: false
    }
    buy = async () => {
        this.setState({ loading: true })
        const { items } = this.state;
        let result = await items.map((value)=>
            ({ product_id: value.id, quantity: value.quantity })
        )

        await console.log(result);
        await this.setState({ line_items: result });
        
        // We first run payments and debit the user and if successful...
        fetch(`${WOO_COMMERCE_BASE_URL}orders?${WC_KEY}&${WC_SECRET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "payment_method": "paystack",
                "payment_method_title": "Debit/Credit Cards",
                "set_paid": "true",
                "billing": {
                  "first_name": NAME,
                  "last_name": SURNAME,
                  "address_1": ADDRESS_ONE,
                  "address_2": "",
                  "city": CITY,
                  "state": STATE,
                  "postcode": POST_CODE,
                  "country": "NG",
                  "email": EMAIL,
                  "phone": PHONE
                },
                "shipping_address": {
                  "first_name": NAME,
                  "last_name": SURNAME,
                  "address_1": ADDRESS_ONE,
                  "address_2": "",
                  "city": CITY,
                  "state": STATE,
                  "postcode": POST_CODE,
                  "country": "NG"
                },
                "line_items": this.state.line_items,
                "shipping_lines": [
                  {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": "300"
                  }
                ]
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ loading: false });
            console.log(responseJson);
            this.props.navigation.navigate('Waiting', { price: this.state.price, issue: 'Bath Tub Repair' });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
      {
          (this.state.loading===true) && 
          <View style={{ position: 'absolute', height: height, width: width, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
              <Modal />
          </View>
      }
        <ECommerceWrapper 
        goBack={true}
        title={'Review'}
        description={'Review the materials needed and the time it takes to get to you...'}
        onPress={()=>this.props.navigation.goBack()}
        >
        <View style={styles.topView}>
            <View style={styles.time}>
                <Text style={{ fontSize: 10, fontFamily: 'HindGuntur-Regular', color: color.white }}>Estimated Time</Text>
                <Text style={{ fontSize: 12, fontFamily: 'HindGuntur-Regular', color: color.white }}>15 minute(s)</Text>
            </View>
            <View style={styles.total}>
                <Text style={{ fontSize: 14, fontFamily: 'Lato-Regular' }}>TOTAL: <Text style={{ fontSize: 14, fontFamily: 'Lato-Bold' }}>N {this.state.price}</Text></Text>
            </View>
        </View>
        <ScrollView style={{ height: 300 }} scrollEnabled={true}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 21, }}>
            {
                this.state.items.map((value, idx)=>{
                    return (
                        <ECommerceItemAtom
                        key={idx}
                        price={value.price}
                        image={value.image}
                        quantity={value.quantity}
                        name={value.name}
                        type={"review"}
                        onPress={()=>{
                            this.setState({ items: this.state.items.filter((_, i) => i !== idx)},
                            ()=>{
                                if (this.state.items.length === 0){
                                    this.setState({ price: 0 });
                                }
                                else if (this.state.items.length === 1){
                                    this.setState({ price: this.state.items[0].price });
                                } else {
                                    let totalAmount = this.sum(this.state.items.map(x => Number(x.price)));
                                    this.setState({ price: totalAmount });
                                }
                            }
                        )}}
                        />
                )
                })
            }
            </View>
        </ScrollView>
        </ECommerceWrapper>
        <View style={{ width: '100%', alignSelf: 'center', position: 'absolute', bottom: 0, backgroundColor: color.white }}>
            <Text 
            onPress={()=>console.log('I wanna add more...')}
            style={styles.addMore}
            onPress={()=>this.props.navigation.navigate('ECommerceSearch', { items: this.state.items } )}
            >
            + Add more items
            </Text>
            <ButtonAtom 
            style={styles.buttonContainer}
            onPress={this.buy}
            text={'CHECKOUT'}
            normal={true}
            />
            <Text 
            onPress={()=>this.props.navigation.navigate('Quote')}
            style={{ 
                padding: 8, 
                textAlign: 'center', 
                color: color.primary, 
                fontFamily: 'Lato-Bold', 
                fontSize: 14 
            }}>CANCEL</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    topView: {
        width: Dimensions.get('window').width - 42,
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    time: {
        flex: Platform.OS === 'ios' ? 1 : .8,
        height: 65,
        padding: 11,
        backgroundColor: '#2D9CDB',
        borderRadius: 8
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
    total: {
        flex: Platform.OS === 'ios' ? 1 : 1.2,
        padding: 11
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
    },
    innerView: { 
        flexDirection: 'row', 
        padding: 10, 
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'Lato-Regular',
        fontSize: 16
    },
    labelValue: {
        fontFamily: 'Lato-Regular',
        fontSize: 24
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
        height: Platform.OS === 'ios' ? 50 : 46,
        marginBottom: 5
    },
    addMore: {
        color: color.primary,
        padding: 5,
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'HindGuntur-Bold'
    }
})