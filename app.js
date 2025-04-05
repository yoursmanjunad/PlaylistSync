const express = require('express');
const request = require('request');
const crypto = require('crypto');
const cors = require('cors'); // Cross-Origin Resource Sharing
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const client_id = '401cee5bf9564287a0ed1a5b8e671869';
const client_secret = '9a22a08c088f416482bdcd2069396510';
const redirect_uri = 'http://localhost:8080/callback'; // Your redirect uri
const app = express();

const generateRandomString = (length)=> {
    return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0,length);
}

var stateKey = 'spotify_auth_state';
//method chaining to setup middleware
app.use(express.static(__dirname + '/public')) //Serve everything in the public folder as public-facing files.
   .use(cors())
   .use(cookieParser()); //Parse cookies from the request object
//Middleware to parse cookies from the request object. This allows us to access cookies in the request object.
app.get('/login', function(req, res){
    var state = generateRandomString(16); //Generate a random string of 16 characters
    res.cookie(stateKey, state); //Set a cookie with the name stateKey and the value of state
    //app requests authorizzation
    var scope = 'user-read-private user-read-email'; //Scope of the authorization request
    res.redirect('https://accounts.spotify.com/authorize?' + //Redirect to the Spotify authorization page
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state //Pass the state variable to the authorization request
        }));
    console.log(
        res.redirect('https://accounts.spotify.com/authorize?' + //Redirect to the Spotify authorization page
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state //Pass the state variable to the authorization request
            }))
    )
})

app.get('/callback', function(req, res){    
    var code = req.query.code || null; //Get the code from the query string
    var state = req.query.state || null; //Get the state from the query string
    var storedState = req.cookies ? req.cookies[stateKey] : null; //Get the stored state from the cookie
    if(state==null || state !== storedState){ //If the state is null or does not match the stored state
        res.redirect('/#' + //Redirect to the homepage with the error message
            querystring.stringify({
                error: 'state_mismatch'
            }));    
            


app.get('/', (req, res) => {
  res.send(`${generateRandomString(16)}`);
});
app.listen(3000);