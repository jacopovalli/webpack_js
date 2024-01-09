import logoImg from './logo.png';

import './style.css';

function logo(){
    const logoDomImage = new Image();
    logoDomImage.src = logoImg;
    logoDomImage.className = 'myLogo';
    return logoDomImage;
}

export default logo;
