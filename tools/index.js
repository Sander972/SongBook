const fs = require("fs");
var path = require('path');

const chordprojs = require("chordprojs")
const listF = require("./listFile");

var htmlSongsFolder = path.join(__dirname, 'converted');

var counter =0;


main();

async function main() {
    var allSongs = listF.walk("./db/a", function (err, results) {
        if (err) throw err;
        //console.log(results);
    });

    //console.log(allSongs);

    console.log("started conversion");

    try {
        allSongs.forEach(file => {
            //console.log("converting:", file)
            chordToHtmlFile(file, htmlSongsFolder)
        });
    } catch (error) {
        console.log(error);
    }

    counter =0;

}




function chordToHtmlFile(filePath, destFolder) {
    var err = false;
    var songTitle = path.basename(filePath, '.chopro');
    var fileExt = path.extname(filePath);

    var htmlPath = path.join(destFolder, songTitle + ".html");

    if (filePath == null) {     //null file
        console.log("skipped:", filePath)
        return;
    }
    if (fileExt != ".chopro") {     //is a chordPro file?
        return;
    }
    if(fs.existsSync(htmlPath)){        //skip if file already exist todo: add averwrite flag
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            err = true;
            throw error;
        }


        try {
            var chordSheet = data.toString();

            if (chordSheet == null) {
                return;
            }

            var song = chordprojs.parse(chordSheet);

            if (song == null) {
                return;
            }

            var html = song.render();

        } catch (error) {
            //console.log(error)
            err = true;
            console.log("err with:", filePath)
        }


        //console.log("htmlpath:", htmlPath);
        //err=true;
        if (!err) {
            fs.writeFile(htmlPath, html, function (err) {
                if (err){
                    console.log(err);
                } 
                err=true; 
                //console.log('Hello World > helloworld.txt');
                //console.log("file write ok");
            });
        }

        if(!err){
            console.log("converted " + counter++ + "files")
        }

    });
}
