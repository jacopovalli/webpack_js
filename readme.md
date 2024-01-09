
## 1. Configurazione del module.exports:

1. Abbiamo creato il progetto ed inizializzato con $npm init -y

2. Abbiamo installato le dipendenze utili al nostro progetto con WebPack tramite il comando di linea:

$npm i -D webpack webpack-cli webpack-dev-server css-loader style-loader html-webpack-plugin

Cosi, sono state installate le dipendenze di Webpack con il suo Command Line e il suo Dev Server, abbiamo scaricato anche le dipendenze per il CSS Loader, lo Style Loader e il Plugin per automatizzare HTML

3. Abbiamo aperto il file "package.json" e alla proprietà "script": {} abbiamo, inserito nell'oggeto tre nuove proprietà:

"dev": "webpack serve --mode=development",
"build": "webpack --mode=production",
"build:dev": "webpack --mode=development"

In questo modo abbiamo la possibilità di entrare in modalità development"server" con $npm run dev ; Modalità build: cioè la modalità di produzione, dove hai tutti i file minificati, lanciano $npm run build ; Abbiamo la modalità sviluppatore che mostra i file non minificati, quindi in visualizzazione per gli sviluppatori, lanciando $npm run build:dev

Infine, creiamo file webpack.config.js

4. Abbiamo, in webpack.config.js inizializzato una costante const path = require('path')
Abbiamo inizializzatto il module.exports = {
    //entry è la proprietà che contiene come oggetto il path del file di input:
    entry: {
        index: './src/index.js'
    },
    //output è la proprietà che prende un percorso (cartella) in output dando come nome al file creato nella cartella di outpunt , in questo caso, "bundle.js":
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
}

5. Abbiamo inizializzato una costante const HtmlWebpackPlugin = require('html-webpack-plugin');
Abbiamo aggiunto, sempre nel file webpack.config.js, all'oggetto module.exports una proprietà plugins:

//La proprietà plugins aggiunge, in un array, un nuovo plugin HtmlWebpackPlugin e darà come titolo del documento, il titolo indicato nella proprietà "title". Questo plugin permette di automatizzare la creazione in 'dist' del file html.
plugins: [
        new HtmlWebpackPlugin({
            title: 'Applicazione Webpack'
        })
    ],


6. Abbiamo aggiunto una nuova proprietà nell'oggetto module.exports, cioè module:

//La proprietà module è un oggetto che a sua volte contiene un array rules:
module:{
        rules:[
            //Nell' array Rules ogni modulo è a sua volta un oggetto:
            {
                //In questo modulo carichiamo (use:) un array con due loader (style-loader , css-loader) e viene caricato con un ordine che va da destra verso sinistra (prima css-loader poi style-loader). La proprietà test è un'espressione regolare che va ad identificare, in questo caso, tutti i file che terminano con l'estesione ".css":
                test: /\.css$/i,
                use: ['style-loader' , 'css-loader']
            }
        ]
    },

7. Abbiamo aggiunto un'ultima proprietà "devServer" all'oggetto module.exports:

//La proprietà devServer ci permetterà di visualizzare i cambiamenti in tempo reale automatizzati:
devServer: {
    //Il server sarà statico al percorso che fa riferimento alla cartella 'dist':
        static: path.resolve(__dirname , 'dist'),
        //open: true ci permette di aprire una nuova finestra del browser:
        open: true
    }

## 2. Gestione del Loader delle immagini e dei componenti


8. Creiamo una cartella 'src' ed una cartella 'dist' -> nella cartella 'src' creiamo una cartella 'components' -> all'interno della cartella components creiamo una cartella "logo" che sarà il nostro components ed al suo interno creiamo un file logo.js ed un file style.css ed importiamo anche il file .png che contiene il logo 'webpack'

9. Nel file logo.js importiamo sia il percorso del logo sia il percorso dello style.css

import logoImg from './logo.png';
import './style.css';

Successivamente, creiamo, all'interno del file logo.js, una funzione:

//Inizializziamo la funzione logo()
function logo() {
    //Inizializziamo una costante "logoDomImage" = una new Image (oggetto):
    const logoDomImage = new Image();
    //L'oggetto logoDomImage avrà una proprietà src = logoImg (Il percorso del file png importato)
    logoDomImage.src = logoImg;
    //Aggiungiamo all'oggetto logoDomImage una classe 'myLogo' che creeremo in CSS:
    logoDomImage.className = 'myLogo';
    //Rendiamo disponibile l'oggetto logDomImage al difuori dello scopo locale della funzione:
    return logoDomImage;
}

//Esportiamo la funzione logo e la rendiamo disponibile su altri file .JS:
export default logo;


10. Dopo aver completaato il file logo.js con la sua funzione logo() e il suo export, andiamo a importarte tutto il file logo.js all'interno dell'index.js ed appendiamo la funzione del body html:

//Importiamo la funzione logo() dal file logo.js
import logoFn from './componenti/logo/logo.js';
//Appendiamo al body html la funzione logo() (cioè ci aggiunge l'immagine src con la classe css):
document.body.appendChild(logoFn());


11. Per importare correttamente le immagini dobbiamo aggiungere un nuovo oggetto nell'array Rules:

{
    test: /\.(jpe?g|png|webp)$/i,
    type: 'asset/resource'
}

12. Installiamo la dipendenza optimize-image-loader per ottimizzare le immagini:

$ npm i -D img-optimize-loader


13. Nel file webpack.config.js andiamo a configurare il modulo del optimize-img-loader, andiamo a riprendere l'oggetto che contiene il caricamento delle immagini

    test: /\.(jpe?g|png|webp)$/i,
    type: 'asset/resource'

Andiamo a RIMUOVERE la proprietà type: 'asset/resource' che va a caricare l'immagine, ed al suo posto aggiungiamo:

use: {
    loader: 'img-optimize-loader',
    options: {
      compress: { mode: 'low' }
    }
  }

Questo proprietà use, utilizza un loader "img-optimize-loader" che va a comprimere l'immagine caricata attraversp una modalità di compressione specificata, in questo caso abbiamo definito 'low'. La proprietà compress è di riferimento alla proprietà options.