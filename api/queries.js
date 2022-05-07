const Pool = require('pg').Pool;

const pool = new Pool({
    // user: 'postgres',
    // // host: 'localhost',
    // host: 'music.c7xclwu5il92.us-east-1.rds.amazonaws.com',
    // database: 'music',
    // password: 'postgres',
    // port: 5432
    connectionString: process.env.PSQL_CONNECTION
});

const getAllSongs = (req, res) => {
    pool.query('SELECT * FROM songs', (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}
const allowTables = ['songs', 'artists'];
const getAll = (req, res) => {
    if(!allowTables.includes(req.params.tableName)){
        res.status(404).send('error: table not found')
        return
    }
    pool.query(`SELECT * FROM ${req.params.tableName}`, (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getAllRows = (req, res) => {
    // conditionally check the table
    // songs or artists
    if(!allowedTables.includes(req.params.tableName)){
        res.status(404).send('Error: Table not found');
        return;
    }
    pool.query(`SELECT * FROM ${req.params.tableName}`, (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}


const createRow = (req, res) => {
    if(!allowedTables.includes(req.params.tableName)){
        res.status(404).send('Error: Table not found');
        return;
    }
    try {
       
        // gives us an array of all the keys on req.body
        const keys = Object.keys(req.body);
        // gives us an array of all the values on req.body
        const values = Object.values(req.body);
        pool.query(
            `INSERT INTO ${req.params.tableName} (${keys.join(',')}) VALUES (${keys.map((a,i)=>`$${i+1}`).join(',')}) RETURNING *`,
            values,
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};


const updateRow = (req, res) => {
    if(!allowedTables.includes(req.params.tableName)){
        res.status(404).send('Error: Table not found');
        return;
    }
    try {
        // gives us an array of all the keys on req.body
        const keys = Object.keys(req.body);
        // gives us an array of all the values on req.body
        const values = Object.values(req.body);
 
        // create an update that accepts all the arguments from the req.body and turns them into a psql arugement string
        const psqlArgs = keys.map((columnName, i)=>`${columnName} = $${i+1}`).join(',')
 
        // UPDATE songs SET name = 'Girlfriend', duration = '3:05' WHERE id = 4;
        // UPDATE songs {SET name = $1, duration = $2} WHERE id = 4, ['Girlfiend', '3:05'];
        const query = `UPDATE ${req.params.tableName} SET ${psqlArgs} WHERE id = ${req.body.id} RETURNING *`;
        console.log(query);
        pool.query(query, values, (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const deleteRowById = (req, res) => {
    if(!allowedTables.includes(req.params.tableName)){
        res.status(404).send('Error: Table not found');
        return;
    }
    const query = `DELETE FROM ${req.params.tableName} WHERE id = ${req.params.id}`;
    console.log(query);
    try{
        pool.query(query, values, (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows)
        });
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
    
}

const getAllArtists = (req, res) => {
    pool.query('SELECT * FROM artists', (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}


const addSong = (req, res) => {
    try {
        const { song_name, artist, duration, play_count, track_listing } = req.body;
        pool.query(
            `INSERT INTO songs (song_name, artist, duration, play_count, track_listing) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [song_name, artist, duration, play_count, track_listing],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const addArtist = (req, res) => {
    try {
        const { name, age, img } = req.body;
        pool.query(
            `INSERT INTO artists (name, age, img)VALUES ($1, $2, $3) RETURNING *`,
            [name, age, img],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const deleteSongById = (req, res) => {
    const song_id = parseInt(req.params.song_id);

    pool.query(`DELETE FROM songs WHERE song_id=${song_id}`, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateSongNameById = (req, res) => {
    const { song_id } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // Adding to our UPDATE sql statement
    const configureString = () => {
        // Building the column / value pairs after our SET keyword 
        let sqlStatement = '';
        // Iterating over our keys from our request body and building our sqlStatement
        for(let i = 0; i < keys.length; i++){
            // If we are looking at the last key, we want to omit the comma...
            if(i === keys.length-1) sqlStatement += `${keys[i]}=$${i+1}`
            // ... otherwise, we want to add it because there are more column/value pairs
            else sqlStatement += `${keys[i]}=$${i+1}, `
        }
        return sqlStatement;
    }

    pool.query(
        `UPDATE songs SET ${configureString()} WHERE song_id=$${keys.length+1}`,
        [...values, song_id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
}

module.exports = {
    addSong,
    getAllSongs,
    deleteSongById,
    updateSongNameById,
    getAllArtists,
    addArtist,
    getAllRows,
    createRow,
    updateRow,
    deleteRowById
}