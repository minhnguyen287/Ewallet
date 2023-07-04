//Show modal
var dialog = document.getElementsByClassName("dialog");
var btnAddTransaction = document.getElementsByClassName("add__account-button");
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");
//Show modal when user click button Add Transaction
btnAddTransaction[0].onclick = function(){
	dialog[0].style.opacity = "1";
	dialog[0].style.visibility = "visible";

	//AJAX

	var oilProduct = document.getElementById("form__add-oil_product-name");
	var xhttp = new XMLHttpRequest();
	var url = ('./Ajax/ShowProductInfo');
	xhttp.onreadystatechange = handleResult;
	xhttp.open('GET',url);
	xhttp.send();
	function handleResult(){
		if (xhttp.readyState === XMLHttpRequest.DONE) {
			//console.log(JSON.parse(xhttp.responseText)[0].product_id);
			var arr = [];
			arr = JSON.parse(xhttp.responseText);	
			var code = "<option value='#' selected='selected' disabled>--Choose one--</option>";
			for (var i = 0; i < arr.length; i++) {
				code += "<option value='"+arr[i].product_id+"'>"+arr[i].product_name+" ("+arr[i].product_batch+")</option>";
			}
			oilProduct.innerHTML = code;
		}
	}
};

// let listProduct = document.getElementById('form__add-oil_product-name');
// let firstOption = listProduct.querySelectorAll('option')[0];

// listProduct.onclick = function(){
// 	console.log(firstOption);
// 	firstOption.style.visibility = "hidden";
// } 
//Hidden modal when user click button close
btnCloseModal[0].onclick = function(){
	dialog[0].style.opacity = "0";
	dialog[0].style.visibility = "hidden";
};
//Hidden modal when user click on window screen
window.addEventListener("click",function(event){
if (event.target == dialog[0]) {
		dialog[0].style.opacity = "1";
		dialog[0].style.visibility = "hidden";
	}
});

