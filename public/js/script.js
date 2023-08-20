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

/* Nguồn tham khảo 
	https://completejavascript.com/chuyen-html-template-sang-dom-node/
	https://codetot.net/javascript-delegation-event/#Event_Delegation_trong_Plain_Javascript
	http://bdadam.com/blog/plain-javascript-event-delegation.html
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
var recordCounting = document.getElementById('count__record');

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
function sendRequestLoadProduct(url,method,callback){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = handleResult;
	xhttp.open(method,url);
	xhttp.send();
	function handleResult(){
		if (xhttp.readyState === XMLHttpRequest.DONE) {
			//console.log(JSON.parse(xhttp.responseText)[0].product_id);
			callback(xhttp.responseText);
			//console.log(typeof(xhttp.responseText));
			//console.log(this.responseText);
		}
	}
}

function showProductOption(data,output){
	//if (typeof(data) == 'string') {
		var arr = [];
		arr = JSON.parse(data);
		let templateFrag = document.querySelector("#product-option").content;

		for (var i = 0; i < arr.length; i++) {
			let tmpl = templateFrag.cloneNode(true);
			tmpl.querySelector('option').setAttribute("value",arr[i].product_id);
			tmpl.querySelector('option').innerText = arr[i].product_name+" ("+arr[i].product_batch+")";
			output.appendChild(tmpl);
		}
	//}
	
}
/*=========================================================================================================*/

/* Tự động load ra thông tin sản phẩm dầu nhớt trong bảng tuỳ chọn thêm 1 bản ghi lịch sử thay dầu*/
var oilProduct_addForm = document.getElementById("form__add-oil_product-name");
//var oilProduct_editForm = document.getElementById("form__edit-oil_product-name");
window.addEventListener("load",(event)=>{
	let method = "GET";
	let url = './Ajax/ShowProductInfo';
	sendRequestLoadProduct(url,method,data => showProductOption(data,oilProduct_addForm));
	sendRequestLoadProduct(url,method, function(data){
		showProductOption(data,oilProduct_addForm);
		//console.log(data);
	})

	// showProductOption(sendRequestLoadProduct,oilProduct_addForm){
	// 	var data = sendRequestLoadProduct(url,method);
	// 	console.log(data);
	// }
	function myFunction(callback){
		var myC = callback(100);
		//console.log(myC);
	}

	function myCallback(value) {
		return 100;
	}
	
	myFunction(myCallback);
	//showProductOption(dataProductInfo,oilProduct_addForm)
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

/*======================================================================================================*/
/*Viết function phân loại trạng thái hiển thị dựa vào số km */
function assessmentStatuses (km){
	let status_noti = "good";
	if (km >= 1200 && km <= 1500) {
		status_noti = "warning";
	} else if (km >= 1500) {
		status_noti = "expired";
	}
	return status_noti;
}
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
				let responseData = JSON.parse(xhr.responseText);
				if (responseData != "false") {
					//console.log(responseData);
					/*Hiển thị dòng dữ liệu mới thêm vào*/
					let templateFrag = document.querySelector("#newRow").content;
					if(responseData.och_id < 10){
						let rowId = '0'+responseData.och_id;
					}
					templateFrag.querySelector("td").parentNode.setAttribute("id",responseData.och_id);
					templateFrag.querySelector("td").innerText = rowId+".";
					templateFrag.querySelector(".rowContent td:nth-child(2)").innerText = responseData.product_name;
					templateFrag.querySelector(".rowContent td:nth-child(3)").innerText = responseData.end_day;
					templateFrag.querySelector(".rowContent td:nth-child(4)").innerText = responseData.total_days;
					templateFrag.querySelector(".rowContent td:nth-child(5)").innerText = responseData.total_km;
					templateFrag.querySelector(".rowContent td:nth-child(6)").innerText = responseData.product_price;
					templateFrag.querySelector(".rowContent td:nth-child(7)").innerText = assessmentStatuses(responseData.total_km);
					templateFrag.querySelector(".rowContent td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+assessmentStatuses(responseData.total_km));
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

/* Code phần hiện modal tính năng sửa đổi bản ghi lịch sử thay dầu 
Kết hợp event delegation (Sẽ bắt sự kiện click cho các phần tử mới được thêm vào trang sau khi đã tải xong) nguồn tham khảo :
https://codetot.net/javascript-delegation-event/#Event_Delegation_trong_Plain_Javascript
http://bdadam.com/blog/plain-javascript-event-delegation.html

Ý tưởng : khi phần tử con "BUTTON" được click tương đương với việc phần tử cha của nó "TBODY" cũng đc click
Khi phần tử TBODY được click ta sẽ xác định đối tượng được click qua biến target = event.target
"event. target: là phần tử mà user tương tác (click, change).
Ở đây thì khi user click vào button edit thì target là button vừa click".
Ta sẽ tiến hành kiểm tra xem phần tử vừa được click (selector = target) có phải là button Edit hay không
Nếu có thì sẽ gọi hàm editTransaction qua phương thức call { editTransaction.call() }
Lưu ý : khi kiểm tra phần tử đang được tương tác (target) trong for thì phải tạo ra 1 biến selector để kiểm tra.
Nếu không sẽ chỉ lấy được phần tử button Edit đầu tiên trong TBODY
*/
	var tableBody = document.querySelector('tbody');
	tableBody.addEventListener('click',function(event){
		var btnEdits =  document.querySelectorAll('.oil__table-action-edit');
		var target = event.target; // Chỉ ra phần tử đang được tương tác
		btnEdits.forEach((btnEdit)=>{
			var selector = target; // bắt buộc phải có phần tử selector, không được so sánh trực tiếp phần tử target
			while(selector && selector !== tableBody){
				if (selector === btnEdit) {
					return editTransaction.call();// Chỗ này mở ngoặc nhọn {} rồi viết funtion xử lí cũng được nhưng nên tách ra cho gọn
				} selector = selector.parentNode;	
			}
		})
	})


function editTransaction(){
	/*event. target: là phần tử mà user tương tác (click, change)
	ở đây thì khi user click vào button edit thì target là phần tử user vừa click*/
	var target = event.target;
	var transactionId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			transactionId = target.getAttribute("id");
		}
		target = target.parentNode;
	}
	/* Reload lại các phần tử dùng để thông báo */
	headerNoti.setAttribute("class","header__noti");
	headerNoti.removeAttribute("style");
	/* Gọi modal Update*/
	ShowModal(dialog[0]);
	document.getElementById("start_km_info").innerText = "";
	document.getElementById("end_km_info").innerText = "";
	document.getElementById("product_info").innerText = "";
	ReTitleModal(titleModal,'Edit transaction',[btnEditTransaction[0]],[btnAddTransaction[1]]);
	/* Gọi Ajax load dữ liệu của bản ghi tương ứng với số transactionId khi button Edit được click*/
	let id = JSON.stringify({"tranId":transactionId});
	//console.log(id);
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
}
/* Viết lại function để tái sử dụng, ( áp dụng cho button delete ) (tham khảo event delegation trong jquery)*/
function on(parentSelector, eventName, selector, fn) {
	var element = document.querySelector(parentSelector);

	element.addEventListener(eventName, function(event) {
		var possibleTargets = element.querySelectorAll(selector);
		var target = event.target;

		for (var i = 0, l = possibleTargets.length; i < l; i++) {
			var el = target;
			var p = possibleTargets[i];

			while(el && el !== element) {
				if (el === p) {
					return fn.call(p, event);
				}

				el = el.parentNode;
			}
		}
	});
}

//on('tbody', 'click', '.oil__table-action-edit', editTransaction);

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
				let responseData = JSON.parse(xhr.responseText);
				if (responseData != "false") {
					//console.log(responseData);
					/* Update dòng dữ liệu đã được chỉnh sửa */
					let rowEdited = document.getElementById(btnEditTransaction[0].getAttribute("transactionId"));
					//console.log(rowEdited);
					//console.log(rowEdited.querySelector("td:nth-child(2)"));
					rowEdited.querySelector("td:nth-child(2)").innerText = responseData.product_name;
					rowEdited.querySelector("td:nth-child(3)").innerText = responseData.end_day;
					rowEdited.querySelector("td:nth-child(4)").innerText = responseData.total_days;
					rowEdited.querySelector("td:nth-child(5)").innerText = responseData.total_km;
					rowEdited.querySelector("td:nth-child(6)").innerText = responseData.product_price;
					rowEdited.querySelector("td:nth-child(7)").innerText = assessmentStatuses(responseData.total_km);
					rowEdited.querySelector("td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+assessmentStatuses(responseData.total_km));

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
function deleteTransaction(){
	var target = event.target;
	var transactionId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			transactionId = target.getAttribute("id");
		}
		target = target.parentNode;
		/* Reload lại các phần tử dùng để thông báo */
		headerNoti.setAttribute("class","header__noti");
		headerNoti.removeAttribute("style");
		/* Gọi modal Delete*/
		delFormContent.style.minWidth = "initial";
		delFormContent.style.minHeight = "initial";
		delForm.style.gridTemplateColumns = "1fr";
		ShowModal(dialog[1]);
		btnDeleteTransaction[0].setAttribute("transId",transactionId);
	}
}
/* Dùng hàm on() được viết lại từ cách sử dụng event delegation để áp dụng event cho các button delete được thêm sau khi load trang*/
on('tbody','click','.oil__table-action-delete',deleteTransaction);

/* Responsive modal nếu màn hình nhỏ */
function calculatePercentage(x, y)
{
	return (x/y)*100;
}

window.onresize = function(){
	var width = window.screen.width;
    //console.log(width);
    if (width < 769) {
    	delFormContent.style.minWidth = calculatePercentage(9,10)+"%";
    } else {
    	delFormContent.style.minWidth = "initial";
    }
}

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


/*Code tính năng phân trang 
Tính số bản ghi sẽ hiển thị trong 1 trang 
Viết funtion hiển thị dòng thông báo show bao nhiêu record*/
function getNumberOfRecordByUser(start,display,totalEntries){
	recordCounting.innerHTML = recordCounting.innerHTML.replace('{{start}}',start);
	recordCounting.innerHTML = recordCounting.innerHTML.replace('{{display}}',display);
	recordCounting.innerHTML = recordCounting.innerHTML.replace('{{totals}}',totalEntries);
}
var start = 1;
var display = 10;
var totalRecords = 10;
var pages = 1;
var curentPage = 1;
getNumberOfRecordByUser(start,display,totalRecords);

var entries = document.querySelector('#table_record');
entries.addEventListener('change',function(){
	recordCounting.innerHTML = "Showing {{start}} to {{display}} of {{totals}} entries";
	console.log("entries: "+entries.value);
	let url = './Ajax/NumberOfTransaction';
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = handleResult;
	xhr.open("GET",url);
	xhr.send();
	function handleResult(){
		if (xhr.readyState === this.DONE) {
			let totalRecords = JSON.parse(xhr.responseText).totalRecords;
			console.log("totalRecords: "+totalRecords);
			if (totalRecords > entries.value) {
				pages = Math.ceil(totalRecords/entries.value);
			} 
			console.log("pages: "+pages);
			let data = JSON.stringify({
				"start":0,
				"display":entries.value
			});
			
			let paginationUrl = './Ajax/Pagination';
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if (xhttp.readyState === this.DONE) {
					//console.warn(JSON.parse(xhttp.responseText));
					responseData = JSON.parse(xhttp.responseText);
					let new_tbody = document.createElement('tbody');
					let templateFrag = document.querySelector("#newRow").content;
					for (var i = 0 ; i < responseData.length ;i++){
						//Sử dụng cloneNode để sao chép toàn bộ phần tử template 
						var templ = templateFrag.cloneNode(true);
						responseData[i].och_id < 10 ? rowId = '0'+responseData[i].och_id : rowId = responseData[i].och_id;
						templ.querySelector(".rowContent").setAttribute("id",responseData[i].och_id);
						templ.querySelector("td").innerText = rowId+".";
						templ.querySelector(".rowContent td:nth-child(2)").innerText = responseData[i].product_name;
						templ.querySelector(".rowContent td:nth-child(3)").innerText = responseData[i].end_day;
						templ.querySelector(".rowContent td:nth-child(4)").innerText = responseData[i].total_days;
						templ.querySelector(".rowContent td:nth-child(5)").innerText = responseData[i].total_km;
						templ.querySelector(".rowContent td:nth-child(6)").innerText = responseData[i].product_price;
						templ.querySelector(".rowContent td:nth-child(7)").innerText = assessmentStatuses(responseData[i].total_km);
						templ.querySelector(".rowContent td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+assessmentStatuses(responseData[i].total_km));
						new_tbody.appendChild(templ);
					}
					document.querySelector('tbody').parentNode.replaceChild(new_tbody,document.querySelector('tbody'));
					getNumberOfRecordByUser(1,entries.value,totalRecords);
				}
			};
			xhttp.open("POST",paginationUrl,true);
			xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhttp.send("data="+data);
		}
	}
})
/* 2 dòng này viết lại sau vì chỉ cần dùng hàm on 1 lần cho phần tử cha ".table_tbody" là được */
on('.table__body','click','.oil__table-action-edit',editTransaction);
on('.table__body','click','.oil__table-action-delete',deleteTransaction);

if (pages > 1) {

}


/*setTimeout(function(){
	document.querySelector(".header__noti").setAttribute("class","header__noti header__noti-success");
},3000)*/



/*End */
