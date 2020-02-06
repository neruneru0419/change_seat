import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'


const title = "席替えジェネレータ";
const apiServer = "http://localhost:8080/";



class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberList: [],
            changeMember: [],
            classList: [],
            row: 8, //行
            column: 7, //列
            isChange: false,
            isReverse: true
        };
    }

    changeSeat(data) {
        this.setState({ memberList: data })
        console.log(this.state.isReverse)
        axios
            .get(apiServer, { params: { member: String(data), memberSize: this.state.row * this.state.column } })
            .then((res) => {
                this.setState({ classList: String(res.data).slice(1, -1).replace(/'/g, "").split(",") });
            },
            )
            .catch(console.error);
    }
    randomSeat() {
        axios
            .get(apiServer, { params: { member: String(this.state.memberList), memberSize: this.state.row * this.state.column } })
            .then((res) => {
                this.setState({ classList: String(res.data).slice(1, -1).replace(/'/g, "").split(",") });
            },
            )
            .catch(console.error);
    }
    reverseSeat(data = this.state.classList) {
        this.setState({ isReverse: (!this.state.isReverse) })
        axios
            .get(apiServer + "reverse", { params: { member: String(data) } })
            .then((res) => {
                this.setState({ classList: String(res.data).slice(1, -1).replace(/'/g, "").split(",") });
            },
            )
            .catch(console.error);
    }
    swapSeat(name) {
        //console.log(name)
        if (this.state.isChange === true) {
            let member = [...this.state.changeMember, name];
            let classes = this.state.classList;
            let tmp;
            this.setState({ changeMember: member });
            if (member.length === 2) {
                tmp = classes[member[0]];
                classes[member[0]] = classes[member[1]];
                classes[member[1]] = tmp;
                this.setState({ classList: classes })
                this.setState({ changeMember: [] })
                this.setState({ isChange: false })
            }
            axios
                .get(apiServer + "swap", { params: { member: String(this.state.classList) } })
                .then((res) => {
                    console(res)
                },
                )
                .catch(console.error);
        }
    }
    getExcel() {
        axios.get(apiServer + "download")
            .then((res) => {
                console.log(res);
            })
            .catch(console.error);
    }
    getSeat(column, row) {
        let columnList = [];
        let rowList = [];
        let cnt = 0;
        let name = "";
        if (this.state.isReverse) {
            columnList.push(<div>黒板</div>)
        }
        for (let i = 0; i < row; i++) {
            for (let l = 0; l < column; l++) {
                if (this.state.classList[cnt] !== undefined) {
                    name = this.state.classList[cnt];
                }
                else {
                    name = "";
                }
                let seatNumber = cnt;
                columnList.push(
                    <button className="seat" onClick={() => this.swapSeat(seatNumber)}>
                        {name.trim().slice(0, 6)}
                        <span class="br">
                            {name.trim().slice(6)}
                        </span>
                    </button>);
                cnt++;
            }
            rowList.push(<tr>{columnList}</tr>);
            columnList = [];
        }
        if (!(this.state.isReverse)) {
            rowList.push(<div>黒板</div>)
        }
        return (
            <tr>
                {rowList}
            </tr>
        );
    }

    render() {
        return (
            <div className="body">
                <div id="description">
                    <p>学生のデータが入ったCSVファイルを選択してください</p>
                    <p>下のボタンで席の編集ができます</p>
                </div>

                <div id="table">
                    <table border="1" cellspacing="0" cellpadding="5" width="100%" height="100%">
                        {this.getSeat(this.state.column, this.state.row)}
                    </table>
                </div>
                <div class="button">
                    <CSVReader onFileLoaded={data => this.changeSeat(data)} />
                    <Button onClick={() => this.randomSeat()} variant="contained" color="primary">
                        再抽選
                    </Button>
                    <Button onClick={() => this.setState({ isChange: true })} variant="contained" color="primary">
                        席変更
                    </Button>
                    <Button onClick={() => this.reverseSeat()} variant="contained" color="primary">
                        席逆転
                    </Button>
                    <Button href={apiServer + "download?/" + Math.random().toString(32).substring(2)} variant="contained" color="primary">
                        席のダウンロード
                    </Button>

                </div>
            </div>
        );
    }

}


class App extends React.Component {
    render() {
        return (
            <div className="app">
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography className="title" variant="h6">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Body />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));