
/* Nguồn tham khảo 
	https://completejavascript.com/chuyen-html-template-sang-dom-node/
	https://codetot.net/javascript-delegation-event/#Event_Delegation_trong_Plain_Javascript
	http://bdadam.com/blog/plain-javascript-event-delegation.html
	https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
	=//=//=/=//=//= Callback =//=//=/=//=//=
	https://www.youtube.com/watch?v=W8vJ-yOtSbE&t=236s
	https://www.youtube.com/watch?v=LUt36WnREm0&t=222s
	https://www.youtube.com/watch?v=cNdJLapVQMo
	https://homiedev.com/tim-hieu-javascript-classlist-add-remove-and-toggle/
	https://stackoverflow.com/questions/11459998/using-number-format-to-add-thousand-separator
*/

/* Chú thích 
	headerPopup : là phần tử thông báo hànhd dộng thành công hay thất bại mỗi khi submit Form

	dialog : là Modal được gọi khi ấn vào button tương ứng
	dialog[0] : là modal dùng để add và update transaction
	dialog[1] : là modal dùng để delete transaction

	delFormContent, delForm là viết tắt của dialog__form[1] và dialog__content[1] khi gọi ra bằng document.getElementsByClassName
	dùng 2 đối tượng này để custom Form delete của Modal delete vì nó là Modal riêng, ko giông Modal add và update

	btnAddTransaction, btnEditTransaction, btnDeleteTransaction, btnCancel là 4 button action để thực hiện
	4 tính năng thêm, sửa, xoá, và huỷ hành động xoá của Form trong đó đặc biệt btnAddTransaction ccaafn chú ý
	btnAddTransaction[0] là button để gọi Form Add (dialof[0])
	btnAddTransaction[1] dùng để thực hiện hành động add transaction

	btnCloseModal : là button dấu X dùng để đóng modal trong đó :
	btnCloseModal[0] dùng để đóng modal add và update transaction
	btnCloseModal[1] dùng để đóng modal delete transaction

	titleDialog dùng để hiển thị tiêu đề của modal
	AER = Add-Edit-Remove
	CUD = Creat-Update-Delete

*/
var btnAdd = document.querySelector('.add__button'); /* och viết tắt của oil change history */
var btnCreate = document.querySelector('.create__button');
var btnEdit = document.querySelector('.edit__button');
var btnUpdate = document.querySelector('.update__button');
var btnRemove = document.querySelector('.remove__button');
var btnDelete = document.querySelector('.delete__button');
var btnCancel = document.querySelector('.cancel__button');
var btnCloseModal = document.querySelectorAll(".dialog__content-header-close");

var btnAddTransaction = document.getElementsByClassName("add__transaction-button");
var btnEditTransaction = document.getElementsByClassName('edit__transaction-button');
var btnDeleteTransaction = document.getElementsByClassName('delete__transaction-button');


var headerPopup = document.querySelector(".header__popup");

var dialog = document.getElementsByClassName("dialog");
var titleDialog = document.querySelector('.dialog__content-header-label h2'); 

var delFormContent = document.getElementsByClassName("dialog__content")[1];
var delForm = document.getElementsByClassName("dialog__form")[1];
var dialogForm_startKm = document.getElementById("form__start-kilometer");
var dialogForm_endKm = document.getElementById("form__end-kilometer");
var dialogForm_product = document.getElementById("form__product");
var dialogForm_startDay = document.getElementById("form__start-day");
var dialogForm_endDay = document.getElementById("form__end-day");

var labelField_startKm = document.getElementById("start_km_info");
var labelField_endKm = document.getElementById("end_km_info");
var labelField_startDay = document.getElementById("start_day_info");
var labelField_endDay = document.getElementById("end_day_info");
var labelField_product = document.getElementById("product_info");
var labelField_Dialog = document.getElementById("transDialog_info");

const currentUrl = window.location.pathname.toString();
const urlArray = currentUrl.split("/");

/* Viết 2 hàm ẩn / hiện bảng modal dialog */
function showModal(modal){
	modal.style.opacity = "1";
	modal.style.visibility = "visible";
}

function hideModal(modal) {
	modal.style.opacity = "0";
	modal.style.visibility = "hidden";
}

/* Viết function hiển thị nội dung và các button Form khi click vào button có action tương ứng */
function retitleDialog(titleDialog,title,btnDisplay,btnHide){
	titleDialog.innerText = title;
		btnDisplay.style.display = "";
		btnHide.style.display = "none";
}
function retitleLabel(page){
 	labelField_Dialog.innerText = "";
 	switch(page){
 		case 'oil' :
	 		labelField_startKm.innerText = "";
	 		labelField_endKm.innerText = "";
	 		labelField_startDay.innerText = "";
	 		labelField_endDay.innerText = "";
	 		labelField_product.innerText = "";
	 		break;
 		case 'category' :
	 		catNameInfor.innerText = "";
	 		catTypeInfor.innerText = "";
	 		catColorInfor.innerText = "";
	 		break;
	 	case 'transaction' :
	 		labelField_transType.innerText = "";
			labelField_category.innerText = "";
			labelField_transName.innerText = "";
			labelField_transDesc.innerText = "";
			labelField_transAmount.innerText = "";
			labelField_Dialog.innerText = "";
			break;
 	}
	
 }

/*Viết function phân loại trạng thái hiển thị Good/Warning/Expired dựa vào số km */
function assessmentStatuses (km){
	let status_noti = "good";
	if (km >= 1200 && km <= 1500) {
		status_noti = "warning";
	} else if (km >= 1500) {
		status_noti = "expired";
	}
	return status_noti;
}
/* Viết hàm tuỳ chỉnh nội dung popup thông báo thành công hay thất bạt*/
function popupMessage(status,action,object){
	var message;
	if (status == "success") {
		switch(action){
			case "add" :
				message = "A new "+object+" was added successfully !";
				break;
			case "edit"	:
				message = "This "+object+" was edited successfully !";
				break;
			case "delete" :
				message = "A "+object+" was deleted successfully !";
				break;
		}
	} else{
		switch(action){
			case "add" :
				message = "Cannot add new "+object+", Please try again !";
				break;
			case "edit"	:
				message = "Cannot update this "+object+" at the moment, Please try again !";
				break;
			case "delete" :
				message = "Cannot delete this "+object+" at the moment, Please try again !";
				break;
		}
	}
	headerPopup.innerText = message;
	headerPopup.setAttribute("class","header__popup header__popup-"+status+"");
	setTimeout(function(){
		headerPopup.style.transform = 'translate(-50%,-100px)';
	},2500);
}

/* Responsive modal nếu màn hình nhỏ */
function calculatePercentage(x, y){
	return (x/y)*100;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function vndCurrency(x) {
   return x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" ₫";
}
function dateFormat(date){
	return date.split('-').reverse().join('-')
	/*Chuỗi gốc 2023-10-25
	Kết quả 25-10-2023*/
}

/* Ẩn Modal thêm bản ghi khi click vào dấu X */
btnCloseModal[0].addEventListener("click",()=>hideModal(dialog[0]));
if (btnCloseModal[1]) {
	btnCloseModal[1].addEventListener("click",()=>hideModal(dialog[1]));
}
if (btnCancel) {
	btnCancel.addEventListener("click",()=>hideModal(dialog[1]));
}
/* Ẩn Modal thêm bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
	if (event.target == dialog[0]) {
		hideModal(dialog[0]);
	}
	if (event.target == dialog[1]) {
		hideModal(dialog[1]);
	}
});

window.onresize = function(){
	var width = window.screen.width;
    //console.log(width);
    if (width < 769) {
    	delFormContent.style.minWidth = calculatePercentage(9,10)+"%";
    } else {
    	delFormContent.style.minWidth = "initial";
    }
}
/* Function call AJAX load thông tin sản phẩm */
function sendAjaxRequest(url,method,callback,data){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = handleResult;
	xhttp.open(method,url);
	if (data !== null) {
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("AjaxData="+data);
	} else {
		xhttp.send();
	}
	function handleResult(){
		if (this.readyState === XMLHttpRequest.DONE) {
			if (typeof(callback) === 'function'){
				callback(this.responseText);
			}
		}
	}
}

/*==================================================================================================================*/
/*                                     -- Code For Oil Change History --                							*/
/*==================================================================================================================*/
/*Hàm xử lí dữ liệu load ra các option của thanh select được reponse sau khi gửi AJAX*/
function loadProductList(data,output){
	if (typeof(data) == 'string') {
		var arr = [];
		arr = JSON.parse(data);
		let templateFrag = document.querySelector("#product-option").content;
		for (var i = 0; i < arr.length; i++) {
			let tmpl = templateFrag.cloneNode(true);
			tmpl.querySelector('option').setAttribute("value",arr[i].product_id);
			tmpl.querySelector('option').innerText = arr[i].product_name+" ("+arr[i].product_batch+")";
			output.appendChild(tmpl);
		}
	}
}
function showModal_addDialog(data){
	/* Sửa lại Modal phù hợp trước khi hiển thị sau đó gọi modal ra */
	retitleDialog(titleDialog,'Add a new transaction',btnCreate,btnUpdate);
	retitleLabel('oil');
	showModal(dialog[0]);
	/* Reload lại các phần tử dùng để thông báo */
	headerPopup.setAttribute("class","header__popup");
	headerPopup.removeAttribute("style");
	/*Fill data */
	let curentDate = new Date().toJSON().slice(0, 10);
	var responseData = JSON.parse(data);
	dialogForm_startDay.value = responseData.end_day;
	dialogForm_endDay.value = curentDate;		
	dialogForm_startKm.value = responseData.end_km;
	dialogForm_endKm.value = null;
	dialogForm_product.value = null;
}

function addNewRecord(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			/*Hiển thị dòng dữ liệu mới thêm vào*/
			let templateFragRoot = document.querySelector("#newRow").content;
			let rowId;
			var templateFrag = templateFragRoot.cloneNode(true);
			responseData.och_id < 10 ? rowId = '0'+responseData.och_id : rowId = responseData.och_id;
			templateFrag.querySelector("td").parentNode.setAttribute("id",responseData.och_id);
			templateFrag.querySelector("td").innerText = rowId+".";
			templateFrag.querySelector(".rowContent td:nth-child(2)").innerText = responseData.product_name;
			templateFrag.querySelector(".rowContent td:nth-child(3)").innerText = dateFormat(responseData.end_day);
			templateFrag.querySelector(".rowContent td:nth-child(4)").innerText = responseData.total_days;
			templateFrag.querySelector(".rowContent td:nth-child(5)").innerText = numberWithCommas(responseData.total_km);
			templateFrag.querySelector(".rowContent td:nth-child(6)").innerText = vndCurrency(responseData.product_price);
			templateFrag.querySelector(".rowContent td:nth-child(7)").innerText = assessmentStatuses(responseData.total_km);
			templateFrag.querySelector(".rowContent td:nth-child(7)").setAttribute("class","table__status table__status-"+assessmentStatuses(responseData.total_km));
			document.querySelector("tbody").appendChild(templateFrag);
			/*In ra câu thông báo thành công*/
			popupMessage("success","add","record");
		} else {
			popupMessage("failure","add","record");
		}
	} else {
		/*In ra câu thông báo thất bại*/
		popupMessage("failure","add","record");
	}
}

function showModal_editDialog(){
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
	headerPopup.setAttribute("class","header__popup");
	headerPopup.removeAttribute("style");
	/* Gọi modal Update*/
	showModal(dialog[0]);
	retitleDialog(titleDialog,'Edit transaction',btnUpdate,btnCreate);
	retitleLabel('oil');
	/* Gọi Ajax load dữ liệu của bản ghi tương ứng với số transactionId khi button Edit được click*/
	let id = JSON.stringify({"tranId":transactionId});
	let url = './Ajax/ShowRecordById';
	let method = "POST";
	sendAjaxRequest(url,method,loadModal_editDialog,id);

	function loadModal_editDialog(data) {
		responseData = JSON.parse(data);
		dialogForm_startDay.value = responseData.start_day;
		dialogForm_endDay.value = responseData.end_day;
		dialogForm_startKm.value = responseData.start_km;
		dialogForm_endKm.value = responseData.end_km;
		dialogForm_product.value = responseData.product_id;
		btnUpdate.setAttribute("transactionId",transactionId);		
	}		
}

function updateRecord(data){
	if (typeof(data)=== "string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			/* Update dòng dữ liệu đã được chỉnh sửa */
			let rowEdited = document.getElementById(btnUpdate.getAttribute("transactionId"));
			rowEdited.querySelector("td:nth-child(2)").innerText = responseData.product_name;
			rowEdited.querySelector("td:nth-child(3)").innerText = dateFormat(responseData.end_day);
			rowEdited.querySelector("td:nth-child(4)").innerText = responseData.total_days;
			rowEdited.querySelector("td:nth-child(5)").innerText = numberWithCommas(responseData.total_km);
			rowEdited.querySelector("td:nth-child(6)").innerText = vndCurrency(responseData.product_price);
			rowEdited.querySelector("td:nth-child(7)").innerText = assessmentStatuses(responseData.total_km);
			rowEdited.querySelector("td:nth-child(7)").setAttribute("class","table__status table__status-"+assessmentStatuses(responseData.total_km));
			/*In ra câu thông báo thành công*/
			popupMessage("success","edit","record");
		} else {
			popupMessage("failure","edit","record");
		}
	} else {
		/*In ra câu thông báo thất bại*/
		popupMessage("failure","edit","record");
	}
}

function showModal_deleteDialog(){
	var target = event.target;
	var transactionId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			transactionId = target.getAttribute("id");
		}
		target = target.parentNode;
		/* Reload lại các phần tử dùng để thông báo */
		headerPopup.setAttribute("class","header__popup");
		headerPopup.removeAttribute("style");
		/* Gọi modal Delete*/
		delFormContent.style.minWidth = "initial";
		delFormContent.style.minHeight = "initial";
		delForm.style.gridTemplateColumns = "1fr";
		showModal(dialog[1]);
		btnDelete.setAttribute("transId",transactionId);
	}
}

function deleteRecord(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if(responseData.status != "false"){
			/* Hàm rowIndex dùng để lấy ra vị trí của hàng có id = transId trong bảng*/
			let index = document.getElementById(responseData.transactionId).rowIndex;
			/* Hàm deleteRow dùng để xoá 1 hàng có vị trí index-1 trong bảng vì bảng bắt đầu bằng row 0*/
			document.querySelector('tbody').deleteRow(index-1);
			popupMessage("success","delete","record");
		} else {
			/*In ra câu thông báo thất bại*/
			popupMessage("failure","delete","record");
		}
	}
}
/* Validate dữ liệu nhập vào form Modal thêm 1 bản ghi lịch sử thay dầu*/
function validateInput(page){
	var data = new Object;
	switch(page){
		case 'oil':
			if(dialogForm_startDay.getAttribute("type") == "date" && dialogForm_startDay.value != ''){
				data["startDay"] = dialogForm_startDay.value;
			} else {
				labelField_starDay.innerText = "Invalid date forrmat";
			}
			if(dialogForm_endDay.getAttribute("type") == "date" && dialogForm_endDay.value != ''){
				data["endDay"] = dialogForm_endDay.value;
			} else {
				labelField_endDay.innerText = "Invalid date forrmat";
			}
			if(dialogForm_startKm.value != ""){
				data["startKm"] = dialogForm_startKm.value;
			} else {
				labelField_startKm.innerText = "Invalid number forrmat";
			}
			if(dialogForm_endKm.value != ""){
				data["endKm"] = dialogForm_endKm.value;
			} else {
				labelField_endKm.innerText = "Invalid number forrmat";
			}
			if(dialogForm_product.value != "null"){
				data["productId"] = dialogForm_product.value;
			} else {
				labelField_product.innerText = "Please select a product";
			}
			break;
		case 'category':
			if (categoryType.value != "") {
				data["type"] = categoryType.value;
			} else {
				catTypeInfor.innerText = "Category Type cannot be empty";
			}
			if (categoryType.value != "") {
				data["name"] = categoryName.value;
			}else{
				catNameInfor.innerText = "Category color cannot be empty";
			}
			if (categoryColor.value != "") {
				data["color"] = categoryColor.value;
			} else {
				catColorInfor.innerText = "Category Type cannot be empty";
			}
		    break;
		case 'transaction' :
			if(dialogForm_TransType.value != "null"){
				data["transType"] = dialogForm_TransType.value;
			} else {
				labelField_transType.innerText = "Please select an option";
			}
			if(dialogForm_Category.value != "null"){
				data["transCategory"] = dialogForm_Category.value;
			} else {
				labelField_category.innerText = "Please select an option";
			}
			if (dialogForm_TransName.value) {
				data["transName"] = dialogForm_TransName.value;
			} else {
				labelField_transName.innerText = "Transaction Name field can't be empty";
			}
			if (dialogForm_TransName.value) {
				data["transDesc"] = dialogForm_Description.value;
			} else {
				labelField_transDesc.innerText = "Description field can't be empty";
			}
			
			if (dialogForm_TransAmount.value) {
				data["transAmount"] = dialogForm_TransAmount.value;
			} else {
				labelField_transAmount.innerText = "Amount field can't be empty";
			}
			break;    
	}
	
	return data;
}

if (urlArray.indexOf("Oil") != -1) {
/*Tự động load ra thông tin sản phẩm dầu nhớt trong bảng tuỳ chọn thêm 1 bản ghi lịch sử thay dầu 
ngay khi trang được load. */
	let method = "GET";
	let url = './Ajax/ShowProductInfo';
	sendAjaxRequest(url,method,data => loadProductList(data,dialogForm_product));
/* data => loadProductList(data,dialogForm_product)) đóng vai trò là hàm callback 
được truyền trong hàm sendAjaxRequest(url,method,callback) */

/* Validate dữ liệu khi nhập form*/
	let pattern = /^[0-9]+$/;

	dialogForm_product.addEventListener("change",function(){
		if(pattern.test(dialogForm_product.value)){
			labelField_product.innerText = "";
		} else {
			labelField_product.innerText = "Please select an option";
		}
	})

	dialogForm_startKm.addEventListener('keyup',function(){
		if(pattern.test(dialogForm_startKm.value)){
			labelField_startKm.innerText = "";
		} else {
			labelField_startKm.innerText = "Invalid number format";
		}
	})

	dialogForm_endKm.addEventListener('keyup',function(){
		if(pattern.test(dialogForm_endKm.value)){
			labelField_endKm.innerText = "";
		} else {
			labelField_endKm.innerText = "Invalid number format";
		}
	})	

	dialogForm_startDay.addEventListener("change",()=>{
		if(dialogForm_startDay.value != ''){
			labelField_starDay.innerText = "";
		}
	})

	dialogForm_endDay.addEventListener("change",()=>{
		if(dialogForm_endDay.value != ''){
			labelField_endDay.innerText = "";
		}
	})

/* Hiện Modal thêm 1 bản ghi lịch sử thay dầu khi click vào nút "Add Transaction" */
	if (typeof(btnAdd)!=='undefined') {
		btnAdd.onclick = function(){
			/* Gọi Ajax */
			let url = ('./Ajax/ShowLastOption');
			let method = "GET";
			sendAjaxRequest(url,method,showModal_addDialog);
		};
	}
/* Code tính năng thêm 1 bản ghi lịch sử thay dầu */
	if (typeof(btnCreate)!== 'undefined') {
		btnCreate.addEventListener("click",function(){
			/* Validate Form */
			var data = validateInput('oil');
			/*Kiểm tra đầu vào nếu hợp lệ gọi Ajax thêm dữ liệu*/
			if (Object.keys(data).length != 5) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let url = './Ajax/addNewRecord';
				let method = "POST";		
				sendAjaxRequest(url,method,addNewRecord,JSON.stringify(data));
				/*Cập nhật lại chỉ số phân trang*/
				let initUrl = './Ajax/numberOfRecord';
				let initMethod = "GET";
				sendAjaxRequest(initUrl,initMethod,initializeView);
				hideModal(dialog[0]);
			}
		})
	}

/* Code phần hiện modal tính năng sửa đổi bản ghi lịch sử thay dầu 
Kết hợp event delegation (Sẽ bắt sự kiện click cho các phần tử mới được thêm vào trang sau khi đã tải xong) nguồn tham khảo :
https://codetot.net/javascript-delegation-event/#Event_Delegation_trong_Plain_Javascript
http://bdadam.com/blog/plain-javascript-event-delegation.html

Ý tưởng : khi phần tử con "BUTTON" được click tương đương với việc phần tử cha của nó "TBODY" cũng đc click
Khi phần tử TBODY được click ta sẽ xác định đối tượng được click qua biến target = event.target
"event. target: là phần tử mà user tương tác (click, change).
Ở đây thì khi user click vào button edit thì target là button vừa click".
Ta sẽ tiến hành kiểm tra xem phần tử vừa được click (selector = target) có phải là button Edit hay không
Nếu có thì sẽ gọi hàm showModal_editDialog qua phương thức call { showModal_editDialog.call() }
Lưu ý : khi kiểm tra phần tử đang được tương tác (target) trong for thì phải tạo ra 1 biến selector để kiểm tra.
Nếu không sẽ chỉ lấy được phần tử button Edit đầu tiên trong TBODY
*/
	var oilTable = document.querySelector('table');
	oilTable.onclick = function(event){
		var btnEdits =  document.querySelectorAll('.edit__button');
		var target = event.target; // Chỉ ra phần tử đang được tương tác
		btnEdits.forEach((btnEdit)=>{
			var selector = target; // bắt buộc phải có phần tử selector, không được so sánh trực tiếp phần tử target
			while(selector && selector !== oilTable){
				if (selector === btnEdit) {
					return showModal_editDialog.call();// Chỗ này mở ngoặc nhọn {} rồi viết funtion xử lí cũng được nhưng nên tách ra cho gọn
				} selector = selector.parentNode;	
			}
		})
	}
/* Code tính năng sửa đổi bản ghi lịch sử thay dầu */
	if (typeof(btnUpdate)!== 'undefined') {
		btnUpdate.addEventListener('click',function(){
			var data = validateInput('oil');
			if (Object.keys(data).length != 5) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else{
				data["transId"] = btnUpdate.getAttribute("transactionId");
				let xhr = new XMLHttpRequest();
				let url = './Ajax/updateRecord';
				let method = "POST";
				sendAjaxRequest(url,method,updateRecord,JSON.stringify(data));
				hideModal(dialog[0]);
			} 
		});
	}

/* Dùng hàm on() được viết lại từ cách sử dụng event delegation để áp dụng event cho các button delete được thêm sau khi load trang*/
	on('table','click','.remove__button',showModal_deleteDialog);

/* Code tính năng xoá 1 bản ghi lịch sử thay dầu */
	if (typeof(btnDelete)!== 'undefined') {
		btnDelete.addEventListener('click',()=>{
			var transId = btnDelete.getAttribute("transId");
			var data = JSON.stringify({transactionId:transId});
			let method = "POST";
			let url = './Ajax/deleteRecord';
			sendAjaxRequest(url, method, deleteRecord, data);	
			hideModal(dialog[1]);
		})
	}
}
/* Viết lại function show dialog cho tất cả các phần tử, kể cả phần tử được thêm vào sau khi load page 
để tái sử dụng, ( áp dụng cho button delete ) (tham khảo event delegation trong jquery)*/
function on(parentSelector, eventName, selector, fn) {
	var element = document.querySelector(parentSelector);
	if (element){
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
}
/* Syntax exam : on('tbody', 'click', '.table__action-edit', showModal_editDialog); */
/*==================================================================================================================*/

/*==================================================================================================================*/
/*                                        -- Code For Pagination --           	         							*/
/*==================================================================================================================*/

/*Tính số bản ghi sẽ hiển thị trong 1 trang 
Viết funtion hiển thị dòng thông báo show bao nhiêu record*/
var pagination = {
		startIndex: null,
		endIndex : null,
		display: null,
		totalRecords: null,
		pages: 1,
		currentPage: 1
	}
var btnCurrentPage = document.getElementById("current_page");
var btnPreviousPage = document.getElementById("previous_page");
var btnNextPage = document.getElementById("next_page");
var entries = document.querySelector('#table_record');

function numberOfRecord(start,display,totalEntries){
	let recordCounting = document.getElementById("count__record");
	recordCounting.innerHTML = "Showing "+start+" to "+display+" of "+totalEntries+" entries";
}

function disableButton(button) {
	if (button.getAttribute("class") == "btn__enable") {
		button.removeAttribute("class");
	}
	button.setAttribute("disabled","disabled");
}

function enableButton(button) {
	if (button.getAttribute("disabled") == "disabled") {
		button.removeAttribute("disabled");
	}
	button.setAttribute("class","btn__enable");
}

function determineTheIndex(){
	pagination.display = Number(entries.value);

	pagination.endIndex = pagination.startIndex + pagination.display - 1;
	if (pagination.endIndex > pagination.totalRecords) {
		pagination.endIndex = pagination.totalRecords;
	}

	pagination.pages = Math.ceil(pagination.totalRecords/pagination.display);

	return pagination.display,pagination.endIndex,pagination.pages;
}

function customizeView(data){
	if (typeof(data)==="string") {
		responseData = JSON.parse(data);
		let new_tbody = document.createElement('tbody');
		let templateFrag = document.querySelector("#newRow").content;
		if (urlArray.indexOf("Oil")!=-1) {
			for (var i = 0 ; i < responseData.length ;i++){
			//Sử dụng cloneNode để sao chép toàn bộ phần tử template 
				var templ = templateFrag.cloneNode(true);
				responseData[i].och_id < 10 ? rowId = '0' + responseData[i].och_id : rowId = responseData[i].och_id;
				templ.querySelector(".rowContent").setAttribute("id",responseData[i].och_id);
				templ.querySelector("td").innerText = rowId+".";
				templ.querySelector(".rowContent td:nth-child(2)").innerText = responseData[i].product_name;
				templ.querySelector(".rowContent td:nth-child(3)").innerText = responseData[i].end_day;
				templ.querySelector(".rowContent td:nth-child(4)").innerText = responseData[i].total_days;
				templ.querySelector(".rowContent td:nth-child(5)").innerText = responseData[i].total_km;
				templ.querySelector(".rowContent td:nth-child(6)").innerText = responseData[i].product_price;
				templ.querySelector(".rowContent td:nth-child(7)").innerText = assessmentStatuses(responseData[i].total_km);
				templ.querySelector(".rowContent td:nth-child(7)").setAttribute("class","table__status table__status-"+assessmentStatuses(responseData[i].total_km));
				new_tbody.appendChild(templ);
			}
		} else if(urlArray.indexOf("Wallet")!=-1 && urlArray.indexOf("Category")!=-1){
			for (var i = 0 ; i < responseData.length ;i++){
				var templ = templateFrag.cloneNode(true);
				responseData[i].cat_id < 10 ? rowId = '0' + responseData[i].cat_id : rowId = responseData[i].cat_id;
				templ.querySelector(".rowContent").setAttribute("id",responseData[i].cat_id);
				templ.querySelector("td").innerText = rowId+".";
				templ.querySelector(".rowContent td:nth-child(2)").innerText = responseData[i].category_type;
				templ.querySelector(".rowContent td:nth-child(3) span").innerText = responseData[i].category_name;
				templ.querySelector(".rowContent td:nth-child(3) span").style.background = responseData[i].color;
				templ.querySelector("i").setAttribute("class","fa-solid fa-"+responseData[i].icon+" fa-sm");
				new_tbody.appendChild(templ);
			}
		}
		document.querySelector('tbody').parentNode.replaceChild(new_tbody,document.querySelector('tbody'));	
	}
}

function initializeView(data) {
	pagination.display = Number(entries.value);
	if (typeof(data)==="string") {
		totalRecords = JSON.parse(data).totalRecords;
		if (pagination.display > totalRecords) {
			pagination.display = Number(totalRecords);
		}
		if (totalRecords > pagination.display) {
			pagination.pages = Math.ceil(totalRecords/pagination.display);
		}
		pagination.totalRecords = Number(totalRecords);
		pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
	}
	numberOfRecord(pagination.startIndex,pagination.display,pagination.totalRecords);
	/* Nếu số trang lớn hơn 1 thì tiến hành phân trang */
	if (pagination.pages > 1) {
		pagination.currentPage = Number(btnCurrentPage.innerText);
		enableButton(btnNextPage);
	}
}	

/* Khi load Page */
window.addEventListener("load",function(event){
	if (urlArray.indexOf("Oil") != -1){
		let initUrl = './Ajax/numberOfRecord';
		let initMethod = "GET";
		sendAjaxRequest(initUrl,initMethod,initializeView);
	} 
	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
		let initUrl = '../Ajax/TotalCategory';
		let initMethod = "GET";
		sendAjaxRequest(initUrl,initMethod,initializeView);
	}
})
var paginationUrl = './Ajax/Pagination';
var paginationMethod = "POST";
if(entries,btnNextPage,btnPreviousPage){
	entries.addEventListener('change',function(){
		pagination.startIndex = 1;
		pagination.currentPage = 1;
		disableButton(btnPreviousPage);
		btnCurrentPage.innerText = pagination.currentPage
		determineTheIndex();
		if (pagination.pages > 1) {
			enableButton(btnNextPage);
		} else{
			disableButton(btnNextPage);
		}
		if (urlArray.indexOf("Oil")!=-1) {
			let data = JSON.stringify({
				"start":pagination.startIndex,
				"display":entries.value,
				"pagi_for":"oil" });
			sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
		}
		if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
			let data = JSON.stringify({
				"start":pagination.startIndex,
				"display":entries.value,
				"pagi_for":"category" });
			let paginationUrl = "../Ajax/Pagination";
			sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
		}
		numberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
	})
	/* Code khi click btnNextPage */
	btnNextPage.addEventListener("click",function(){
		if(pagination.currentPage < pagination.pages){
			/* Show current page index */
			pagination.currentPage++;
			btnCurrentPage.innerText = pagination.currentPage;
			pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
			determineTheIndex();
			if (pagination.currentPage == pagination.pages) {
				disableButton(btnNextPage);
			}
			enableButton(btnPreviousPage);
			if (urlArray.indexOf("Oil")!=-1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"oil" });
				sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
			}
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"category" });
				let paginationUrl = "../Ajax/Pagination";
				sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
			}
			numberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
		}		
	})
	/* Code khi click btnNextPage */
	btnPreviousPage.addEventListener("click",function(){
		if(pagination.currentPage > 1){
			/* Show current page index */
			pagination.currentPage--;
			btnCurrentPage.innerText = pagination.currentPage;
			pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
			determineTheIndex();
			if (pagination.currentPage == 1) {
				disableButton(btnPreviousPage);
			}
			enableButton(btnNextPage);
			if (urlArray.indexOf("Oil")!=-1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"oil" });
				sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
			}
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"category" });
				let paginationUrl = "../Ajax/Pagination";
				sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
			}
			numberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
		}		
	})
}
/*==================================================================================================================*/

/*==================================================================================================================*/
/*                                        -- Code For Wallet/Category --           	         			  			*/
/*==================================================================================================================*/
var categoryType = document.getElementById('form__add-cat_type');
var categoryName = document.getElementById('form__add-cat_name');
var categoryColor = document.getElementById('form__add-cat_color');
var categoryIcons = document.getElementsByName("icon");
var catNameInfor = document.getElementById("category_name_info");
var catTypeInfor = document.getElementById("category_type_info");
var catColorInfor = document.getElementById("category_color_info");
var btnChange = document.querySelector(".change__button"); 

window.onload = function(){
	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
		let url = '../Ajax/ShowListCategories';
		let method = "GET";
		sendAjaxRequest(url,method,showCategoryView);
	}
}

function showCategoryView(data){
	if (typeof(data)==="string") {
		responseData = JSON.parse(data);
		let templateFrag = document.querySelector('#category__template').content;
		let categoriesList = document.querySelector('.category__content');
		for (let i = 0; i < responseData.length; i++) {
			var categoryTemp = templateFrag.cloneNode(true);
			categoryTemp.querySelector('.category__content-item').setAttribute('id','category'+responseData[i].cat_id)
			categoryTemp.querySelector('.category__content-item').setAttribute('style','background:'+responseData[i].color);
			if (i == 0) {
				categoryTemp.querySelector('.category__content-item').setAttribute('style','background-image:linear-gradient(to right,#024fa0 0%,#024fa0 32%,#f2721e 33%  ,#f2721e 66%,#50b846 67%, #50b846 100%)');
			}
			categoryTemp.querySelector("h1").innerText = responseData[i].category_name;
			categoryTemp.querySelector('.category__content-item-left-desc').innerText = responseData[i].category_type;
			categoryTemp.querySelector("i").setAttribute('class',"fa-solid fa-"+responseData[i].icon+" fa-sm");
			categoriesList.appendChild(categoryTemp);
		}
	}
}

function showListView(data){
	if (typeof(data)==="string") {
		responseData = JSON.parse(data);
		let templateFrag = document.querySelector('#newRow').content;
		let viewList = document.querySelector('.list__content');
		let new_tbody = document.createElement('tbody');
		let old_tbody = document.querySelector('tbody');
		for (let i = 0; i < responseData.length; i++) {
			var newRow = templateFrag.cloneNode(true);
			newRow.querySelector("tr").setAttribute("id",responseData[i].cat_id);
			newRow.querySelector("td").innerText = responseData[i].cat_id;
			newRow.querySelector("td:nth-child(2)").innerText = responseData[i].category_type;
			newRow.querySelector("td:nth-child(3) span").innerText = responseData[i].category_name;
			newRow.querySelector("td:nth-child(3) span").style.background = responseData[i].color;
			newRow.querySelector("i").setAttribute("class","fa-solid fa-"+responseData[i].icon+" fa-sm");
			new_tbody.appendChild(newRow);
		}
		old_tbody.parentNode.replaceChild(new_tbody,old_tbody);
	}
}

function addCategory(data){
	if (typeof('data')==="string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			let templateFragRoot = document.querySelector("#category__template").content;
			let templateFrag = templateFragRoot.cloneNode(true);
			templateFrag.querySelector(".category__content-item").setAttribute('style',"background:"+responseData.color)
			templateFrag.querySelector("h1").innerText = responseData.type;
			templateFrag.querySelector(".category__content-item-left-desc").innerText = responseData.name;
			templateFrag.querySelector("i").setAttribute("class","fa-solid fa-"+responseData.icon+" fa-sm");
			document.querySelector(".category__content").appendChild(templateFrag);
			popupMessage("success","add","category");
		} else {
			popupMessage("failure","add","category");
		}
	}else {
		popupMessage("failure","add","category");
	}
	hideModal(dialog[0]);
}

function showModal_editCategory(event){
	showModal(dialog[0]);
	retitleDialog(titleDialog,"Update Category",btnUpdate,btnCreate);
	retitleLabel('category');
	var target = event.target;
	let categoryId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			categoryId = target.getAttribute("id");
		}
		target = target.parentNode;
	}
	let url = '../Ajax/ShowACategory'
	let method = 'POST';
	let catId = JSON.stringify({"categoryId":categoryId});
	sendAjaxRequest(url,method,loadModal_CategoryDialog,catId);

	function loadModal_CategoryDialog(data) {
		if(typeof(data)==="string"){
			responseData = JSON.parse(data);
			categoryType.value = responseData[0].category_type;
			categoryName.value = responseData[0].category_name;
			categoryColor.value = responseData[0].color;
			for(let categotyIcon of categoryIcons){
				if (categotyIcon.value == responseData[0].icon) {
					categotyIcon.setAttribute("checked","checked");
				} else{
					categotyIcon.removeAttribute("checked");
				}
			}
			btnUpdate.setAttribute("idC",categoryId);
		}
	}
}

function editCategory(data){
	if (typeof(data)=="string") {
		responseData = JSON.parse(data);
		if(responseData != "false"){
			let rowEdited = document.getElementById(responseData[0].cat_id);
			rowEdited.querySelector("td:nth-child(2)").innerText = responseData[0].category_type;
			rowEdited.querySelector("td:nth-child(3) span").innerText = responseData[0].category_name;
			rowEdited.querySelector("td:nth-child(3) span").style.background = responseData[0].color;
			rowEdited.querySelector("i").setAttribute("class","fa-solid fa-"+responseData[0].icon+" fa-sm");
			popupMessage('success','edit','category');
		} else {
			popupMessage('failure','edit','category');
		}
	} else {
		popupMessage('failure','edit','category');
	}
	hideModal(dialog[0]);
}

function showModal_deleteCategory(){
	var target = event.target;
	var catId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			catId = target.getAttribute("id");
		}
		target = target.parentNode;
		/* Reload lại các phần tử dùng để thông báo */
		headerPopup.setAttribute("class","header__popup");
		headerPopup.removeAttribute("style");
		/* Gọi modal Delete*/
		delFormContent.style.minWidth = "initial";
		delFormContent.style.minHeight = "initial";
		delFormContent.style.top = ((window.innerHeight/2) - (delFormContent.offsetHeight/2))+'px';
		document.querySelector(".dialog__form").style.gridTemplateColumns = "1fr";
		showModal(dialog[1]);
		btnDelete.setAttribute("catId",catId);
	}
}

function deleteCategory(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if(responseData.status != "false"){
			/* Hàm rowIndex dùng để lấy ra vị trí của hàng có id = catId trong bảng*/
			let index = document.getElementById(responseData.cat_id).rowIndex;
			/* Hàm deleteRow dùng để xoá 1 hàng có vị trí index-1 trong bảng vì bảng bắt đầu bằng row 0*/
			document.querySelector('tbody').deleteRow(index-1);
			popupMessage("success","delete","category");
		} else {
			/*In ra câu thông báo thất bại*/
			popupMessage("failure","delete","category");
		}
	}
}

if (urlArray.indexOf("Wallet")!=-1 && urlArray.indexOf("Category")!=-1) {
	if (typeof(btnAdd)!=='undefined') {
		btnAdd.addEventListener('click',function(){
			showModal(dialog[0]);
			retitleDialog(titleDialog,"Add a new category",btnCreate,btnUpdate);
			retitleLabel('category');
			categoryType.value = "";
			categoryName.value = "";
			categoryColor.value = "#12D370";
		})
	}

	if (typeof(btnCreate)!=='undefined') {
		btnCreate.addEventListener('click',function(){
			var categoryData = validateInput('category');
			for (var i = 0; i < categoryIcons.length; i++) {
				if (categoryIcons[i].checked) {
					categoryData["icon"] = categoryIcons[i].value;
				}
			}
			/*Nếu không có icon nào được chọn thì mặc định chọn icon đầu tiên*/
			if (!categoryData.hasOwnProperty('icon')) {
				categoryData["icon"] = 'sack-dollar';
			}
			//console.log(categoryData);
			if(Object.keys(categoryData).length != 4){
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let url = '../Ajax/AddANewCategory';
				let method = "POST";
				sendAjaxRequest(url,method,addCategory,JSON.stringify(categoryData));

				let initUrl = '../Ajax/TotalCategory';
				let initMethod = "GET";
				sendAjaxRequest(initUrl,initMethod,initializeView);
			}
		})
	}

	on('table', 'click', '.edit__button', showModal_editCategory);

	if (btnUpdate!== 'undefined') {
		btnUpdate.addEventListener("click",function(){
			var categoryData = validateInput('category');
			categoryData["cat_id"] = btnUpdate.getAttribute("idC");
			for (var i = 0; i < categoryIcons.length; i++) {
				if (categoryIcons[i].checked) {
					categoryData["icon"] = categoryIcons[i].value;
				}
			}
			/*Nếu không có icon nào được chọn thì mặc định chọn icon đầu tiên*/
			if (!categoryData.hasOwnProperty('icon')) {
				categoryData["icon"] = 'sack-dollar';
			}
			//console.log(categoryData);
			if(Object.keys(categoryData).length != 5){
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let url = "../Ajax/editCategory";
				let method = "POST";
				sendAjaxRequest(url,method,editCategory,JSON.stringify(categoryData));
			}
		})
	}

	on('table', 'click', '.remove__button',showModal_deleteCategory);

	if (typeof(btnDelete)!== 'undefined') {
		btnDelete.addEventListener('click',()=>{
			var catid = btnDelete.getAttribute("catid");
			var data = JSON.stringify({cat_id:catid});
			let method = "POST";
			let url = '../Ajax/deleteCategory';
			sendAjaxRequest(url, method, deleteCategory, data);		
			hideModal(dialog[1]);
		})
	}

	btnChange.addEventListener("click",function(){
		let categoryView = document.querySelector('.category__content');
		let listView = document.querySelector('#list__content');
		let old_tbody = document.querySelector('tbody');
		if (btnChange.value == "category view") {
			btnChange.value = "list view";
			btnChange.style.width = "calc(90rem / 16)";
			btnChange.querySelector("i").setAttribute("class","fa-solid fa-table-list");
			btnChange.querySelector("span").innerText = "List View";
			 categoryView.style.display = "grid";
			 listView.style.display = "none";
			var new_tbody = document.createElement('tbody');
			old_tbody.parentNode.replaceChild(new_tbody,old_tbody);
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
				let url = '../Ajax/ShowListCategories';
				let method = "GET";
				sendAjaxRequest(url,method,showCategoryView);
			}
		}else if(btnChange.value == "list view") {
			btnChange.value = "category view";
			btnChange.style.width = "calc(90rem / 12)";
			btnChange.querySelector("i").setAttribute("class","fa-solid fa-clipboard");
			btnChange.querySelector("span").innerText = "Category View";
			 categoryView.style.display = "none";
			 listView.style.display = "block";
			let oldCat = categoryView.children;
			while(categoryView.lastElementChild) {
				categoryView.removeChild(categoryView.lastElementChild);
			}
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
				let url = '../Ajax/Pagination';
				let method = "POST";
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"category" });
				sendAjaxRequest(url,method,showListView,data);
			}
		}
	})
}
/*==================================================================================================================*/

/*==================================================================================================================*/
/*                                        -- Code For Wallet/Transaction --           	         			  	    */
/*==================================================================================================================*/
function showStatistical(data){
	if (typeof(data) == 'string') {
		responseData = JSON.parse(data);
		let new_tbody = document.createElement('tbody');
		let templateFragRoot = document.querySelector("#statistical__list").content;
		var status_noti;
		var operator;
		var id;
		var difference = new Number;
		for (var i = 0; i < responseData.length; i++) {
			if (parseInt(responseData[i].receipt) < parseInt(responseData[i].expenditure) ) {
				status_noti = "expired";
				operator = "- ";
				difference = parseInt(responseData[i].expenditure) - parseInt(responseData[i].receipt);
			} else {
				status_noti = "good";
				operator = "+ ";
				difference = parseInt(responseData[i].receipt) - parseInt(responseData[i].expenditure);
			}
			//console.log("receipt"+responseData[i].receipt,"expenditures"+responseData[i].expenditures,"difference"+difference);
			let templateFrag = templateFragRoot.cloneNode(true);
			console.log(templateFrag.querySelectorAll("td"));
			id = i + 1;
			templateFrag.querySelector("td").innerText = id < 10 ? id = "0"+id : id +'.';
			templateFrag.querySelector("a").innerText = responseData[i].date;
			templateFrag.querySelector("a").href = 'Detail/'+ responseData[i].date;
			templateFrag.querySelector("td:nth-child(3)").innerText = numberWithCommas(responseData[i].receipt);
			templateFrag.querySelector("td:nth-child(4)").innerText = numberWithCommas(responseData[i].expenditure);
			templateFrag.querySelector("td:nth-child(5)").innerText = operator + vndCurrency(difference);
			templateFrag.querySelector("td:nth-child(5)").setAttribute("class","table__status table__status-"+status_noti);
			new_tbody.appendChild(templateFrag);
		}
		document.querySelector('tbody').parentNode.replaceChild(new_tbody,document.querySelector('tbody'));
	}
}

function loadModal_categoryList(data,output){
	if (typeof(data) == 'string') {
		var arr = [];
		arr = JSON.parse(data);
		let templateFrag = document.querySelector("#category-list").content;
		for (var i = 0; i < arr.length; i++) {
			let tmpl = templateFrag.cloneNode(true);
			tmpl.querySelector('option').setAttribute("value",arr[i].cat_id);
			tmpl.querySelector('option').innerText = arr[i].category_name;
			output.appendChild(tmpl);
		}
	}
}

function responseHandle(response,viewType){
	if (typeof(response) == 'string') {
		responseData = JSON.parse(response);
		var action = responseData.action;
		/* Action test */
		switch (action){
			case "add-transaction-and-show-statistical":
				/* ViewType check */
				if (viewType == "table-view") {
					/*Handle*/
					let newView = document.createElement('tbody');
					let templateFrag = document.querySelector("#statistical__list").content;
					var status_noti , operator , id;
					var difference = new Number;
					for (var i = 0; i < responseData.length; i++) {
						if (parseInt(responseData[i].receipt) < parseInt(responseData[i].expenditure) ) {
							status_noti = "expired";
							operator = "- ";
							difference = parseInt(responseData[i].expenditure) - parseInt(responseData[i].receipt);
						} else {
							status_noti = "good";
							operator = "+ ";
							difference = parseInt(responseData[i].receipt) - parseInt(responseData[i].expenditure);
						}
						let templateClone = templateFrag.cloneNode(true);
						let templateColumns = templateClone.querySelectorAll("td");
						let dataFill = Object.values(responseData);
						id = i + 1;
						templateFrag.querySelector("td").innerText = id < 10 ? id = "0"+id : id +'.';
						templateFrag.querySelector("a").innerText = responseData[i].date;
						templateFrag.querySelector("a").href = 'Detail/'+ responseData[i].date;
						templateFrag.querySelector("td:nth-child(3)").innerText = numberWithCommas(responseData[i].receipt);
						templateFrag.querySelector("td:nth-child(4)").innerText = numberWithCommas(responseData[i].expenditure);
						templateFrag.querySelector("td:nth-child(5)").innerText = operator + vndCurrency(difference);
						templateFrag.querySelector("td:nth-child(5)").setAttribute("class","table__status table__status-"+status_noti);
						new_tbody.appendChild(templateFrag);
					} /*End For loop*/
					document.querySelector('tbody').parentNode.replaceChild(newView,document.querySelector('tbody'));
					popupMessage("success","add","transaction");
				}
				break;
			case "add-transaction-and-show-detail":
				/* ViewType check */
				/*Handle*/
				break;
			case "update-transaction-and-show-detail":
				/* ViewType check */
				/*Handle*/
				break;
			case "delete-transaction-and-show-detail":
				/* ViewType check */
				/*Handle*/
				break;
		}
	}
}

function addTransaction_showStatistical(data){
	if (typeof(data) == 'string') {
		responseData = JSON.parse(data);
		if (responseData != "false" && responseData.status == 'success') {
			let url = '../Ajax/showStatistical';
			let method = "GET";
			sendAjaxRequest(url,method,showStatistical);
			popupMessage("success","add","transaction");
		} else {
			popupMessage("failure","add","transaction");
		}
	}
}

function addTransaction_showDetail(data){
	if (typeof(data) == 'string') {
		responseData = JSON.parse(data);
		console.log(responseData);
		if (responseData != "false" && responseData.status == 'success') {
			let templateFragRoot = document.querySelector('#transaction-list').content;
			let templateFrag = templateFragRoot.cloneNode(true);
			var id = document.querySelectorAll('tr').length;
			var status = responseData.transType == 'receipt' ? 'good' : 'expired';
			templateFrag.querySelector('tr').setAttribute('id',responseData.tranId)
			templateFrag.querySelector('td').innerText = id < 10 ? id = "0"+id+'.' : id +'.';
			templateFrag.querySelector('td:nth-child(2)').innerText = responseData.transType;
			templateFrag.querySelector('td:nth-child(2)').setAttribute('class','table__detail-column table__status table__status-'+status);
			templateFrag.querySelector('td:nth-child(3)').innerText = responseData.transName;
			templateFrag.querySelector('td:nth-child(4)').innerText = responseData.transCategory;
			templateFrag.querySelector('td:nth-child(5)').innerText = responseData.transDesc;
			templateFrag.querySelector('td:nth-child(6)').innerText = vndCurrency(responseData.transAmount);
			templateFrag.querySelector('td:nth-child(6)').value = responseData.transAmount;
			templateFrag.querySelector('td:nth-child(6)').setAttribute('class','table__detail-column table__status table__status-'+status);
			document.querySelector('tbody').appendChild(templateFrag);
			popupMessage("success","add","transaction");
		} else {
			popupMessage("failure","add","transaction");
		}
	}
}

function showSelectBox_yearList(data){
	if (typeof(data) == 'string') {
		var arr = [];
		arr = JSON.parse(data);
		let templateFrag = document.querySelector("#list-of-year").content;
		for (var i = 0; i < arr.length; i++) {
			let tmpl = templateFrag.cloneNode(true);
			tmpl.querySelector('input').setAttribute("value",arr[i].year);
			tmpl.querySelector('input').setAttribute("id","y"+arr[i].year);
			tmpl.querySelector('label').innerText = arr[i].year;
			tmpl.querySelector('label').setAttribute("for","y"+arr[i].year)
			if (arr[i].year == arr[i].current_year) {
				tmpl.querySelector('input').setAttribute("checked","checked");
				document.querySelector(".year-box").innerText = arr[i].year;
			}
			document.querySelector(".option-year-list").appendChild(tmpl);
		}
	}
}

function showSelectBox_monthList(data){
	if (typeof(data) == 'string') {
		var arr = [];
		arr = JSON.parse(data);
		let newMonthList = document.createElement('div');
		newMonthList.setAttribute("class","default-list");
		let templateFrag = document.querySelector("#list-of-month").content;
		for (var i = 0; i < arr.length; i++) {
			let tmpl = templateFrag.cloneNode(true);
			tmpl.querySelector('input').setAttribute("value",arr[i].month);
			tmpl.querySelector('input').setAttribute("id","m"+arr[i].month);
			tmpl.querySelector('label').innerText = "Tháng "+arr[i].month;
			tmpl.querySelector('label').setAttribute("for","m"+arr[i].month)
			if (arr[i].month == arr[i].current_month) {
				tmpl.querySelector('input').setAttribute("checked","checked");
				document.querySelector(".month-box").innerText = "Tháng "+arr[i].month;
			} else {
				document.querySelector(".month-box").innerText = "";
			}
			newMonthList.appendChild(tmpl);
		}
		document.querySelector(".option-month-list").replaceChild(newMonthList,document.querySelector('.default-list'))
	}
}
var dialogForm_TransType = document.getElementById("form__add-transaction-type");
var dialogForm_Category = document.getElementById("form__add-transaction-category");
var dialogForm_TransName = document.getElementById("form__add-transaction-name");
var dialogForm_Description = document.getElementById("form__add-transaction-desc");
var dialogForm_TransAmount = document.getElementById("form__add-transaction-amount");
var dialogForm_TransDate = document.getElementById("form__add-transaction-date");

var labelField_transType = document.getElementById("transtype_info");
var labelField_transName = document.getElementById("transname_info");
var labelField_category = document.getElementById("category_info");
var labelField_transDesc = document.getElementById("transdesc_info");
var labelField_transAmount = document.getElementById("transamount_info");
var labelField_transDate = document.getElementById("transdate_info");

var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1;
var currentYear = currentDate.getFullYear();
var timeInput = {"yearInput":currentYear,"monthInput":currentMonth};

if (currentMonth < 10) currentMonth = "0" + currentMonth;
if (currentDay < 10) currentDay = "0" + currentDay;

var today = currentYear + "-" + currentMonth + "-" + currentDay;

window.addEventListener("load",function(){
	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Transaction") != -1){
		let catUrl = '../Ajax/ShowListCategories';
		let method = "GET";
		sendAjaxRequest(catUrl,method,data => loadModal_categoryList(data,dialogForm_Category));
		btnAdd.addEventListener("click",function(){
			showModal(dialog[0]);
			retitleLabel('transaction');	
			labelField_transDate.innerText = "";
			/*Reload Form*/
			dialogForm_TransType.value = "null";
			dialogForm_Category.value = "null";
			dialogForm_TransDate.value = today;
			dialogForm_TransName.value = "";
			dialogForm_Description.value = "";
			dialogForm_TransAmount.value = "";
			
		})
		/*Autofill Transaction Name*/
		dialogForm_Category.addEventListener('change',(e)=>{
			var transValue;
			var optionList = dialogForm_Category.querySelectorAll('option');
			for (var i = 0; i < optionList.length; i++) {
				if (optionList[i].getAttribute('value') == dialogForm_Category.value) {
					transValue = optionList[i].innerText;
				}
			}
			dialogForm_TransName.value = transValue;
		})
		/*Thêm 1 transaction*/
		btnCreate.addEventListener("click",function(){
			let transData = validateInput('transaction');
			if (dialogForm_TransDate.getAttribute("type") == "date" && dialogForm_TransDate.value != '') {
				transData["transDate"] = dialogForm_TransDate.value;
			} else {
				labelField_transDate.innerText = "Date field can't be empty";
			}
			/*Object.keys(ObjectName).length = số lượng của object*/
			if (Object.keys(transData).length != 6) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let method = "POST";
				let url = "../Ajax/AddANewTransaction";
				sendAjaxRequest(url,method,addTransaction_showStatistical,JSON.stringify(transData))
				hideModal(dialog[0]);
			}
		})

		function hiddenBox(box){
			box.nextElementSibling.style.maxHeight = null;
			box.nextElementSibling.style.boxShadow = null;
		}

		function showBox(box){
			box.nextElementSibling.style.maxHeight = box.nextElementSibling.scrollHeight + "px";;
			box.nextElementSibling.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
		}

		let yearUrl = "../Ajax/GetYearStatistical";
		sendAjaxRequest(yearUrl,method,showSelectBox_yearList);
		let monthUrl = "../Ajax/GetMonthStatistical";
		sendAjaxRequest(monthUrl,method,showSelectBox_monthList);
		/* Khi click vào box thì hiện ra danh sách năm hoặc tháng */
		var inputBox = document.querySelectorAll(".input-box");
		var yearBox = inputBox[0];
		var monthBox = inputBox[1];
		inputBox.forEach((inputIndex)=>{
			inputIndex.addEventListener("click",function(e){
				e.stopPropagation();
				this.classList.toggle("show-list");
				var hiddenList = this.nextElementSibling;
				if (hiddenList.style.maxHeight) {
					hiddenList.style.maxHeight = null;
					hiddenList.style.boxShadow = null;
				} else {
					hiddenList.style.maxHeight = hiddenList.scrollHeight + "px";
					hiddenList.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
				}
			});
		})
		/* Khi click ra ngoài màn hình thì tự động đóng 2 box */
		document.addEventListener('click',function(){
			hiddenBox(yearBox);
			hiddenBox(monthBox);
			if (monthBox.classList.contains('show-list')) {
				monthBox.classList.remove('show-list')
			}
			if (yearBox.classList.contains('show-list')) {
				yearBox.classList.remove('show-list')
			}
		})
		/* Khi click vào box chọn năm thì xoá outline của box chọn tháng nếu đang hiện và ẩn list tháng */
		yearBox.addEventListener('click',(e)=>{
			hiddenBox(monthBox);
			if (monthBox.classList.contains('show-list')) {
				monthBox.classList.remove('show-list')
			}
		})

		on(".option-year-list",'click','.year-list',selectYear);

		function selectYear(){
			var yearList = document.querySelectorAll(".year-list");
			yearList.forEach((year)=>{
				year.addEventListener("change",(e)=>{
					yearBox.innerText = year.nextElementSibling.innerText;
					hiddenBox(yearBox);
					let data = JSON.stringify({"y":year.nextElementSibling.innerText});
					let monthUrl = "../Ajax/GetMonthStatistical";
					let method = "POST";
					sendAjaxRequest(monthUrl,method,showSelectBox_monthList,data);
					timeInput["yearInput"] = Number(yearBox.innerText);
				})
			})
		}

		/* Khi click vào box chọn tháng thì xoá outline của box chọn năm nếu đang hiện và ẩn list năm */
		monthBox.addEventListener('click',(e)=>{
			hiddenBox(yearBox);
			if (yearBox.classList.contains('show-list')) {
				yearBox.classList.remove('show-list')
			}
			
		})
		on(".option-month-list",'click','.month-list',selectMonth);

		function selectMonth(){
			var monthList = document.querySelectorAll(".month-list");
			monthList.forEach((month)=>{
				month.addEventListener("change",(e)=>{
					monthBox.innerText = month.nextElementSibling.innerText;
					hiddenBox(monthBox);
					timeInput["monthInput"] = Number(month.value);
					let statisticalUrl = "../Ajax/showStatistical";
					sendAjaxRequest(statisticalUrl,"POST",showStatistical,JSON.stringify(timeInput));
				})
			})
		}
	}

	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Detail") != -1){
		let catUrl = '/ewallet/Ajax/ShowListCategories';
		let method = "GET";
		sendAjaxRequest(catUrl,method,data => loadModal_categoryList(data,dialogForm_Category));
		btnAdd.addEventListener("click",function(){
			showModal(dialog[0]);
			retitleDialog(titleDialog,"Add a new transaction",btnCreate,btnUpdate);
			retitleLabel('transaction');
			/*Reload Form*/
			dialogForm_TransType.value = "null";
			dialogForm_Category.value = "null";
			dialogForm_TransName.value = "";
			dialogForm_Description.value = "";
			dialogForm_TransAmount.value = "";
		})

		dialogForm_Category.addEventListener('change',(e)=>{
			var transValue;
			var optionList = dialogForm_Category.querySelectorAll('option');
			for (var i = 0; i < optionList.length; i++) {
				if (optionList[i].getAttribute('value') == dialogForm_Category.value) {
					transValue = optionList[i].innerText;
				}
			}
			dialogForm_TransName.value = transValue;
		})
		btnCreate.addEventListener("click",function(){
			let transData = validateInput('transaction');
			transData['transDate'] = urlArray[4];
			/*Object.keys(ObjectName).length = số lượng của object*/
			if (Object.keys(transData).length != 6) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				labelField_Dialog.innerText = "";
				let method = "POST";
				let url = "/ewallet/Ajax/AddANewTransaction";
				console.log(transData);
				sendAjaxRequest(url,method,addTransaction_showDetail,JSON.stringify(transData))
				hideModal(dialog[0]);
			}
		})
		on('table', 'click', '.edit__button', showModal_editTransaction);
		btnUpdate.addEventListener('click',()=>{
			let transData = validateInput('transaction');
			transData['transDate'] = urlArray[4];
			//send ajax
			if (Object.keys(transData).length != 6) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				transData["id"] = btnUpdate.getAttribute("idT");
				labelField_Dialog.innerText = "";
				let method = "POST";
				let url = "/ewallet/Ajax/EditTransaction";
				sendAjaxRequest(url,method,updateTransaction,JSON.stringify(transData))
				hideModal(dialog[0]);
			}
			//update database and review
			
		})
	}
})

function showModal_editTransaction(){
	showModal(dialog[0]);
	retitleDialog(titleDialog,"Update Transaction",btnUpdate,btnCreate);
	retitleLabel('transaction');
	/*Reload infor label*/
	var target = event.target;
	var rowEdited;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			rowEdited = target;
		}
		target = target.parentNode;
	}
	/*Load Data Form*/
	var data = {};
	data["id"] = rowEdited.getAttribute('id');
	data["transType"] = rowEdited.querySelector('td:nth-child(2)').getAttribute('value');
	data["transName"] = rowEdited.querySelector('td:nth-child(3)').innerText;
	data["transCat"] = rowEdited.querySelector('td:nth-child(4)').getAttribute('value');
	data["transDesc"] = rowEdited.querySelector('td:nth-child(5)').innerText;
	data["transAmount"] = rowEdited.querySelector('td:nth-child(6)').getAttribute('value');
	//console.log(data);
	dialogForm_TransType.value = data["transType"];
	dialogForm_Category.value = data["transCat"];
	dialogForm_TransName.value = data["transName"];
	dialogForm_Description.value = data["transDesc"];
	dialogForm_TransAmount.value = data["transAmount"];
	btnUpdate.setAttribute('idT',data["id"]);
}

function updateTransaction(data) {
	let responseData = JSON.parse(data);
	if (responseData != "false") {
		statusNoti = responseData.transType == 'expenditure' ? 'expired' : 'good';
		/* Update dòng dữ liệu đã được chỉnh sửa */
		let rowEdited = document.getElementById(btnUpdate.getAttribute("idT"));
		rowEdited.querySelector("td:nth-child(2)").setAttribute("class","table__detail-column table__status table__status-"+statusNoti);
		rowEdited.querySelector("td:nth-child(2)").innerText = responseData.transType;
		rowEdited.querySelector("td:nth-child(3)").innerText = responseData.transName;
		rowEdited.querySelector("td:nth-child(4)").innerText = responseData.transCategory;
		rowEdited.querySelector("td:nth-child(5)").innerText = responseData.transDesc;
		rowEdited.querySelector("td:nth-child(6)").innerText = vndCurrency(responseData.transAmount);
		rowEdited.querySelector("td:nth-child(6)").value = responseData.transAmount;
		rowEdited.querySelector("td:nth-child(6)").setAttribute("class","table__detail-column table__status table__status-"+statusNoti);
		/*In ra câu thông báo thành công*/
		popupMessage("success","edit","transaction");
	} else {
		popupMessage("failure","edit","transaction");
	}
}



/*End */

/*
Trong trang window.onload chỉ được gọi 1 lần, còn lại nên dùng window.addEventListener("load",function());
Khi dùng thẻ template thì trước khi thêm sửa xoá, phải dùng hàm cloneNode(true) để có thể sử dụng template đó nhiều lần
classList sử dụng contains,remove,add, replace class gần giống setAttribute

*/
