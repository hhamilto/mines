'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('GamePlay', ['$scope',function($scope) {
    function won(){
        return $scope.board.reduce(function(p,c){return p && c.reduce(function(p,c){return p && (c.mined?true:c.swept);}, true);}, true);
    }
    $scope.board = [];
    for(var i = 0; i < 8; i++){
        var row = []
        for(var j = 0; j < 10; j++){
            row.push({
                flagged: false,
                swept: false,
                touching: 0,
                x:j,
                y:i,
                neighbors: function(){
                    return [[this.x-1,this.y  ],
                            [this.x-1,this.y-1],
                            [this.x  ,this.y-1],
                            [this.x+1,this.y-1],
                            [this.x+1,this.y  ],
                            [this.x+1,this.y+1],
                            [this.x  ,this.y+1],
                            [this.x-1,this.y+1]].filter(function(coord){
                                return coord[0]>=0 && coord[0] < $scope.board[0].length &&
                                    coord[1]>=0 && coord[1] < $scope.board.length;
                            }).map(function(coord){
                                return $scope.board[coord[1]][coord[0]];
                            });
                },
                sweep: function(){
                    if(this.flagged || this.swept) return;
                    if(this.mined){ alert("you suck, you're dead, and I hate you.");return;}
                    this.swept = true;
                    if(this.touching == 0){
                        this.neighbors().map(function(e){e.sweep()});
                    }
                    if(won()) alert("ya won");
                },
                resweep: function(){
                    if(this.touching == this.neighbors().filter(function(tile){return tile.flagged}).length){
                        this.neighbors().map(function(e){e.sweep()});
                    }
                }
            });
            row.last().sweep = row.last().sweep.bind(row.last());
        }
        $scope.board.push(row);
    }
    $scope.board.map(function(row,y,board){
        row.map(function(tile,x,row){
            if(Math.random()<.19){
                tile.mined = true;
                tile.neighbors().map(function(neighbor){
                    neighbor.touching++;
                });
            }
        });
    });

  }])
  .controller('MyCtrl2', [function() {
    
  }]);