var domStrings = {
    startBtn: document.getElementById('start-btn'),
    inputBox: document.getElementById('input-box'),
    loader: document.getElementById('loader-wrapper')
};
var hostname = "http://ec2-65-0-113-228.ap-south-1.compute.amazonaws.com:8081";

//handles api calls and responses
var DataManipulator = () =>{
    var getDifficultyLevel = async (sentence) => {
        var options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `phrase=${sentence}`
        }
        
        return await fetch(`${hostname}/wordprocessor`, options);
    }   
    
    return {
        getDifficultyLevel: getDifficultyLevel
    }
}

var GuageMeter = () => {
    return new RadialGauge({
        renderTo: document.getElementById('guage-meter'), // identifier of HTML canvas element or element itself
        width: 300,
        height: 300,
        units: 'DIFFICULTY METER',
        title: false,
        value: 0,
        minValue: 1,
        maxValue: 6,
        majorTicks: [
            '1','2','3','4','5','6'
        ],
        minorTicks: 10,
        strokeTicks: false,
        highlights: [
            { from: 1, to: 2, color: 'rgba(0,255,0,.15)' },
            { from: 2, to: 3, color: 'rgba(255,255,0,.15)' },
            { from: 3, to: 4, color: 'rgba(255,30,0,.25)' },
            { from: 4, to: 5, color: 'rgba(255,0,225,.25)' },
            { from: 5, to: 6, color: 'rgba(0,0,255,.25)' }
        ],
        colorPlate: '#222',
        colorMajorTicks: '#f5f5f5',
        colorMinorTicks: '#ddd',
        colorTitle: '#fff',
        colorUnits: '#ccc',
        colorNumbers: '#eee',
        colorNeedleStart: 'rgba(240, 128, 128, 1)',
        colorNeedleEnd: 'rgba(255, 160, 122, .9)',
        valueBox: true,
        animationRule: 'linear'
    });
}

//post data from back end to ui
var UIController = ()=>{
    //creates an object of the Manipulator function
    var manipulate = DataManipulator();
    
    
    //gets a ref to guage class
    var gauge = GuageMeter();

    //guage responsiveness
    var MediaQueries = ()=>{
        window.onresize = (event)=>{
            if(event.target.innerWidth <= 1160){
            }
        }
    }
    
    // draw initially
    gauge.draw();

    //displats data on ui
    var disPlayResult = (result) =>{
        console.log(result);
        
        //hides loader
        domStrings.loader.style.display = 'none';
    }
    
    //handling button click event
    domStrings.startBtn.onclick = ()=>{
       
        
        if(domStrings.inputBox.value.trim() == ""){
            alert("Text required");
        }else{
            //displays loader
            domStrings.loader.style.display = 'flex';
            console.log("Sending")
            //sends text to api for processing
            manipulate.getDifficultyLevel(domStrings.inputBox.value.trim())
                .then((response)=> response.json()).then((response)=>{
                //displays result 
                disPlayResult(response);
                // console.log(response);
            }).catch((error)=>console.log(error));
        }
    }
}


UIController();
//xhttp = new XMLHttpRequest();
//
//xhttp.onreadystatechange = function(res){
//    console.log(res)
//};  
//
//xhttp.open("POST", "http://0303055e9fdf.ngrok.io/wordprocessor", true);
//xhttp.send("phrase=this is the phrase");


