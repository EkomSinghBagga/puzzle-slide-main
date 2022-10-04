class Board{
    constructor(w,h){
        this.tiles = new Array(rows * cols);
        this.w = w;
        this.h = h;
        this.blankSpot = [Math.floor((this.tiles.length - 1) / rows),(this.tiles.length - 1) % rows];
        this.lastPiece;
    }

    setIndex(i,tile){
        this.tiles[i] = tile;
    }

    setLastPiece(tile){
        this.lastPiece = tile
    }

    renderLastPiece(){
        let tile = this.lastPiece
        let w = this.w;
        let h = this.h;
        let [i,j] = tile.getCurrIndexes()
        let x = j * w;
        let y = i * h;
        if(this.isSolved() || isOriginalShown){
            tile.img.copy(source,x,y,w,h,0,0,w,h)
            tile.drawOriginal()
            
        }else if(this.blankSpot[0] == cols - 1 && this.blankSpot[1] == rows - 1){
            fill(0)
            rect(x, y, w, h);

        }
    }

    updateTiles(source){
        let w = this.w;
        let h = this.h;
        for (let i = 0; i < this.tiles.length; i++) {
                let tile = this.tiles[i]
                if(tile != -1){
                    let x = Math.floor(tile.originPos / rows) * h;
                    let y = tile.originPos % rows * w;
                    tile.img.copy(source,y,x,w,h,0,0,w,h);
                }
            }
    }

    isNeighbor(t1){
        if (t1 == -1) return false;
        let [a1,a2] = this.blankSpot;
        let [i,j] = t1.getCurrIndexes();
        let c1 = abs(i - a1)
        let c2 = abs(j - a2)
        if((c1 != c2) && (c1 < 2) && c2 < 2) return true;
        return false;
    }

    move(i,j,pass = false){
        let index = i * rows + j;
        let tile = this.tiles[index];
        let a = pass? pass : this.isNeighbor(tile)
        let [a1,a2] = this.blankSpot
        if(a){
            isFirstRender = false;

            let blankIndex = a1 * rows + a2;

            let temp = this.tiles[index];
            this.tiles[index] = this.tiles[blankIndex]
            this.tiles[blankIndex] = temp;
            this.blankSpot = [i,j]
            tile.setIndex(blankIndex);

        }
    }

    shuffleTiles(){
        for(let i = 0;i < (cols + rows) * 7;i++){
            var movableTiles = this.tiles.filter(tile=>{
                if(this.isNeighbor(tile)) return tile;
            })
            let tile = movableTiles[Math.floor(Math.random() * movableTiles.length)]
            let currIndexes = tile.getCurrIndexes()
            this.move(currIndexes[0],currIndexes[1],true)
        }

    }

    isSolved(){
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if(tile.originPos != tile.currPos){
                return false
            }
        }
        return true
    }
    
    draw(){
        for (let i = 0; i < this.tiles.length; i++) {
                if(isOriginalShown){
                    this.tiles[i] != -1 && this.tiles[i].drawOriginal();
                    continue
                }
                this.tiles[i] != -1 && this.tiles[i].draw();
                
            }
    }
}
