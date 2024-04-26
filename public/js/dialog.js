function Dialog(options){
	//console.log(options)
	var dialogElement = document.querySelector(options.dialog);
	var buttonActivations = document.querySelectorAll(options.button);
	if(buttonActivations){
		buttonActivations.forEach(function(buttonActivation){
			buttonActivation.onclick = function(){
				dialogElement.style.opacity = 1;
				dialogElement.style.visibility = 'visible';
				dialogElement.querySelector('h2').innerText = options.custom.title || "Add a new transaction";
				if(options.type == "multiple"){
					dialogElement.querySelector(options.custom.btnHide).style.display = "none";
					dialogElement.querySelector(options.custom.btnDisplay).style.display = "";	
				}
			}
		})
	}
}
