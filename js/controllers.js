'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('GamePlay', ['$scope',function($scope) {
    $scope.tprop = "this is the test property";
    var neighbors = function(x,y){
        return [[x-1,y  ],
                 [x-1,y-1],
                 [x  ,y-1],
                 [x+1,y-1],
                 [x+1,y  ],
                 [x+1,y+1],
                 [x  ,y+1],
                 [x-1,y+1]].filter(function(coord){
                    return coord[0]>=0 && coord[0] < $scope.board[0].length &&
                        coord[1]>=0 && coord[1] < $scope.board.length;
                });
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
                sweep: function(){
                    if(this.swept) return;
                    if(this.mined){ alert("you suck, you're dead, and I hate you.");return;}
                    this.swept = true;
                    if(this.touching == 0){
                        //alert('sweepin the neighbors')
                        neighbors(this.x,this.y).map(function(coord){
                            //alert("zweeping "+coord[0]+", "+coord[1]);
                            $scope.board[coord[1]][coord[0]].sweep();
                        });
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
                neighbors(x,y).map(function(coord){
                    board[coord[1]][coord[0]].touching++;
                });
            }
        });
    });

  }])
  .controller('MyCtrl2', [function() {
    
  }]);