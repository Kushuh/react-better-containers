import './index.css';
import ReactDOM from 'react-dom';
import * as React from "react";
import './index.css';
import TextDemo from './demos/TextDemo';

ReactDOM.render(
    React.createElement(TextDemo, {}, null),
    document.getElementById('root')
);