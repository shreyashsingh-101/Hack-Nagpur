var mySeconds;
var intervalHandle;

function resetPage(){
	document.getElementById("inputArea").style.display="";	
	clearInterval(intervalHandle);
	document.getElementById("time").innerHTML = "0:00";
	
}

function showNotification() {
	const notification = new Notification("Well Done!!! Timer Completed ", {
	   body: "Well Done buddy, keep being productive!!! ",
	})
 }

function tick(){
	var timeDisplay=document.getElementById("time");
	
	var min=Math.floor(mySeconds/60);
	var sec=mySeconds-(min*60);
	
	if (sec < 10) {
		sec="0"+sec;
	}
	
	var message=min.toString()+":"+sec;
	
	timeDisplay.innerHTML=message;
	
	if(mySeconds===0){
		showNotification();
		clearInterval(intervalHandle);
		resetPage();
	}
	mySeconds--;
	
	
}
function startCounter(){
	var myInput=document.getElementById("minutes").value;
	if (isNaN(myInput)){
		alert("Type a valid number please");
		return;
	}
	mySeconds=myInput*60;
	
	intervalHandle=setInterval(tick, 1000);
	
	document.getElementById("inputArea").style.display="none";
	
	
}


window.onload=function(){
	var myInput=document.createElement("input");
	myInput.setAttribute("type","text");
	myInput.setAttribute("id","minutes");
	
	var myButton=document.createElement("input");
	myButton.setAttribute("type","button");
	myButton.setAttribute("value","Start Timer");
	
	myButton.onclick=function(){
		startCounter();	
		
	}
	document.getElementById("inputArea").appendChild(myInput);
	document.getElementById("inputArea").appendChild(myButton);
	
	
}

console.log(Notification.permission);
if (Notification.permission === "granted") {
   console.log("we have permission");
} else if (Notification.permission !== "denied") {
   Notification.requestPermission().then(permission => {
	  console.log(permission);
   });
}