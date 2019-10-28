import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { Input } from 'react-native-elements';
import Button from "../components/Button";
// import TestApp from "./components/Stopwatch";
import Storage from 'react-native-storage';
import { AuthSession } from 'expo';
//import all the required components
import { Stopwatch } from 'react-native-stopwatch-timer';

const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// storageを作成
const storage = new Storage({
  storageBackend: AsyncStorage
})

var array1 = [];
var lap1 = [];

var array2 = [];
var lap2 = [];

var array3 = [];
var lap3 = [];

var array4 = [];
var lap4 = [];

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      counter1: 1,
      counter2: 1,
      counter3: 1,
      counter4: 1,
      inputText1: "",
      inputText2: "",
      inputText3: "",
      inputText4: "",
      isStopwatchStart: false,
      resetStopwatch: false,
      currentTime: null,
    };
    this.startStopStopWatch = this.startStopStopWatch.bind(this); // member function. 
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  // this.constructor.displayNameで、自身のクラス名を取得
  className = this.constructor.displayName



  componentDidMount = () => {
    this.setInitialState()
  }

  startStopStopWatch() {
    this.setState({ isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false });
  }

  getFormattedTime(time) {
    CURRENTTIME = time;
  }

  resetStopwatch() {
    this.setState({ isStopwatchStart: false, resetStopwatch: true });
  }

  resetStartStopWatch() {
    console.log(CURRENTTIME);
  }

  async lapTime1() {  // lapTime  // 変えた
    try {
      const logsListJson = await AsyncStorage.getItem('logsList:key');


      CURRENTTIME = CURRENTTIME.replace(/:/g, '');
      array1.push(CURRENTTIME);
      lap1.push((Number(CURRENTTIME) - Number(array1[array1.length - 2])) / 1000);  // - array[Number(array.length) - 1]
      // console.log(lap1);
      // console.log(this.state.inputText1);
      if (lap1.length > 1) {
        console.log(lap1[lap1.length - 1]);
        let logItem = { task: this.state.inputText1, time: lap1[lap1.length - 1] }
        // console.log("-------------------------------")
        // console.log(logItem)
        // console.log("-------------------------------")

        // logsがすでに入っている時
        if (logsListJson) {
          let logsList = JSON.parse(logsListJson)
          let newLogsList = [logItem, ...logsList];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
            // Error saving data
          }
          // 最初のアイテムの時はこちらの条件文、logsがまだゼロの時はスプレッド構文が動かない
        } else {
          let newLogsList = [logItem];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
            // Error saving data
          }
        }

        // console.log("-------------------------------")
        // console.log(newLogsList)
        // console.log("-------------------------------")
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async lapTime2() {  // lapTime  // 変えた
    try {
      const logsListJson = await AsyncStorage.getItem('logsList:key');


      CURRENTTIME = CURRENTTIME.replace(/:/g, '');
      array2.push(CURRENTTIME);
      lap2.push((Number(CURRENTTIME) - Number(array2[array2.length - 2])) / 1000);
      if (lap2.length > 1) {
        console.log(lap2[this.lapTime2.length - 1]);
        let logItem = { task: this.state.inputText2, time: lap2[lap2.length - 1] }
        if (logsListJson) {
          let logsList = JSON.parse(logsListJson)
          let newLogsList = [logItem, ...logsList];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
          }
        } else {
          let newLogsList = [logItem];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
          }
        }
      }
    } catch (error) {
    }
  }

  async lapTime3() {  // lapTime  // 変えた
    try {
      const logsListJson = await AsyncStorage.getItem('logsList:key');


      CURRENTTIME = CURRENTTIME.replace(/:/g, '');
      array3.push(CURRENTTIME);
      lap3.push((Number(CURRENTTIME) - Number(array3[array3.length - 2])) / 1000);
      if (lap3.length > 1) {
        console.log(lap3[lap3.length - 1]);
        let logItem = { task: this.state.inputText3, time: lap3[lap3.length - 1] }

        if (logsListJson) {
          let logsList = JSON.parse(logsListJson)
          let newLogsList = [logItem, ...logsList];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
          }
        } else {
          let newLogsList = [logItem];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
          }
        }
      }
    } catch (error) {
    }
  }

  async lapTime4() {  // lapTime  // 変えた
    try {
      const logsListJson = await AsyncStorage.getItem('logsList:key');


      CURRENTTIME = CURRENTTIME.replace(/:/g, '');
      array4.push(CURRENTTIME);
      lap4.push((Number(CURRENTTIME) - Number(array4[array4.length - 2])) / 1000);
      if (lap4.length > 1) {
        console.log(lap4[lap4.length - 1]);
        let logItem = { task: this.state.inputText4, time: lap4[lap4.length - 1] }
        if (logsListJson) {
          let logsList = JSON.parse(logsListJson)
          let newLogsList = [logItem, ...logsList];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {

          }

        } else {
          let newLogsList = [logItem];
          try {
            let logsJson = JSON.stringify(newLogsList)
            await AsyncStorage.setItem('logsList:key', logsJson);
          } catch (error) {
            // Error saving data
          }
        }

        // console.log("-------------------------------")
        // console.log(newLogsList)
        // console.log("-------------------------------")
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  // AsyncStorage からCURRENTTIME を読み込む
  // loadCurrentTime = async () => {
  //   try {  // 非同期通信：成功するかどうかわからない
  //     let currentTimeString = await AsyncStorage.getItem(CURRENTTIME);
  //     if (currentTimeString) {
  //       let currentTimeList = JSON.parse(currentTimeString); // JSON型から戻す
  //       let currentIndex = currentTimeList.length; // currentTimeリストの長さ
  //       this.setState({
  //         currentTimeList: currentTimeList,
  //         currentIndex: currentIndex,
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // AsyncStorageへCURRENTTIMEを保存
  // saveCurrentTime = async (currentTimeList) => {  // async は、非同期通信って意味。裏で走る。
  //   try {
  //     let currentTimeString = JSON.stringify(currentTimeList);  // json型に変換
  //     await AsyncStorage.setItem(CURRENTTIME, currentTimeString);  //async , await はセット。await : 裏で走らせない。キー：中身（1対1）
  //   } catch (e) {   // try catch 例外処理。エラーが出たときの処理。 e : エラー文
  //     console.log(e);
  //   }
  // }

  setInitialState = async () => {
    // react-native-storageは、読み込みがとても速い
    storage
      .load({ key: this.className })
      .then(res => this.setState(res))
      .catch(err => console.warn(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // stateに変化があったら、this.stateを丸ごと保存する。
      // react-native-storageは速いので、丸ごと保存しても大丈夫
      storage.save({
        key: this.className,
        data: this.state
      })
    }
  }

  plus1 = () => {
    this.setState({
      counter1: this.state.counter1 + 1
    })
    this.setState({
      isStopwatchStart: true,
      resetStopwatch: false,
    })
    this.lapTime1()
  }

  minus1 = () => {
    if (this.state.counter1 > 0) {
      this.setState({
        counter1: this.state.counter1 - 1
      })
    }
  }

  reset1 = () => {
    this.setState({
      counter1: this.state.counter1 = 0
    })
    array1 = [0];
    lap1 = [];
  };

  plus2 = () => {
    this.setState({
      counter2: this.state.counter2 + 1
    })
    this.setState({
      isStopwatchStart: true,
      resetStopwatch: false,
    })
    this.lapTime2()
  }

  minus2 = () => {
    if (this.state.counter2 > 0) {
      this.setState({
        counter2: this.state.counter2 - 1
      })
    }
  }

  reset2 = () => {
    this.setState({
      counter2: this.state.counter2 = 0
    })

    array2 = [0];
    lap2 = [];
  }

  plus3 = () => {
    this.setState({
      counter3: this.state.counter3 + 1
    })
    this.setState({
      isStopwatchStart: true,
      resetStopwatch: false,
    })
    this.lapTime3()
  }

  minus3 = () => {
    if (this.state.counter3 > 0) {
      this.setState({
        counter3: this.state.counter3 - 1
      })
    }
  }

  reset3 = () => {
    this.setState({
      counter3: this.state.counter3 = 0
    })
    array3 = [0];
    lap3 = [];
  };

  plus4 = () => {
    this.setState({
      counter4: this.state.counter4 + 1
    })
    this.setState({
      isStopwatchStart: true,
      resetStopwatch: false,
    })
    this.lapTime4()
  }

  minus4 = () => {
    if (this.state.counter4 > 0) {
      this.setState({
        counter4: this.state.counter4 - 1
      })
    }
  }

  reset4 = () => {
    this.setState({
      counter4: this.state.counter4 = 0
    })
    array4 = [0];
    lap4 = [];
  };

  render() {
    const platform = Platform.OS === 'ios' ? 'ios' : 'android';

    return (
      <View style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              style={styles.inputText}
              onChangeText={(text) => this.setState({ inputText1: text })}
              value={this.state.inputText1}
            />

          </View>
          <Text style={styles.counter}>{this.state.counter1}</Text>
          <View style={styles.btnWrap}>

            <Button
              text="+"
              function={this.plus1}
              style={{ backgroundColor: "blue" }}
            />
            <Button
              text="-"
              function={this.minus1}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text='reset'
              function={this.reset1}
              style={{ backgroundColor: "#00a968" }}>
            </Button>
          </View>
        </View >

        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              style={styles.inputText}
              onChangeText={(text) => this.setState({ inputText2: text })}
              value={this.state.inputText2}
            />
          </View>
          <Text style={styles.counter}>{this.state.counter2}</Text>

          <View style={styles.btnWrap}>
            <Button
              text="+"
              function={this.plus2}
              style={{ backgroundColor: "blue" }}
            />
            <Button
              text="-"
              function={this.minus2}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text='reset'
              function={this.reset2}
              style={{ backgroundColor: "#00a968" }}>
            </Button>
          </View>
        </View >

        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              style={styles.inputText}
              onChangeText={(text) => this.setState({ inputText3: text })}
              value={this.state.inputText3}
            />
          </View>
          <Text style={styles.counter}>{this.state.counter3}</Text>
          <View style={styles.btnWrap}>
            <Button
              text="+"
              function={this.plus3}
              style={{ backgroundColor: "blue" }}
            />
            <Button
              text="-"
              function={this.minus3}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text='reset'
              function={this.reset3}
              style={{ backgroundColor: "#00a968" }}>
            </Button>
          </View>
        </View >

        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              style={styles.inputText}
              onChangeText={(text) => this.setState({ inputText4: text })}
              value={this.state.inputText4}
            />
          </View>
          <Text style={styles.counter}>{this.state.counter4}</Text>
          <View style={styles.btnWrap}>
            <Button
              text="+"
              function={this.plus4}
              style={{ backgroundColor: "blue" }}
            />
            <Button
              text="-"
              function={this.minus4}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text='reset'
              function={this.reset4}
              style={{ backgroundColor: "#00a968" }}>
            </Button>
          </View>
        </View >
        <View style={styles.content}>
          <View style={styles.display}>
            <Stopwatch laps msecs
              options={options}
              //options for the styling
              start={this.state.isStopwatchStart}
              //To start
              reset={this.state.resetStopwatch}
              //To reset
              getTime={this.getFormattedTime} />

            <View style={{ flexDirection: "row", justifyContent: 'space-around', }}>
              <TouchableOpacity onPress={this.resetStopwatch}>
                <Text style={styles.stop}>■</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.startStopStopWatch} >
                <Text style={{ fontSize: 45, marginTop: 10, color: "#00F" }}>
                  {!this.state.isStopwatchStart ? "▶" : "Ⅱ"}
                </Text>
              </TouchableOpacity>
              {/* <TouchableHighlight onPress={this.resetStartStopWatch}>
                    <Text style={{ fontSize: 45, marginTop: 10, color: "#F00" }}>♦</Text>
                </TouchableHighlight> */}
            </View>
          </View >
        </View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: StatusBarHeight,
  },
  counter: {
    fontSize: 50,
    paddingLeft: 75,
    paddingTop: 30,

    height: 100,
  },

  btnWrap: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 20,
  },

  plusBtn: {
    backgroundColor: "blue",
  },
  minusBtn: {
    backgroundColor: "red",
  },
  resetBtn: {
    backgroundColor: "#00a968",
  },

  input: {
    height: 10,
    margin: 10,
    width: 160,
    alignItems: "center",


  },
  content: {
    // flex:1,
    height: '30%',
    width: '50%',

  },

  inputText: {
    padding: 10,

  },

  display: {
    flex: 1,
    marginTop: 52,
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  },

  logs: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 15,
  },

  stop: {
    fontSize: 40,
    marginTop: 10,
    color: "#F00",
    marginRight: 80
  }


});

const options = {
  container: {
    backgroundColor: '#00e68e',
    padding: 5,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: '#FFF',
    marginLeft: 7,
  }
}; 