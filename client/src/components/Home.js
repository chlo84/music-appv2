import React, { useEffect, useState } from 'react';
import AddSongs from './AddSong';
import AddArtist from './AddArtist';
import { getAllSongs } from './networkRequests';
import SongCard from './SongCard'
// import Song
export default function Home() {
    const [songs, setSongs] = useState([]);

    const refresh = () => {
        // to do make  dynamic! 
        getAllSongs().then(res => {
            setSongs(res);
        });


    }

    useEffect(refresh, []);

    return (
        <div>
            <AddSongs refresh={refresh} />
            <AddArtist refresh={refresh} />
            <ul className='song-card-container'>
                {songs.map(song => <SongCard song={song} key={song.id} />)}


            </ul>
        </div>
    )
}


