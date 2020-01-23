import React from 'react';

const Errors = (props) => {
    const style = {
        color: 'red',
        listStyle: 'none'
    };
    const { errors } = props;
    const list = Object.values(errors).map((error, index) => <li key={index}>{error[0]}</li>);
    return (<ul style={style}>{list}</ul>);
};

export default Errors;
