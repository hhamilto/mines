

/*$(document).ready(function(){
    //alert("yo");
});
var Mines = (function(){
    return {
        initialize: function(){
            alert("initin");
            _.bindAll(this, "render", "create");
            $("#create").click(this.create);
        },
        create: function(){
            this.cols = Number($('#columns').val()) || 10;
            this.rows = Number($('#rows').val()) || 10;
            this.board = [];
            for(var i = 0; i< this.rows; i++){
                var row = [];
                for(var j = 0; j<this.cols; j++){
                    var tile = {
                        swept:false,
                        marked:false,
                        initialize: function(){
                                _.bindAll(this, "sweep", "mark");
                            },
                        mined: Math.random()>.5,
                        sweep: function(){
                                alert("imma bein swpet");
                                this.swept = true;
                                function.prototype.call(this,this.render);
                            },
                        mark: function(){
                                this.marked = true;
                                Mines.render();
                                alert("imma bein marked");
                            }
                    };
                    tile.initialize();
                    row.push(tile);
                }
                this.board.push(row);
            }
            this.render();
        },
        render: function(){
            $('#board').html('');
            this.board.map(function(row){
                var domRow = $('#board').append('<div class="row"></div>').last('.row');
                row.map(function(t){
                    domRow.append('<div class="tile '+
                        (t.swept?'swept ':'')+
                        (t.swept&&t.mined?'blood ':'')+
                        '"></div>').last('.tile').click(t.sweep);
                });
            });
            //var boardWidth = $('#board').width
            $('.tile').css("width",100/this.cols+'%')
            .css("height",100/this.rows+'%')
            //.click(this.sweep);
        }
    };
})();

Mines.initialize();

/*
function(){
    

});

function render(){

}*/
