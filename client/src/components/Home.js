import React, { useEffect, useState } from 'react';
import AddSongs from './AddSong';
import { getAllSongs } from './networkRequests';
import AddArtist from './AddArtist';

// import Song
export function Home() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        refresh();
    })

    const refresh = () => {
        // to do make  dynamic! 
        getAllSongs.then(res => {
        setSongs(res);
        });
        
        
     }

    
        return (
            <div>
                <AddSongs refresh={refresh}/>
                <AddArtist refresh={refresh}/>
                
                <ul>
                    {songs.map(song => <li key={song.id}>{song.name}</li>)}
                </ul>
            </div>
        )
    }


export default Home;