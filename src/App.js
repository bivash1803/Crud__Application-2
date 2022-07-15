import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import ListItem from './components/ListItem';
import axios from 'axios'
import loadingGIF from './loading.gif'


class App extends Component {
  constructor() {
    super();
    
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = 'https://62d0fae3d9bf9f17059064a7.mockapi.io';

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    // this.generateTodoId = this.generateTodoId.bind(this);
    this.alert = this.alert.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);
    this.setState({
      todos: response.data,
      loading: false
    });
  }
  handleChange(event){
    this.setState({
      newTodo: event.target.value
    })
  }

  // generateTodoId(){
  //   const lastTodo = this.state.todos[this.state.length - 1];
  //   if(lastTodo){
  //     return lastTodo.id + 1;
  //   }

  //   return 1;
  // }

  async addTodo(event){
    

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    console.log(response);

    const oldTodos = this.state.todos;
    oldTodos.push(response.data);

    this.setState({
      todos: oldTodos,
      newTodo:'',
    })
    this.alert('Todo add successfully');
  }

  alert(notification){
    this.setState({notification});

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000)
  }

  async deleteTodo(index){
    const todos = this.state.todos;

    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`)

    delete todos[index];

    this.setState({
      todos
    });

    this.alert('Todo delete successfully');
  }
  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    })
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      todos, 
      editing: false, 
      editingIndex: null, 
      newTodo: ''
    });
    this.alert('Todo update successfully');
  }
  render(){
    console.log(this.state.newTodo);
    return (

      <div className="App">

        <header className="App-header">

        

          <h1 className="App-title">TODO</h1>

          <div className="container">

            {
              this.state.notification && 
              <div className="alert-sm mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
              </div>
            }

            <input 
              type="text"
              name="todo"
              className="my-4 form-control"
              placeholder='Add a new todo'
              onChange={this.handleChange}
              value={this.state.newTodo}
            />
            <button 
              onClick={this.state.editing ? this.updateTodo : this.addTodo}
              className="mb-4 btn btn-Info form-control"
              disabled={this.state.newTodo.length < 5}
              >
              {this.state.editing ? 'Update Todo' : 'Add Todo'}
            </button>
            {
              this.state.loading &&
              <img src={loadingGIF} alt=""/>
            }
            {
              (!this.state.editing || this.state.loading) && 
              <ul className="list-group">
                {this.state.todos.map((item, index) => {
                  return <ListItem
                  key={item.id} 
                  item={item} 
                  editTodo = {() => {this.editTodo(index);}}
                  deleteTodo = {() => {this.deleteTodo(index);}}></ListItem>
                })}
              </ul>
            }
          </div>
        </header>
      </div>
    );
  }
  }
export default App;