const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

const toDos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: true,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  }
];

class Heading extends React.Component {
  render() {
    return <h1>ToDo List</h1>;
  }
}

class List extends React.Component {
  render() {
    const { arr = [] } = this.props;

    return <ul>
      {arr.map((item, index) => <ListItem key={item.id} item={item} />)}
    </ul>
  }
}

class ListItem extends React.Component {
  render() {
    const { item } = this.props;
    return <li className={item.completed ? 'completedItem' : null}>{item.title}</li>
  }
}

const App = <React.Fragment>
  <Heading />
  <List arr={toDos} />
</React.Fragment>

root.render(App);