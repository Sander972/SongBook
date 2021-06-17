export interface Song {
    title: string;
    subtitle?: string;
    addedDate?: string;
    lyrics: string;
    id: number;
}

//import { File } from '@ionic-native/file/ngx';

const songs: Song[] = []

function updateSongsDb(){


}

export const upSongs = () => updateSongsDb();

export const getAllSongs = () => songs;

export const getSong = (title: string) => songs.find(m => m.title === title);

