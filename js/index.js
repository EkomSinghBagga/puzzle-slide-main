const popupContainer = document.querySelector(".popup-container")
const chk = document.getElementById('chk');
const rowsInput = document.getElementById("rows")
const colsInput = document.getElementById("cols")
const toggleImageBtn = document.getElementById("toggle-image-btn");
const winSpan = document.querySelector(".win");

function handleShuffle(){
    board.shuffleTiles()
}

function toggleOriginalImage(){
    if(toggleImageBtn.innerText == "Show Original Image"){
        toggleImageBtn.innerText = "Hide Original Image"
    } else{
        toggleImageBtn.innerText = "Show Original Image"

    }

    isOriginalShown = !isOriginalShown
}

function changeToVideo(){
    source = createCapture(VIDEO)
    source.size(600,600)
    source.hide()
    sourceTypeImg = false

}

function changeToImage(){
    !sourceTypeImg && source.remove()
    source = currImage;
    sourceTypeImg = true
}

function closePopup(){
    popupContainer.style.display = "none";
    isOriginalShown = false;
}

function openPopup(){
    popupContainer.style.display = "flex";
    isOriginalShown = true
}

var uploadImage = function(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        preload(dataURL)
    };
    reader.readAsDataURL(input.files[0]);

};

function blockClose(event){
    event.stopPropagation();

}

function resize(){
    rows = tempRows;
    cols = tempCols;
    setup()
}

function handleRowsChange(){
    if(rowsInput.value < 2){
        rowsInput.value = 2
    } else if(rowsInput.value > 10){
        rowsInput.value = 10
    }

    tempRows = rowsInput.value
}

function handleColsChange(){
    if(colsInput.value < 2){
        colsInput.value = 2
    } else if(colsInput.value > 10){
        colsInput.value = 10
    }

    tempCols = colsInput.value
}

// https://stackoverflow.com/questions/70867659/p5-js-getting-an-array-of-all-available-video-devices-webcams-with-id
chk.addEventListener('change', () => {
    navigator.mediaDevices.enumerateDevices().then(getDevices);

    if(sourceTypeImg){
        changeToVideo()

    } else{
        changeToImage()
    }
    
});

function getDevices(devices) {
    var warning = select("#warning");
    if(devices.length > 3){
        warning.style("display","none")
    } else{
        warning.style("display","flex")
    }
}