var fs = require('fs');

var stream = fs.createWriteStream("my_file.js");
stream.once('open', function (fd) {
    wrapperNotes();
    draw(stream);
    stream.end();
});


/**
 *
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 *
 *
 *
 *
 */

var arrayXY = [
    [{mark: '+'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '+'}],
    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
    [{mark: '+'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '+'}]
];

function wrapperNotes() {
    var notesBegin = '/**',
        notesEnd = ' */',
        single = ' *  ';
    for (var i = 0; i < arrayXY.length; i++) {
        var row = arrayXY[i];
        row.unshift({mark: single});
    }
    arrayXY.unshift([{mark: notesBegin}]);
    arrayXY.push([{mark: notesEnd}]);
}

function draw(stream) {
    for (var i = 0; i < arrayXY.length; i++) {
        var row = arrayXY[i];
        for (j = 0; j < row.length; j++) {
            stream.write(row[j].mark);
        }
        stream.write("\n");
    }
}

