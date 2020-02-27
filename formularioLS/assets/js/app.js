// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event Listeners
eventListeners();

// Funcion con todos los eventListeners.
function eventListeners () {
    // Cuando se envia el form ejecuto la funcion agregarTweet
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();
    // Levanto el valor que tenga el textarea y se lo asigno a una variable "tweet"
    const tweet = document.getElementById('tweet').value;
    // Creo boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    // Creo un elemento, le agrego el contenido del textarea y lo "append" al dom
    const li = document.createElement('li');
    li.innerText = tweet;
    // Añado el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // Añado el tweet a la lista
    listaTweets.appendChild(li);
    // Añado al local storage
    agregarTweetLocalStorage(tweet);

}

function borrarTweet(e) {
    e.preventDefault();
    // Mediante "delegation" selecciono donde se dara el click de eliminacion    
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Mostrar datos del local storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet){
        // Creo boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        // Creo un elemento, le agrego el contenido del textarea y lo "append" al dom
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añado el boton de borrar al tweet
        li.appendChild(botonBorrar);
        // Añado el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// Agrega tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();    
    // Agrego el nuevo tweet al arreglo
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Compruebo que haya elementos en local storage y los devuelvo en un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    // Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }    
    return tweets;
}

// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}