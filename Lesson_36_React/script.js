var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var domContainer = document.querySelector('#root');
var root = ReactDOM.createRoot(domContainer);

var animals = [{ type: 'turtle', icon: '\uD83D\uDC22' }, { type: 'octopus', icon: '\uD83D\uDC19' }, { type: 'fish', icon: '\uD83D\uDC20' }, { type: 'flamingo', icon: '\uD83E\uDDA9' }, { type: 'penguin', icon: '\uD83D\uDC27' }];

var INTERVAL_DELAY = 2000;

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {
      arr: _this.props.arr,
      borderWidth: '1px'
    };

    var interval = setInterval(function () {
      var filtered = _this.state.arr.filter(function (item) {
        return !item.isStyled;
      });

      if (filtered.length === 0) {
        clearInterval(interval);
        return;
      }

      if (filtered.length <= Math.ceil(_this.state.arr.length / 2)) {
        _this.state.borderWidth = '10px';
      }

      var index = Math.floor(Math.random() * filtered.length);
      var newIndex = _this.state.arr.findIndex(function (item) {
        return filtered[index].type === item.type;
      });
      _this.state.arr[newIndex].isStyled = true;
      _this.state.borderWidth = filtered.length === 1 ? '20px' : _this.state.borderWidth;

      _this.setState(_this.state);
    }, INTERVAL_DELAY);
    return _this;
  }

  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          arr = _state.arr,
          borderWidth = _state.borderWidth;


      return React.createElement(
        'table',
        { style: { border: borderWidth + ' solid black' } },
        React.createElement(
          'tbody',
          null,
          arr.map(function (item) {
            var styles = {};

            if (item.isStyled) {
              styles.background = 'green';
              styles.fontWeight = 'bold';
            }

            return React.createElement(
              'tr',
              { key: item.type, style: styles },
              React.createElement(
                'td',
                null,
                item.type
              ),
              React.createElement(
                'td',
                null,
                item.icon
              )
            );
          })
        )
      );
    }
  }]);

  return Table;
}(React.Component);

root.render(React.createElement(Table, { arr: animals }));