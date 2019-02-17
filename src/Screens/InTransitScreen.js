import React, { Component } from 'react';
import { View, Text } from 'react-native';
import JobHeaderAtom from '../Atoms/JobHeaderAtom';
import InTransit from '../Components/InTransit';

class TopView extends Component {
    render() {
        return (
            <JobHeaderAtom 
            title={'In Transit'}
            subtitle={'Desmond Tutu is on his way'}
            onChat={()=>this.props.navigation.navigate('InAppChat')}
            remove={this.props.remove === true ? true : false}
            removeClose={this.props.removeClose === true ? true : false}
            />
        );
      }
}

export default class InTransitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
            <TopView navigation={this.props.navigation} />
            <InTransit />
      </View>
    );
  }
}
