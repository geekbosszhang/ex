import React, { Component } from 'react';
import BufferContentViewer from './components/bufferContentViewer';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.data = [{length: 16, tuple: {length: 32}},
            {length: 64, tuple: {length: 128}},
            {length: 64, tuple: {length: 128}},
            {length: 64, tuple: {length: 256}},
            {length: 64, tuple: {length: 16}},
            {length: 64, tuple: {length: 8}},
            {length: 64, tuple: {length: 56}},
            {length: 64, tuple: {length: 512}},
            {length: 64, tuple: {length: 72}},
            {length: 64, tuple: {length: 24}},
            {length: 64, tuple: {length: 1}},
            {length: 64, tuple: {length: 345}}
        ];
    }

    render() {
        return (
            <div className="App">
                <div className="buffer-content">
                    <BufferContentViewer data={this.data}/></div>
            </div>
        );
    }
}

export default App;
