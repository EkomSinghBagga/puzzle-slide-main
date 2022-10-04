var rows = 3;
var cols = 3; 
var tempRows = 3;
var tempCols = 3;
var w,h;
var board;
var source;
var currImage;
var isOriginalShown = false;
var sourceTypeImg = true;
var isFirstRender;
var cnvContainer;

function gotFile(file){
    preload(file.data)
}

function preload(myImg = "media/defaultImage.jpeg"){
    currImage = loadImage(myImg);
    changeToImage()
    closePopup()
}

function setup() {
    isFirstRender = true;
    cnvContainer = select(".cnv-container")
    let cnv = createCanvas(600, 600);
    cnv.parent(cnvContainer)
    cnv.drop(gotFile);

    cnvContainer.center("horizontal")
   
    w = width / rows;
    h = height / cols;

    board = new Board(w,h);
    for (let i = 0; i < rows * cols; i++) {
            let img = createImage(w,h)
            let tile = new Tile(i,img,w,h);
            board.setIndex(i,tile);
    }
    board.setLastPiece(board.tiles[rows * cols - 1])
    board.tiles[rows * cols - 1] = -1
}

function mousePressed(){
    let i = floor(mouseY / h);
    let j = floor(mouseX / w);
    if( i < cols && j < rows && i > -1 && j > -1 && !isOriginalShown) board.move(i,j) 
    
}

function draw(){
    if(sourceTypeImg){
        source.resize(600,600)
    }

    background(0)
    board.updateTiles(source)
    board.draw();
    if(!board.isSolved() && !isOriginalShown){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              let x = i * w;
              let y = j * h;
              strokeWeight(2);
              noFill();
              rect(x, y, w, h);
            }
          }  
    }

    board.renderLastPiece()

    if(board.isSolved() && !isOriginalShown && !isFirstRender){
        filter(BLUR,2)
        textAlign(CENTER, CENTER);
        fill(255)
        textSize(width / 10);
        text("YOU WIN!", width / 2, height / 2)
    }
}

function windowResized(){
    cnvContainer.center("horizontal")

}