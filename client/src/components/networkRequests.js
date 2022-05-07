const api = 'http://localhost:3030'

export const getAllSongs = async () => {
    // const songs = await fetch("http://ec2-3-95-222-148.compute-1.amazonaws.com:3030/songs");
    console.log("good to go??")
    const songs = await fetch("http://localhost:3030/songs");
    return songs.json();
}

export const addSong = async (song) => {
    try {
        const holdResponse = await fetch("http://localhost:3030/songs", {
        // const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}

export const addArtist = async (artist) => {
    try {
        const holdResponse = await fetch("http://localhost:3030/artists", {
        // const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artist)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}
export const getAllArtists = async () => {
    // const songs = await fetch("http://ec2-3-95-222-148.compute-1.amazonaws.com:3030/songs");
   
    const artists = await fetch("http://localhost:3030/artists");
    return artists.json();
}

export const getAllFromTable = async table => {
    console.log("good to go??")
    const songs = await fetch(`${api}/${table}`);
    return songs.json();
}

export const createRow = async (table,data) => {
    try {
        const holdResponse = await fetch(`${api}/${table}`, {
        // const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}

export const updateRowInTable = async (table, data) => {
    try {
        const holdResponse = await fetch(`${api}/${table}`, {
        // const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/songs", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}