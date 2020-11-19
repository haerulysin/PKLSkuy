import React from 'react';

const Logo = (props) => {
    return (
        <img
            alt="Logo"
            src={require("../assets/img/LogoWhite.png")}
            {...props}
        />
    );
};

export default Logo;
