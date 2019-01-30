import React from "react";
import { Animated, Text, ImageBackground, Easing, TouchableWithoutFeedback, Dimensions } from "react-native";
import { storeItem, retrieveItem } from '../Functions';

const { width, height } = Dimensions.get('window');
const halfWidth = width / 2;
const halfHeight = height / 2;
const newWidth = halfWidth - 112;

class WelcomeImage extends React.Component {
    constructor(props) {
        super(props);
          this.arr = this.props.navigation.getParam('arr', []);
          this.NAME = this.props.navigation.getParam('firstname', '');
          this.w = new Animated.ValueXY({ x: 20, y: 25 });
          this.e = new Animated.ValueXY({ x: 300, y: 450 });
          this.l = new Animated.ValueXY({ x: 150, y: 0 });
          this.c = new Animated.ValueXY({ x: 70, y: 300 });
          this.o = new Animated.ValueXY({ x: 0, y: height - 50 });
          this.m = new Animated.ValueXY({ x: width - 50, y: height - 100 });
          this.e2 = new Animated.ValueXY({ x: width/2, y: (height/2) + 70 });
            this.animatedValue = []
            this.arr.forEach((value) => {
                this.animatedValue[value] = new Animated.ValueXY({ x: this.GenerateRandomNumber(width), y: this.GenerateRandomNumber(height) })
            })
    }

    async componentDidMount(){
        await this.animate();
        await this.displayName();
    }

    ChangeColorFunction = () => {
        let ColorCode = 'rgb(' + (Math.floor(Math.random() * 240)) + ',' + (Math.floor(Math.random() * 240)) + ',' + (Math.floor(Math.random() * 250)) + ')';
        return ColorCode
    }

    GenerateRandomNumber = (num) => {
        let RandomNumber = Math.floor(Math.random() * num) + 1 ;
        return RandomNumber
    }

    displayName = () => {
        const W1 = this.NAME.length * 34;
        const halfW1 = W1 / 2;
        const start = halfWidth - halfW1
        const animations = this.arr.map((item, idx) => {
            let multi = idx * 34;
            return Animated.timing(
              this.animatedValue[item],
              {
                toValue: ({ x: start + multi, y: halfHeight + 30 }),
                duration: 6000,
                easing: Easing.bounce,
                delay: 3200
              }
            )
        })
        Animated.parallel(animations).start(()=>this.props.navigation.navigate('Tabs'))
    }

    animate = async () => {

        Animated.parallel([
            Animated.timing(
                this.w,
                {
                  toValue: ({ x: newWidth, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.e,
                {
                  toValue: ({ x: newWidth + 32, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.l,
                {
                  toValue: ({ x: newWidth + 64, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.c,
                {
                  toValue: ({ x: newWidth + 96, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.o,
                {
                  toValue: ({ x: newWidth + 128, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.m,
                {
                  toValue: ({ x: newWidth + 160, y: height / 2 - 50 }),
                  duration: 3000
                }
            ),
            Animated.timing(
                this.e2,
                {
                  toValue: ({ x: newWidth + 192, y: height / 2 - 50 }),
                  duration: 3000
                }
            )
        ]).start()
    }

    render(){
        const animations = this.arr.map((a, i) => {
            return (
                <Animated.View 
                key={i} 
                style={{
                    position: 'absolute',
                    left: this.animatedValue[a].x,
                    top: this.animatedValue[a].y,
                    height: 32, width: 32,
                    borderRadius: 3,
                    backgroundColor: this.ChangeColorFunction(),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text 
                    style={{ 
                        fontSize: 12, 
                        fontFamily: 'Lato-Heavy',
                        color: '#FFFFFF'
                    }}>{this.NAME.charAt(i)}</Text>
                </Animated.View>
            )
        })
        return (
            <TouchableWithoutFeedback>
                <ImageBackground 
                source={require('../assests/images/reg_splash.png')} 
                style={{ flex: 1 }}
                >
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.w.x,
                        top: this.w.y,
                        backgroundColor: '#1A91FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>W</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.e.x,
                        top: this.e.y,
                        backgroundColor: '#BE64FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>E</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.l.x,
                        top: this.l.y,
                        backgroundColor: '#59D98E',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>L</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.c.x,
                        top: this.c.y,
                        backgroundColor: '#D4A763',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>C</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.o.x,
                        top: this.o.y,
                        backgroundColor: '#6ED3FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>O</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.m.x,
                        top: this.m.y,
                        backgroundColor: '#9EE012',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>M</Text>
                    </Animated.View>
                    <Animated.View 
                    style={{ 
                        position: 'absolute', 
                        left: this.e2.x,
                        top: this.e2.y,
                        backgroundColor: 'rgb(20, 240, 252)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        height: 30,
                        width: 30
                    }}>
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            fontFamily: 'Lato-Heavy',
                            color: '#FFFFFF'
                        }}>E</Text>
                    </Animated.View>
                    {
                        animations
                    }
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}

export default WelcomeImage;
