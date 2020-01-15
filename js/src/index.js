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
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
*/
/*
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ReadStream } from 'fs';
*/
const title = "席替えジェネレータ";
const apiServer = "http://localhost:8080/";




class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member: 0,
            row: 6, //行
            column: 9, //列
            classList: []
        };
    }

    handleForce(data) {
        this.setState({ member: String(data) });
        axios
            .get(apiServer, { params: { member: String(data) } })
            .then((res) => {
                console.log(res.data);
                this.setState({ member: String(res.data) });
                this.setState({classList: this.state.member.slice(1, -1).replace( /'/g , "" ).split(",")});
            },
            )
            .catch(console.error);
    }

    getSeat(column, row) {
        var columnList = [];
        var rowList = [];
        var cnt = 0;

        for (var i = 0; i < row; i++) {
            for (var l = 0; l < column; l++) {
//                columnList.push(<td>{this.state.classList[cnt].number}<br />{this.state.classList[cnt].name}</td>);
                columnList.push(<td>{this.state.classList[cnt]}</td>);
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

    render() {
        return (
            <div className="body">
                <p>学生のデータが入ったファイルを入力してください</p>
                <Seat />
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

                {/* <Rand/>*/}
            </div>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));