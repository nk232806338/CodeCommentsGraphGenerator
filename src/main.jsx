require('./style/app.scss');

var React = require('react');
var ReactDOM = require('react-dom');

//var arrayXY = [
//    [{mark: '+', type: 'plus'}, {mark: '—'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '+'}],
//    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
//    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
//    [{mark: '|'}, {mark: ' '}, {mark: 'a'}, {mark: 'b'}, {mark: 'c'}, {mark: 'd'}, {mark: ' '}, {mark: ' '}, {mark: ' '}, {mark: '|'}],
//    [{mark: '+'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '-'}, {mark: '+'}]
//];

var size = 50;

var Mark = function() {
    this.mark = '*';
    this.type = '';
};

function initializeCoordinates() {
    var arrayXY = [];
    for (var i=0; i<size; i++) {
        var xLine = [];
        for (var j=0; j<size; j++) {
            xLine.push(new Mark);
        }
        arrayXY.push(xLine);
    }
    return arrayXY;
}

var arrayXY = initializeCoordinates();

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


var XYNode = React.createClass({

    render: function() {
        return (
            <section className={ this.props.type }>
                <em>{ this.props.children }</em>
            </section>
        );
    }
});


var CommentBox = React.createClass({
    render: function() {
        var XYNodes = this.props.data.map(function(x_line) {
            return x_line.map(function(xy_node) {
                return (
                    <XYNode type={xy_node.type}>
                        {xy_node.mark}
                    </XYNode>
                );
            });
        });
        return (
            <div className="coordinates" style={ {width: size * 11 + 'px'} }>
                {XYNodes}
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={ arrayXY } title={ {name: 'title'} } />,
    document.querySelector('.painting-content-wrapper')
);
