//Show modal
var dialog = document.getElementsByClassName("dialog");
var btnAddTransaction = document.getElementsByClassName("add__account-button");
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");

//Show modal when user click button Add Transaction
btnAddTransaction[0].onclick = function(){
	dialog[0].style.opacity = "1";
	dialog[0].style.visibility = "visible";	
	var url = ('./Ajax/ShowLastOption');
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = handleResult;
	xhr.open("GET",url);
	xhr.send();
	function handleResult(){
		let curentDate = new Date().toJSON().slice(0, 10);
		if (xhr.readyState === XMLHttpRequest.DONE) {
			var data = JSON.parse(xhr.responseText);
			document.getElementById("form__add-start_day").value = data.end_day;
			document.getElementById("form__add-end_day").value = curentDate;
			document.getElementById("form__add-start_kilometer").value = data.end_km;
		}
	}
};

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

//AJAX load option product
window.addEventListener("load",(event)=>{
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
			let templateFrag = document.querySelector("#product-option").content;

			for (var i = 0; i < arr.length; i++) {
				let tmpl = templateFrag.cloneNode(true);
				tmpl.querySelector('option').setAttribute("value",arr[i].product_id);
				tmpl.querySelector('option').innerText = arr[i].product_name+" ("+arr[i].product_batch+")";
				oilProduct.appendChild(tmpl);
			}
		}
	}
})



