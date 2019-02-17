import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import { Icon } from "native-base";
import { color } from '../Styles/Color';

export default class Notifications extends Component {
    state = {
        item: [
            {
                id: '1',
                action: '',
                title: 'Arrival',
                description: 'You have close to the Job Location',
                time: '02:00 pm'
            },
            {
                id: '2',
                action: '',
                title: 'Arrival',
                description: 'You have accepted a scheduled job, U832PF90Z',
                time: '03:00 pm'
            },
        ]
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                height: 70,
                width: '100%',
                paddingHorizontal: 21
            }}>
                <View>
                    <Text style={{ 
                        fontFamily: 'Lato-Regular', 
                        fontSize: 14,
                        paddingVertical: 5
                    }}>
                    {item.title}
                    </Text>
                    <Text style={{ 
                        fontFamily: 'Lato-Thin', 
                        fontSize: 14,
                        width: 250
                    }}>
                    {item.description}
                    </Text>
                </View>
                <View>
                    <Text style={{ 
                        fontFamily: 'Lato-Regular', 
                        fontSize: 12
                    }}
                    >
                    {item.time}
                    </Text>
                </View>
            </View>
        );
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <SemiCircleAtom />
        <Icon 
        type="MaterialIcons" 
        name="arrow-back" 
        style={{ position: 'absolute', top: 42, left: 21, color: color.primary }}
        onPress={()=>this.props.navigation.goBack()}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2, paddingBottom: 15, marginTop: 100, marginHorizontal: 20, marginBottom: 10, borderBottomColor: '#828282', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 24, fontFamily: 'Lato-Bold' }}>Notifications</Text>
            <Icon name="md-refresh" style={{ color: color.primary, fontSize: 24 }} />
        </View>
        <FlatList 
        data={this.state.item}
        renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = {

}
