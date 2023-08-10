/* Chú thích 
	headerNoti : là phần tử thông báo hànhd dộng thành công hay thất bại mỗi khi submit Form

	dialog : là Modal được gọi khi ấn vào button tương ứng
	dialog[0] : là modal dùng để add và update transaction
	dialog[1] : là modal dùng để delete transaction

	delFormContent, delForm là viết tắt của dialog__form[1] và dialog__content[1] khi gọi ra bằng document.getElementsByClassName
	dùng 2 đối tượng này để custom Form delete của Modal delete vì nó là Modal riêng, ko giông Modal add và update

	btnAddTransaction, btnEditTransaction, btnDeleteTransaction, btnCancelAction là 4 button action để thực hiện
	4 tính năng thêm, sửa, xoá, và huỷ hành động xoá của Form trong đó đặc biệt btnAddTransaction ccaafn chú ý
	btnAddTransaction[0] là button để gọi Form Add (dialof[0])
	btnAddTransaction[1] dùng để thực hiện hành động add transaction

	btnCloseModal : là button dấu X dùng để đóng modal trong đó :
	btnCloseModal[0] dùng để đóng modal add và update transaction
	btnCloseModal[1] dùng để đóng modal delete transaction

	titleModal dùng để hiển thị tiêu đề của modal

*/
var headerNoti = document.querySelector(".header__noti");
var dialog = document.getElementsByClassName("dialog");
var delFormContent = document.getElementsByClassName("dialog__content")[1];
var delForm = document.getElementsByClassName("dialog__form")[1];
var btnAddTransaction = document.getElementsByClassName("add__transaction-button");
var btnEditTransaction = document.getElementsByClassName('edit__transaction-button');
var btnDeleteTransaction = document.getElementsByClassName('delete__transaction-button');
var btnCancelAction = document.getElementsByClassName('cancelAction__transaction-button');
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");
var titleModal = document.querySelector('.dialog__content-header-label');

btnAddTransaction[0].style.background  = "#6259ca";

/* Viết 2 hàm ẩn / hiện bảng modal dialog */
function ShowModal(modal){
	modal.style.opacity = "1";
	modal.style.visibility = "visible";
}
function HideModal(modal) {
	modal.style.opacity = "0";
	modal.style.visibility = "hidden";
}

/* Viết function hiển thị nội dung và các button Form khi click vào button có action tương ứng */
function ReTitleModal(titleModal,title,btnDisplays,btnHides){
	titleModal.innerText = title;
	for(let btnDisplay of btnDisplays){
		btnDisplay.style.display = "";
	}
	for(let btnHide of btnHides){
		btnHide.style.display = "none";
	}
}

/* Hiện Modal thêm 1 bản ghi lịch sử thay dầu khi click vào nút "Add Transaction" */
btnAddTransaction[0].onclick = function(){
	/* Sửa lại Modal phù hợp trước khi hiển thị sau đó gọi modal ra */
	ReTitleModal(titleModal,'Add a new transaction',[btnAddTransaction[1]],[btnEditTransaction[0]])
	ShowModal(dialog[0]);
	/* Reload lại các phần tử dùng để thông báo */
	headerNoti.setAttribute("class","header__noti");
	headerNoti.removeAttribute("style");
	document.getElementById("end_km_info").innerText = "";
	document.getElementById("product_info").innerText = "";
	let url = ('./Ajax/ShowLastOption');
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = handleResult;
	xhr.open("GET",url);
	xhr.send();
	function handleResult(){
		let curentDate = new Date().toJSON().slice(0, 10);
		if (xhr.readyState === XMLHttpRequest.DONE) {
			var responseData = JSON.parse(xhr.responseText);
			//console.log(data);
			document.getElementById("form__add-start_day").value = responseData.end_day;
			document.getElementById("form__add-end_day").value = curentDate;
			document.getElementById("form__add-start_kilometer").value = responseData.end_km;
			document.getElementById("form__add-end_kilometer").value = null;
			document.getElementById("form__add-oil_product-name").value = null;
		}
	} 
};

/* Ẩn Modal thêm bản ghi khi click vào dấu X */
btnCloseModal[0].addEventListener("click",()=>HideModal(dialog[0]));

/* Ẩn Modal thêm bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
if (event.target == dialog[0]) {
		HideModal(dialog[0]);
	}
});

/* Function call AJAX load thông tin sản phẩm */
function sendRequestLoadProduct(url,method,output){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = handleResult;
	xhttp.open(method,url);
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
				output.appendChild(tmpl);
			}
		}
	}
}
/*=========================================================================================================*/

/* Tự động load ra thông tin sản phẩm dầu nhớt trong bảng tuỳ chọn thêm 1 bản ghi lịch sử thay dầu*/
var oilProduct_addForm = document.getElementById("form__add-oil_product-name");
//var oilProduct_editForm = document.getElementById("form__edit-oil_product-name");
window.addEventListener("load",(event)=>{
	let method = "GET";
	let url = './Ajax/ShowProductInfo';
	sendRequestLoadProduct(url,method,oilProduct_addForm);
	//sendRequestLoadProduct(url,method,oilProduct_editForm);
	/* Hàm sendRequestLoadProduct được viết ngay phía trên để gọi AJAX */
})
/*=========================================================================================================*/

/* Validate dữ liệu nhập vào form Modal thêm 1 bản ghi lịch sử thay dầu */

	var startKm = document.getElementById("form__add-start_kilometer");
	var endKm = document.getElementById("form__add-end_kilometer");
	var product = document.getElementById("form__add-oil_product-name");
	var startDay = document.getElementById("form__add-start_day");
	var endDay = document.getElementById("form__add-end_day");
/* Tạo ra 1 mảng chứa mã lỗi , nếu dữ liệu nhập vào hợp lệ sẽ xoá mã lỗi trong bảng và ngược lại */
	var isCorrectInput = ["product","endKm"];

/* Hai hàm thêm mã lỗi và xoá mã lỗi */
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

	/* Viết hàm tối ưu lại code, thông báo lỗi nếu dữ liệu nhập vào không hợp lệ. 
	   Bật/tắt button submit nếu tất cả dữ liệu nhập vào hợp lệ */
function showErrorNotification(pattern,value,errorLineNoti,submitBtn,errorCode,contentNoti){
	if(pattern.test(value)){
		errorLineNoti.innerText = "";
		removeErrorCode(isCorrectInput,errorCode);

	} else{
		errorLineNoti.innerText = contentNoti;
		addErrorCode(isCorrectInput,errorCode);
	}
	if (isCorrectInput.length === 0) {
		submitBtn.removeAttribute("disabled");
	} else {
		submitBtn.setAttribute("disabled","disabled");
	}
}
/* Validate dữ liệu khi nhập form*/
	let pattern = /^[0-9]+$/;
	let contentNoti = "Định dạng số không hợp lệ";

	product.addEventListener("change",function(){
		let errorLineNotification = document.getElementById("product_info");
		let submitButton = document.querySelectorAll(".add__transaction-button");
		let contentNoti = "Vui lòng chọn 1 tuỳ chọn";
		showErrorNotification(pattern,product.value,errorLineNotification,submitButton[1],"product",contentNoti);
		product[0].style.display = "none";
	})

	startKm.addEventListener('keyup',function(){
		let errorLineNotification = document.getElementById("start_km_info");
		let submitButton = document.querySelectorAll(".add__transaction-button");
		showErrorNotification(pattern,startKm.value,errorLineNotification,submitButton[1],"startKm",contentNoti);
	})

	endKm.addEventListener('keyup',function(){
		let errorLineNotification = document.getElementById("end_km_info");
		let submitButton = document.querySelectorAll(".add__transaction-button");
		showErrorNotification(pattern,endKm.value,errorLineNotification,submitButton[1],"endKm",contentNoti);
	})
	
/*	
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
*/

/*======================================================================================================*/

/* Code tính năng thêm 1 bản ghi lịch sử thay dầu */
let btnAddNewTrans = document.querySelectorAll(".add__transaction-button");
btnAddNewTrans[1].addEventListener("click",function(){
	//console.log(isCorrectInput);
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
	 	let xhr = new XMLHttpRequest();
		let url = './Ajax/AddNewTransaction';
		xhr.onreadystatechange = handleResult;
		xhr.open('POST',url,true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xhr.send("ajaxSend="+json);	
		//xhr.send(data);		
		function handleResult(){
			if (xhr.readyState === XMLHttpRequest.DONE) {
				let reponseData = JSON.parse(xhr.responseText);
				if (reponseData != "false") {
					//console.log(reponseData);
					let status_noti = "good";
					if (reponseData.total_km >= 1200 && reponseData.total_km <= 1500) {
						status_noti = "warning";
					} else if (reponseData.total_km >= 1500) {
						status_noti = "expired";
					}
					/*Hiển thị dòng dữ liệu mới thêm vào*/
					let templateFrag = document.querySelector("#newRow").content;
					templateFrag.querySelector("td").innerText = reponseData.och_id;
					templateFrag.querySelector(".rowContent td:nth-child(2)").innerText = reponseData.product_name;
					templateFrag.querySelector(".rowContent td:nth-child(3)").innerText = reponseData.end_day;
					templateFrag.querySelector(".rowContent td:nth-child(4)").innerText = reponseData.total_days;
					templateFrag.querySelector(".rowContent td:nth-child(5)").innerText = reponseData.total_km;
					templateFrag.querySelector(".rowContent td:nth-child(6)").innerText = reponseData.product_price;
					templateFrag.querySelector(".rowContent td:nth-child(7)").innerText = status_noti;
					templateFrag.querySelector(".rowContent td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+status_noti);
					document.querySelector("tbody").appendChild(templateFrag);
					/*In ra câu thông báo thành công*/
					headerNoti.innerText = "A new transaction was added successfully !";
					headerNoti.setAttribute("class","header__noti header__noti-success");
					setTimeout(function(){
						headerNoti.style.transform = 'translate(-50%,-100px)';
					},2500);
				} else {
					headerNoti.innerText = "Cannot add new transaction, Please try again !";
					headerNoti.setAttribute("class","header__noti header__noti-failure");
					setTimeout(function(){
						headerNoti.style.transform = 'translate(-50%,-100px)';
					},2500);
				}
				//console.log(data);
			} else {
				/*In ra câu thông báo thất bại*/
				headerNoti.innerText = "Cannot add new transaction, Please try again !";
				headerNoti.setAttribute("class","header__noti header__noti-failure");
				setTimeout(function(){
					headerNoti.style.transform = 'translate(-50%,-100px)';
				},2500);
			}
		}
		HideModal(dialog[0]);
	}

	
})
/*======================================================================================================*/

/* Code phần hiện modal tính năng sửa đổi bản ghi lịch sử thay dầu */
var btnEdits =  document.querySelectorAll(".oil__table-action-edit");
btnEdits.forEach((btnEdit) => {
	btnEdit.addEventListener('click',function(){
		//console.log(this.parentNode.parentNode.parentNode.getAttribute("id"));
		let transactionId = this.parentNode.parentNode.parentNode.getAttribute("id");
		/* Reload lại các phần tử dùng để thông báo */
		headerNoti.setAttribute("class","header__noti");
		headerNoti.removeAttribute("style");
		/* Gọi modal Update*/
		ShowModal(dialog[0]);
		document.getElementById("start_km_info").innerText = "";
		document.getElementById("end_km_info").innerText = "";
		document.getElementById("product_info").innerText = "";
		ReTitleModal(titleModal,'Edit transaction',[btnEditTransaction[0]],[btnAddTransaction[1]]);
		// btnEditTransaction[0].style.display = "";
		// btnAddTransaction[1].style.display="none";
		// btnDeleteTransaction[0].style.display = "none";
		// btnCancelAction[0].style.display = "none";
		// document.querySelector('.dialog__content-header-label').innerText = "Edit transaction";
		/* Gọi Ajax load dữ liệu của bản ghi tương ứng với số transactionId khi button Edit được click*/
		let id = JSON.stringify({"tranId":transactionId});
		let url = './Ajax/ShowTransactionById';
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleResult;
		xhr.open("POST",url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("id="+id);
		function handleResult() {
			if(xhr.readyState === this.DONE){
				responseData = JSON.parse(xhr.responseText);
				document.getElementById("form__add-start_day").value = responseData.start_day;
				document.getElementById("form__add-end_day").value = responseData.end_day;
				document.getElementById("form__add-start_kilometer").value = responseData.start_km;
				document.getElementById("form__add-end_kilometer").value = responseData.end_km;
				document.getElementById("form__add-oil_product-name").value = responseData.product_id;
				btnEditTransaction[0].setAttribute("transactionId",transactionId);
				/* Xoá ErrorCode trong mảng báo lỗi isCorrectInput*/
				let i = 0;
				while(i < isCorrectInput.length){
					isCorrectInput.pop();
				}	
				//console.log(isCorrectInput);
			}
		}
	})
})

/* Code tính năng sửa đổi bản ghi lịch sử thay dầu */
btnEditTransaction[0].addEventListener('click',function(){
	if (isCorrectInput.length !== 0) {
		ShowModal(dialog[0]);
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
		var data = {transId:btnEditTransaction[0].getAttribute("transactionId"),
					startDay:startDay.value,
					endDay:endDay.value,
					startKm:startKm.value,
					endKm:endKm.value,
					productId:product.value
				};

		json = JSON.stringify(data);
	 	let xhr = new XMLHttpRequest();
		let url = './Ajax/UpdateTransaction';
		xhr.onreadystatechange = handleResult;
		xhr.open('POST',url,true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xhr.send("ajaxSend="+json);			
		function handleResult(){
			if (xhr.readyState === XMLHttpRequest.DONE) {
				//console.log(JSON.parse(xhr.responseText));
				let reponseData = JSON.parse(xhr.responseText);
				if (reponseData != "false") {
					//console.log(reponseData);
					let status_noti = "good";
					if (reponseData.total_km >= 1200 && reponseData.total_km <= 1500) {
						status_noti = "warning";
					} else if (reponseData.total_km >= 1500) {
						status_noti = "expired";
					}
					/* Update dòng dữ liệu đã được chỉnh sửa */
					let rowEdited = document.getElementById(btnEditTransaction[0].getAttribute("transactionId"));
					//console.log(rowEdited);
					//console.log(rowEdited.querySelector("td:nth-child(2)"));
					rowEdited.querySelector("td:nth-child(2)").innerText = reponseData.product_name;
					rowEdited.querySelector("td:nth-child(3)").innerText = reponseData.end_day;
					rowEdited.querySelector("td:nth-child(4)").innerText = reponseData.total_days;
					rowEdited.querySelector("td:nth-child(5)").innerText = reponseData.total_km;
					rowEdited.querySelector("td:nth-child(6)").innerText = reponseData.product_price;
					rowEdited.querySelector("td:nth-child(7)").innerText = status_noti;
					rowEdited.querySelector("td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+status_noti);

					/*In ra câu thông báo thành công*/
					headerNoti.innerText = "A new record was edited successfully !";
					headerNoti.setAttribute("class","header__noti header__noti-success");
					setTimeout(function(){
						headerNoti.style.transform = 'translate(-50%,-100px)';
					},2500);
				} else {
					headerNoti.innerText = "Cannot add new record, Please try again !";
					headerNoti.setAttribute("class","header__noti header__noti-failure");
					setTimeout(function(){
						headerNoti.style.transform = 'translate(-50%,-100px)';
					},2500);
				}
			} else {
				/*In ra câu thông báo thất bại*/
				headerNoti.innerText = "Cannot add new record, Please try again !";
				headerNoti.setAttribute("class","header__noti header__noti-failure");
				setTimeout(function(){
					headerNoti.style.transform = 'translate(-50%,-100px)';
				},2500);
			}
		}
		HideModal(dialog[0]);
	} 
});


/* Ẩn Modal Sửa bản ghi khi click vào dấu X */
btnCloseModal[0].onclick = ()=>HideModal(dialog[0]);

/* Ẩn Modal Sửa bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
if (event.target == dialog[0]) {
		HideModal(dialog[0]);
	}
});

/* Code phần hiện modal tính năng xoá 1 bản ghi lịch sử thay dầu */
var btnDeletes = document.querySelectorAll(".oil__table-action-delete");
btnDeletes.forEach((btnDelete) => {
	btnDelete.addEventListener('click',function(){
		let transactionId = this.parentNode.parentNode.parentNode.getAttribute("id");
		//console.log(transactionId);
		/* Reload lại các phần tử dùng để thông báo */
		headerNoti.setAttribute("class","header__noti");
		headerNoti.removeAttribute("style");
		/* Gọi modal Delete*/
		delFormContent.style.minWidth = "initial";
		delFormContent.style.minHeight = "initial";
		delForm.style.gridTemplateColumns = "1fr";
		ShowModal(dialog[1]);
		btnDeleteTransaction[0].setAttribute("transId",transactionId);
	})
})

/* Code tính năng xoá 1 bản ghi lịch sử thay dầu */
btnDeleteTransaction[0].addEventListener('click',()=>{
	var transId = btnDeleteTransaction[0].getAttribute("transId");
	var data = JSON.stringify({transactionId:transId});
	let xhr = new XMLHttpRequest();
	let url = './Ajax/DeleteTransaction';
	xhr.onreadystatechange = handleResult;
	xhr.open('POST',url,true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.send("id="+data);			
	function handleResult(){
		if (xhr.readyState === XMLHttpRequest.DONE) {
			//console.log(JSON.parse(xhr.responseText));
			let responseData = JSON.parse(xhr.responseText);
			if(responseData != "false"){
				/* Hàm rowIndex dùng để lấy ra vị trí của hàng có id = transId trong bảng*/
				let index = document.getElementById(transId).rowIndex;
				/* Hàm deleteRow dùng để xoá 1 hàng có vị trí index-1 trong bảng vì bảng bắt đầu bằng row 0*/
				document.querySelector('tbody').deleteRow(index-1);

				headerNoti.innerText = "A record was deleted successfully !";
				headerNoti.setAttribute("class","header__noti header__noti-success");
				setTimeout(function(){
					headerNoti.style.transform = 'translate(-50%,-100px)';
				},2500);

			} else {
				/*In ra câu thông báo thất bại*/
				headerNoti.innerText = "Cannot delete this record, Please try again !";
				headerNoti.setAttribute("class","header__noti header__noti-failure");
				setTimeout(function(){
					headerNoti.style.transform = 'translate(-50%,-100px)';
				},2500);
			}
		}
	}
	HideModal(dialog[1]);
	
})
/* Ẩn modal khi click vào dấu X hoặc button cancel */
btnCancelAction[0].addEventListener("click",()=>HideModal(dialog[1]));
btnCloseModal[1].addEventListener("click",()=>HideModal(dialog[1]));

/* Ẩn Modal thêm bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
if (event.target == dialog[1]) {
		HideModal(dialog[1]);
	}
});

/*setTimeout(function(){
	document.querySelector(".header__noti").setAttribute("class","header__noti header__noti-success");
},3000)*/



/*End */

