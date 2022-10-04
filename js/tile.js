class Tile{
    constructor(originPos,img,w,h){
        this.originPos = originPos;
        this.currPos = originPos;
        this.img = img;
        this.w = w;
        this.h = h;

    }

    setIndex(index){
        this.currPos = index;
    }

    getCurrIndexes(){
        // You may confuse that which one is the i and which one is j because sometimes they have changed. It's kinda confusing.
        // I relize that my matrix was transpose.
        //  Just grab a pen and visulize the draw function.
        let j = this.currPos % rows
        let i = Math.floor(this.currPos / rows)
        return [i,j]
        
    }

    drawOriginal(){
        let j = this.originPos % rows
        let i = Math.floor(this.originPos / rows)
        image(this.img,j * this.w,i * this.h,this.w,this.h)

    }

    draw(){
        let [i,j] = this.getCurrIndexes()
        image(this.img,j * this.w,i * this.h,this.w,this.h)
    }
}