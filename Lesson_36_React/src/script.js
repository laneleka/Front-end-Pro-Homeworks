const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

const animals = [
  { type: `turtle`, icon: `🐢` },
  { type: `octopus`, icon: `🐙` },
  { type: `fish`, icon: `🐠` },
  { type: `flamingo`, icon: `🦩` },
  { type: `penguin`, icon: `🐧` }
]

const INTERVAL_DELAY = 2000;

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: this.props.arr,
      borderWidth: '1px',
    };

    const interval = setInterval(() => {
      const filtered = this.state.arr.filter(item => !item.isStyled);

      if (filtered.length === 0) {
        clearInterval(interval);
        return;
      }

      if (filtered.length <= Math.ceil(this.state.arr.length / 2)) {
        this.state.borderWidth = '10px';
      }

      const index = Math.floor(Math.random() * filtered.length);
      const newIndex = this.state.arr.findIndex((item) => filtered[index].type === item.type);
      this.state.arr[newIndex].isStyled = true;
      this.state.borderWidth = filtered.length === 1 ? '20px' : this.state.borderWidth;

      this.setState(this.state);
    }, INTERVAL_DELAY)
  }

  render() {
    const { arr, borderWidth } = this.state;

    return <table style={{ border: `${borderWidth} solid black` }}>
      <tbody>
        {
          arr.map((item) => {
            const styles = {};

            if (item.isStyled) {
              styles.background = 'green';
              styles.fontWeight = 'bold';
            }

            return <tr key={item.type} style={styles}>
              <td>{item.type}</td>
              <td>{item.icon}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  }
}

root.render(<Table arr={animals} />);