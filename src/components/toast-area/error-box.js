import React from 'react';

export default function ErrorBox(props) {
    const errors = props.children;
    if (errors.length > 0) {
        return (
            <div id="error-box">
                <p>{errors[0]}</p>
            </div>
        );
    } else {
        return null;
    }
}
