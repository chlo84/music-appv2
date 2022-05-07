import React, { useState } from 'react';
import { addArtist } from './networkRequests';

export default function AddArtist(props) {
    const [state, setState] = useState({
        name: "",
        age: "",
        img: ""
    });
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const submitArtist = () => {
        addArtist(state)
            .then(refresh);
    }

    
    const refresh = () => {
        setState({
            name: "",
            age: "",
            img: ""
        });
    
    
        props.refresh();
    }

    return (

        <div className="add-song-wrap">
            <h1>Add Artist</h1>
            {/* Need to use state because thats where the data is
            Array.map*/
                Object.keys(state).map(key => <>
                    <label>{key}</label>
                    <input onChange={handleChange} name={key} value={state[key]} />
                </>)}
            <button onClick={submitArtist}>Submit</button>
        </div>

    )

}






