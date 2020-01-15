import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

import FileInputComponent from 'react-file-input-previews-base64'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
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

class GetCSV extends Component {
    constructor(props) {
      super(props);
      this.state = {
          num : 0
      };
  }
    handleForce(data) {
      console.log(data)
      this.setState({ num: data});
    }
    render() {
      return (
        <div>
        <CSVReader onFileLoaded={data => this.handleForce(data)} />
          <p>
            {this.state.num}
          </p>
        </div>
      );
    }
  }

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
                <p>
                    {this.state.num}
                </p>
            </div>
        );
    }
}

class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: 3, //行
            column: 1 //列
        };
    }

    getSeat(column, row) {
        var columnList = [];
        var rowList = [];
        var cnt = 0;
        var classList = [
            { name: "ねるねる", number: 171306 },
            { name: "いさたく", number: 171304 },
            { name: "ゆりな", number: 171303 }
        ];

        for (var i = 0; i < row; i++) {
            for (var l = 0; l < column; l++) {
                columnList.push(<td>{classList[cnt].number}<br />{classList[cnt].name}</td>);
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
                <Rand />
                <GetCSV />

                {/* <Rand/>*/}
            </div>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));