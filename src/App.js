import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem(e){
        if(this._inputElement.value !== ""){
            var newItem ={
                text: this._inputElement.value,
                key: Date.now()
            };
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem),
                };
            });
            this._inputElement.value = "";
        }
        
        e.preventDefault();
    }
    deleteItem(key){
        var filteredItems = this.state.items.filter(function (item){
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems,
        });   
    }
    render(){
        return(
            <div>
            <div id="container">
                <h1>To-Do List</h1>
                <form onSubmit={this.addItem}>
                    <input ref={(a) => this._inputElement=a} type="text" name="newTask" placeholder="Enter new task" id="taskField"/>
                    <button type="submit" name="newTaskButton" id="newTaskButton">New Task</button>
                </form>
            </div>
            <div className="tasks">
                <TodoItems entries={this.state.items} delete={this.deleteItem}/>
            </div>
            </div>
        );
    }
}

class TodoItems extends React.Component{
    constructor(props){
        super(props);
        this.createTask = this.createTask.bind(this); 
    }
    createTask(item){
        return <li onClick={() => this.delete(item.key)} key={item.key}>{item.text}</li>
    }
    delete(key){
        this.props.delete(key);
    }
    render(){
        var toDoEntries = this.props.entries;
        var listItems = toDoEntries.map(this.createTask);
        return(
                <ul>
                    {listItems}
                </ul>
        );
    }
}
export default App;