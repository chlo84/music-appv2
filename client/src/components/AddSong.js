import React, { useState } from 'react';
import { addSong } from './networkRequests';

// class AddSong extends React.Component {
export default function AddSong(props) {
    const [state, setState] = useState({
        song_name: "",
        artist: "",
        duration: "",
        track_listing: ""
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value });
    }

    const onClick = () => {
        addSong(state);
    }

    const submitSong = () => {
        addSong(state)
            .then(refresh);
    }

     const refresh = () => {
        // to do make this dynamic! 
        setState({
        song_name: "",
        artist: "",
        duration: "",
        track_listing: ""
        });
        props.refresh();
     }
    return (
        <div className="add-song-wrap">
            <h1>Add Song!</h1>
            {/* need to use state because that is where the data is comoing from */}
            {/* array.map */
            Object.keys(state).map(key => <>
            <label>{key}</label>
            <input onChange={handleChange} name={key} value={state[key]} ></input> 
            </>)};
            
            
            
            <button onClick={submitSong}>Submit</button>
        </div>
    )
};


