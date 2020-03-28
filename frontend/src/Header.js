import React from 'react';

export default function Header(props) {
    return (
        <header>
            {/* Para pegar o conteúdo da props   */}
            {/* <h1>{props.title}</h1> */}

            {/* Para pegar o conteúdo Children */}
            <h1>{props.children}</h1>
        </header>
    );
}