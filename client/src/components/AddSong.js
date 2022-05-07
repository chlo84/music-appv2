import React, { useState, useEffect } from 'react';
import { addSong, getAllArtists } from './networkRequests';

// class AddSong extends React.Component {
export default function AddSong(props) {
    const [state, setState] = useState({
        name: "",
        artistId: "",
        duration: "",
        play_count: "",
        img: ""
    });
    const [artists, setArtists] = useState([])

    useEffect(() => {
        getAllArtists().then(res => {
            setArtists(res);
        });
    }, [])

    console.log(artists)

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const submitSong = () => {
        console.log(state)
        addSong(state)
            .then(refresh);
    }

    const refresh = () => {
        // to do make this dynamic instead of statically resetting! 
        setState({
            name: "",
            artistId: "",
            duration: "",
            play_count: "",
            img: ""
        });
        props.refresh();
    }
    return (
        <div className="add-song-wrap">
            <h1>Add Song!</h1>
            {/* need to use state because that is where the data is comoing from */}
            {/* array.map */
                Object.keys(state).map(key => {
                    if (key === 'artistId') {
                        return (
                            <div key={key}>
                                <label>Artist</label>
                                <select onChange={handleChange} name='artistId' value={state.artistId}>
                                    <option value=''></option>
                                    {artists.map(artist => {
                                        return <option value={artist.id}>{artist.name}</option>
                                    })}
                                </select>
                            </div>
                        )
                    } else {
                        return (
                            <div key={key}>
                                <label>{key}</label>
                                <input onChange={handleChange} name={key} value={state[key]} />
                            </div>
                        )
                    }
                })}
            <button onClick={submitSong}>Submit</button>
        </div>
    )
}


