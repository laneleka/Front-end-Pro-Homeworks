var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var domContainer = document.querySelector('#root');
var root = ReactDOM.createRoot(domContainer);

var toDos = [{
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false
}, {
  userId: 1,
  id: 2,
  title: "quis ut nam facilis et officia qui",
  completed: true
}, {
  userId: 1,
  id: 3,
  title: "fugiat veniam minus",
  completed: false
}, {
  userId: 1,
  id: 4,
  title: "et porro tempora",
  completed: true
}, {
  userId: 1,
  id: 5,
  title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
  completed: false
}];

var Heading = function (_React$Component) {
  _inherits(Heading, _React$Component);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, (Heading.__proto__ || Object.getPrototypeOf(Heading)).apply(this, arguments));
  }

  _createClass(Heading, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "h1",
        null,
        "ToDo List"
      );
    }
  }]);

  return Heading;
}(React.Component);

var List = function (_React$Component2) {
  _inherits(List, _React$Component2);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _props$arr = this.props.arr,
          arr = _props$arr === undefined ? [] : _props$arr;


      return React.createElement(
        "ul",
        null,
        arr.map(function (item, index) {
          return React.createElement(ListItem, { key: item.id, item: item });
        })
      );
    }
  }]);

  return List;
}(React.Component);

var ListItem = function (_React$Component3) {
  _inherits(ListItem, _React$Component3);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      var item = this.props.item;

      return React.createElement(
        "li",
        { className: item.completed ? 'completedItem' : null },
        item.title
      );
    }
  }]);

  return ListItem;
}(React.Component);

var App = React.createElement(
  React.Fragment,
  null,
  React.createElement(Heading, null),
  React.createElement(List, { arr: toDos })
);

root.render(App);