DROP TABLE songs;
DROP TABLE artists;


CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    img TEXT
);

CREATE TABLE songs (
    song_id SERIAL PRIMARY KEY,
    artistId INT REFERENCES artists(id),
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    play_count VARCHAR(50),
    img TEXT
);

INSERT INTO artists VALUES(DEFAULT, 'Jay Z', 52, 'https://d.newsweek.com/en/full/1680889/jay-z.jpg?w=1600&h=1600&q=88&f=63045fa86de2827048f55ce29dda74a4');
INSERT INTO songs VALUES (DEFAULT, 1,'Song Cry', '5:03', 0, 'https://i.etsystatic.com/25672613/r/il/ea3529/3671675969/il_794xN.3671675969_apso.jpg');
