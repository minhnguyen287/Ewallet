
var dialog = document.getElementsByClassName("dialog");
var btnAddTransaction = document.getElementsByClassName("add__account-button");
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");

/* Hiện Modal thêm 1 bản ghi lịch sử thay dầu khi click vào nút "Add Transaction" */
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
			document.getElementById("form__add-end_kilometer").value = null;
		}
	}
};

/* Ẩn Modal thêm bản ghi khi click vào dấu X */
btnCloseModal[0].onclick = function(){
	dialog[0].style.opacity = "0";
	dialog[0].style.visibility = "hidden";
};

/* Ẩn Modal thêm bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
if (event.target == dialog[0]) {
		dialog[0].style.opacity = "1";
		dialog[0].style.visibility = "hidden";
	}
});

/* Tự động load ra thông tin sản phẩm dầu nhớt trong bảng tuỳ chọn thêm 1 bản ghi lịch sử thay dầu*/
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

/* Validate dữ liệu nhập vào form Modal thêm 1 bản ghi lịch sử thay dầu */

	var startKm = document.getElementById("form__add-start_kilometer");
	var endKm = document.getElementById("form__add-end_kilometer");
	var product = document.getElementById("form__add-oil_product-name");
	var startDay = document.getElementById("form__add-start_day");
	var endDay = document.getElementById("form__add-end_day");

	var isCorrectInput = ["product","endKm"];

	function removeErrorCode(errArray,errKey){
		if (errArray.indexOf(errKey)!=-1) {
			errArray.splice(errArray.indexOf(errKey),1);
		}
	}

	function addErrorCode(errArray,errKey){
		if (errArray.indexOf(errKey)==-1) {
			errArray.push(errKey);
		}
	}	

	product.addEventListener("change",function(){
		if (/^[0-9]+$/.test(product.value)) {
			removeErrorCode(isCorrectInput,"product");
		} else {
			addErrorCode(isCorrectInput,"product");
		}
		product[0].style.display = "none";
		if (isCorrectInput.length === 0) {
			document.querySelector(".add__transaction-button").removeAttribute("disabled");
			document.getElementById("product_info").innerText = "";
		} else {
			document.querySelector(".add__transaction-button").setAttribute("disabled","disabled");
		}
	})
	
	startKm.addEventListener("keyup",function(){
		if(/^[0-9]+$/.test(startKm.value)){
			document.getElementById("start_km_info").innerText = "";
			removeErrorCode(isCorrectInput,"startKm");
			
		} else{
			document.getElementById("start_km_info").innerText = "Định dạng số không hợp lệ";
			addErrorCode(isCorrectInput,"startKm");
		}
		if (isCorrectInput.length === 0) {
			document.querySelector(".add__transaction-button").removeAttribute("disabled");
		} else {
			document.querySelector(".add__transaction-button").setAttribute("disabled","disabled");
		}
	})

	endKm.addEventListener("keyup",function(){
		if(/^[0-9]+$/.test(endKm.value)){
			document.getElementById("end_km_info").innerText = "";
			removeErrorCode(isCorrectInput,"endKm")	
		} else{
			document.getElementById("end_km_info").innerText = "Định dạng số không hợp lệ";
			addErrorCode(isCorrectInput,"endKm")	
		}
		if (isCorrectInput.length === 0) {
			document.querySelector(".add__transaction-button").removeAttribute("disabled");
		} else {
			document.querySelector(".add__transaction-button").setAttribute("disabled","disabled");
		}
	})

let btnAddNewTrans = document.querySelector(".add__transaction-button");
btnAddNewTrans.addEventListener("click",function(){
	if (isCorrectInput.length !== 0) {
		if (isCorrectInput.indexOf("startKm")!=-1) {
			document.getElementById("start_km_info").innerText = "Định dạng số không hợp lệ";
		}
		if (isCorrectInput.indexOf("endKm")!=-1) {
			document.getElementById("end_km_info").innerText = "Định dạng số không hợp lệ";
		}
		if (isCorrectInput.indexOf("product")!=-1) {
			document.getElementById("product_info").innerText = "Vui lòng chọn 1 tuỳ chọn";
		}
	} else{
		var data = {startDay:startDay.value,
					endDay:endDay.value,
					startKm:startKm.value,
					endKm:endKm.value,
					productId:product.value
				};

		json = JSON.stringify(data);
	 	var xhr = new XMLHttpRequest();
		var url = './Ajax/AddNewTransaction';
		xhr.onreadystatechange = handleResult;
		xhr.open('POST',url,true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xhr.send("ajaxSend="+json);	
		//xhr.send(data);		
		function handleResult(){
			console.log(JSON.parse(xhr.responseText));
		}
	}

})



/*End */

