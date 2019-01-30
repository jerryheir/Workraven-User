import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Polyline from '@mapbox/polyline';
import MapView from 'react-native-maps';
import MapComponent from './MapComponent';
import MarkerAtom from '../Atoms/MarkerAtom';
import JobHeaderAtom from '../Atoms/JobHeaderAtom';
import haversine from "haversine";
import { color } from '../Styles/Color';

export default class InTransit extends Component {
    async componentDidMount(){
        console.log(haversine(this.state.origin, this.state.destination))
        console.log(haversine(this.state.origin, this.state.destination, { unit: 'meter' }))
        console.log(this.state.origin.latitude)
        fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+`${this.state.origin.latitude}`+','+`${this.state.origin.longitude}`+'&destination='+`${this.state.destination.latitude}`+','+`${this.state.destination.longitude}`+'&key=AIzaSyCiGG3C1Ghzh_vYAnoy9-LK_fhcBDwOifo',{
            method: 'GET'
        })
        .then((res)=> res.json())
        .then((response)=>{
            let encoded = response.routes[0].overview_polyline.points;
            let coords = Polyline.decode(encoded);
            let coordinates = coords.map((x)=> { 
                return { 
                  latitude: x[0], 
                  longitude: x[1] 
                }; 
              });
            console.log(coordinates);
            this.setState({ polyline: encoded, coordinates });
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    state = {
        polyline: '',
        origin: {
            latitude: 37.798790,
            longitude: -122.442753
        },
        destination: {
            latitude: 37.790651,
            longitude: -122.422497
        },
        coordinates: []
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 30 }}>
       <JobHeaderAtom 
        title={'In Transit'}
        subtitle={'Desmond Tutu is on his way'}
        remove={this.props.remove === true ? true : false}
        removeClose={this.props.removeClose === true ? true : false}
        />
        <View style={{ height: 100, width: 100, position: 'absolute', top: 200, left: 21 }}>
            <Text>Text</Text>
        </View>
        <MapComponent>
            <MapView.Marker
            coordinate={this.state.origin}
            >
                <View style={{ 
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 0.5 },
                    elevation: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 55, 
                    width: 55,
                    borderRadius: 50
                }} >
                    <View style={{ 
                        backgroundColor: color.darkGray, 
                        height: 30, 
                        width: 30,
                        borderRadius: 15
                    }} />
                </View>
            </MapView.Marker>
            <MapView.Marker
            coordinate={this.state.destination}
            >
                <MarkerAtom />
            </MapView.Marker>
            <MapView.Polyline 
            coordinates={this.state.coordinates} 
            strokeColor={'#BE64FF'}
            strokeWidth={6}
            strokeColors={['#BE64FF', '#C190C7', '#E6E6FA']}
            />
            {/*<MapViewDirections
                origin={this.state.origin}
                destination={this.state.destination}
                apikey={'AIzaSyCiGG3C1Ghzh_vYAnoy9-LK_fhcBDwOifo'}
                strokeWidth={5}
                strokeColor="#BE64FF"
                onReady={result => {
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} mins`);
                    console.log(`Coordinates: ${result.coordinates}`);
                    this.setState({ coordinates: result.coordinates },
                        ()=>{
                            console.log(this.state);
                        })
                }}
                resetOnChange={false}
            />*/}
        </MapComponent>
      </View>
    )
  }
}
