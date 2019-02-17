import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { color } from '../Styles/Color';
import JobHeaderAtom from '../Atoms/JobHeaderAtom';

export default class JobHeaderWrapper extends PureComponent {
  render() {
    return (
      <View
      style={{ flex: 1, backgroundColor: '#FFF' }}
      >
        <JobHeaderAtom 
        title={this.props.title}
        subtitle={this.props.subtitle}
        completed={this.props.completed}
        indeterminate={this.props.indeterminate}
        progress={this.props.progress}
        onChat={()=>this.props.navigation.navigate('InAppChat')}
        remove={this.props.remove === true ? true : false}
        removeClose={this.props.removeClose === true ? true : false}
        />
          {this.props.children}
      </View>
    );
  }
}
