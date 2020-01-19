import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

import FileInputComponent from 'react-file-input-previews-base64'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'
/*
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
*/
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

/*
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ReadStream } from 'fs';
*/
const title = "席替えジェネレータ";
const apiServer = "http://localhost:8080/";



class Rand extends React.Component {
    constructor(props) {
        super(props);
        this.state = { num: 100 };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        axios
            .get(apiServer, { params: { num: 19 } })
            .then((res) => {
                console.log(res.data);
                this.setState({ num: res.data });
            },
            )
            .catch(console.error);
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleClick} variant="contained" color="primary">
                    乱数生成
                </Button>
            </div>
        );
    }
}
class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeMember: [],
            row: 8, //行
            column: 7, //列
            //classList: ["いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ"]
            classList: []
        };
    }

    handleForce(data) {
        axios
            .get(apiServer, { params: { member: String(data) } })
            .then((res) => {
                console.log(this.props.data);
                this.setState({ classList: String(res.data).slice(1, -1).replace(/'/g, "").split(",") });
            },
            )
            .catch(console.error);
    }
    swapSeat(name) {
        //console.log(name)
        let member = [...this.state.changeMember, name];
        let classes = this.state.classList;
        let tmp;
        this.setState({changeMember: member});
        if (member.length == 2) {
            tmp = classes[member[0]]; 
            classes[member[0]] = classes[member[1]];
            classes[member[1]] = tmp;
            this.setState({classList: classes}) 
            this.setState({changeMember : []})
        }
    }


    getSeat(column, row) {
        let columnList = [];
        let rowList = [];
        let cnt = 0;
        let name = "";
        for (let i = 0; i < row; i++) {
            for (let l = 0; l < column; l++) {
                //                columnList.push(<td>{this.state.classList[cnt].number}<br />{this.state.classList[cnt].name}</td>);
                if (this.state.classList[cnt] !== undefined) {
                    name = this.state.classList[cnt];
                }
                else {
                    name = "";
                }
                let seatNumber = cnt;
                columnList.push(
                    <button className="seat" onClick={() => this.swapSeat(seatNumber)}>
                        {name}
                    </button>);
                cnt++;
            }
            rowList.push(<tr>{columnList}</tr>);
            columnList = [];
        }
        return (
            <tr>
                {rowList}
            </tr>
        );
    }

    render() {
        return (
            <div className="Seat">
                <table border="1" cellspacing="0" cellpadding="5">
                    {this.getSeat(this.state.column, this.state.row)}
                </table>
                <CSVReader onFileLoaded={data => this.handleForce(data)} />
            </div>
        );
    }

}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeMember: [],
            row: 8, //行
            column: 7, //列
            //classList: ["いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ", "いりえ"]
            classList: []
        };
    }
    render() {
        return (
            <div className="body">
                <p>学生のデータが入ったファイルを選択してください</p>
                <Seat data={this.state}/>
                <Rand data={this.state}/>
            </div>
        );
    }
}
class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    <Typography variant="body1">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {'Copyright © '}
                        <Link color="inherit" href="https://www.itok01.com/">
                            itok01
              </Link>
                        {' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </footer>
        )
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
                {/*<Footer/>*/}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
