# spotify
Spotify App using React + Redux
Web app using Spotify’s developer’s API. Added functionalities like:
-	Playing a song (with local playback controls)
-	Fetch recommendations, popular releases and genres
-	Creating/Modifying a playlist. Adding songs to a playlist.
-	Follow/Unfollow artists 
-	Search for a song/artist 


Requirements:
1. You need to have access to Spotify's developer API(https://developer.spotify.com/documentation/web-api/). Generate client_id and secret key by signing in.
2. For local playback features, you need to have web playback SDK token(https://developer.spotify.com/documentation/web-playback-sdk/quick-start/) which requires spotify's premium membership.


Setting up code in local:
1. run 'npm install' in main folder and 'spotifyWebAPIAuth' folder as well.
2. Paste your client_id and secret in 'spotifyWebAPIAuth>authorization_code>app.js' line no. 16, 17.
2. run 'node app.js' in 'spotifyWebAPIAuth' folder. Launch localhost:8888 in browser. Generate spotify auth token. Copy it and paste it in public/index.html (line 64).
3. For local playback, generate SDK token from 'https://developer.spotify.com/documentation/web-playback-sdk/quick-start/' and paste it in public/index.html (line 66).
4. Launch the react app by running 'npm start' in main folder.




NOTE:
The main purpose of developing this app was to get some hands on react/redux and explore some of the core functionalities. There's a lot of scope for improvement in areas like CSS reusablity, componentization ect which I'll be fixing in future commits.
