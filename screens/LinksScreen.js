import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';

import { Input, Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import CheckIcon from 'react-native-vector-icons/MaterialIcons';

// ES6 三項演算子  : else にあたる
const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// AsyncStorageに保存する用のキー
const TODO = "@todoApp:todoList";

// Todoを表示するコンポーネント。 タッチ可能なコンポーネントにしている
const TodoItem = (props) => {
  let textStyle = styles.todoItemWrap;
  let icon = null;
  if (props.done === true) {
    icon = <CheckIcon name="done" />
    textStyle = styles.todoItemDoneWrap;
  }
  return (
    <TouchableOpacity
      style={textStyle}
      onLongPress={props.deleteTodo}
      onPress={props.TapTodoItem}
    >
      <ListItem
        title={props.title}
        rightIcon={icon}
        bottomDivider
        titleStyle={styles.todoItem}
      />
    </TouchableOpacity>
  )
}

export default class TodoApp extends React.Component {

  constructor(props) {  // stateで書くため
    super(props);

    this.state = {
      todoList: [],
      currentIndex: 0,
      inputText: "", // テキスト入力用の箱を用意
      filterText: "",
    }
  }

  // データの永続化。もう一回アプリを起動しても残っている

  async componentDidMount() {  //  AsyncStorageに保存されたものを読み込む
    this.loadTodo();
  }


  loadTodo = async () => {  // AsyncStorage からTODO を読み込む
    try {  // 非同期通信：成功するかどうかわからない
      let todoString = await AsyncStorage.getItem(TODO);
      if (todoString) {
        let todoList = JSON.parse(todoString); // JSON型から戻す
        let currentIndex = todoList.length; // todoリストの長さ
        this.setState({
          todoList: todoList,
          currentIndex: currentIndex,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  addTodo = () => {
    let title = this.state.inputText;
    if (title == "") {
      return
    }
    let index = this.state.currentIndex + 1;
    let newTodo = { index: index, title: title, done: false }; // 連想配列
    let todoList = [...this.state.todoList, newTodo]; //ES6 スプレッド構文
    // console.log(todoList)
    this.setState({  //最後に、this.setState を使って状態の書き換え
      todoList: todoList,
      currentIndex: index,
      inputText: "",
    });
    this.saveTodo(todoList); // saveTodo に addTodo で作られたリストを渡す（上書き）
  }
  // AsyncStorageへTODOを保存
  saveTodo = async (todoList) => {  // async は、非同期通信って意味。裏で走る。
    try {
      let todoString = JSON.stringify(todoList);  // json型に変換
      await AsyncStorage.setItem(TODO, todoString);  //async , await はセット。await : 裏で走らせない。キー：中身（1対1）
    } catch (e) {   // try catch 例外処理。エラーが出たときの処理。 e : エラー文
      console.log(e);
    }
  }

  TapTodoItem = (todoItem) => {
    let todoList = this.state.todoList;
    let index = todoList.indexOf(todoItem); // todoItem は、何番目にいますか
    todoItem.done = !todoItem.done; // 真理値を逆にする
    todoList[index] = todoItem;
    this.setState({ todoList: todoList });
    this.saveTodo(todoList);
  }
  deleteTodo = (todoItem) => {
    let todoList = this.state.todoList;
    let index = todoList.indexOf(todoItem);
    todoList.splice(index, 1);   // 配列の何番目から何番目を削除しますか  例.4番目から4番目
    this.setState({ todoList: todoList });
    this.saveTodo(todoList);
  }

  render() {

    // フィルター処理 フィルタリングの対象は2つ
    const filterText = this.state.filterText;
    let todoList = this.state.todoList;
    if (filterText !== "") {
      todoList = todoList.filter(t => t.title.includes(filterText)); // 入力されたものがタイトルに含まれているもの
    }

    const platform = Platform.OS === 'ios' ? 'ios' : 'android';

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.todoList}>
          <FlatList
            data={todoList} // 配列 ループを持ったコンポーネント フィルタリングで作った todoList
            extraData={this.state}  // ??
            renderItem={({ item }) =>
              <TodoItem
                title={item.title}
                done={item.done}
                TapTodoItem={() => this.TapTodoItem(item)} // 先ほど処理を書いた、TapTodoItem 関数
                deleteTodo={() => this.deleteTodo(item)}
              />
            }
            keyExtractor={(item, index) => "todo_" + item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Input
            style={styles.inputText}
            onChangeText={(text) => this.setState({ inputText: text })}
            value={this.state.inputText}
          />
          <Button
            onPress={this.addTodo}
            title=""
            color="#C69C6C"
            icon={
              <Icon
                name="plus" // icon の名前は決まっている vector icons
                size={30}
                color="#fff"
              />
            }
            buttonStyle={styles.inputButton} // button にcssを利かすよ
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ステータスバーの高さだけ下にずらす
    paddingTop: StatusBarHeight,
  },
  filter: {
    height: 50,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#c7c7c7",
  },
  input: {
    height: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 60,
  },
  inputText: {
    flex: 1, // 残りをビーっと伸びてくれる
    padding: 10,
  },
  todoList: {
    flex: 1,
  },
  todoItem: {  // 違うかも？
    fontSize: 20,
    lineHeight: 30, // android用
  },
  todoItemDone: {  // 違うかも？
    fontSize: 20,
    lineHeight: 30, // android用
    color: '#c7c7c7',
  },
  inputButton: {
    width: 48,
    height: 48,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 48,
    backgroundColor: "#C69C6C",
  },
});
