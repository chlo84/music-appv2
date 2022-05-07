import {useState} from 'react'

export default function SongCard(props){
    const {song} = props;
    const {data, setData} =useState({});
    const {editing, setEditing} =useState(false);
    const toggleEdit = () => setEditing(!editing);
    const updateSongClick = () => {
        
    }
        return <li>
        <img src={props.song.img} alt={props.song.name}/>
        {song.name} 
        {editing &&<>
        <button>Submit</button>
        <button onClick={toggleEdit}>Cancel</button>
        </>}
    </li>
}