
/* Nguồn tham khảo 
	https://completejavascript.com/chuyen-html-template-sang-dom-node/
	https://codetot.net/javascript-delegation-event/#Event_Delegation_trong_Plain_Javascript
	http://bdadam.com/blog/plain-javascript-event-delegation.html
	=//=//=/=//=//= Callback =//=//=/=//=//=
	https://www.youtube.com/watch?v=W8vJ-yOtSbE&t=236s
	https://www.youtube.com/watch?v=LUt36WnREm0&t=222s
*/

/* Chú thích 
	headerPopup : là phần tử thông báo hànhd dộng thành công hay thất bại mỗi khi submit Form

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

	titleDialog dùng để hiển thị tiêu đề của modal

*/

var btnAddTransaction = document.getElementsByClassName("add__transaction-button");
var btnEditTransaction = document.getElementsByClassName('edit__transaction-button');
var btnDeleteTransaction = document.getElementsByClassName('delete__transaction-button');
var btnCancelAction = document.querySelector('.cancel__action-button');
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");

var headerPopup = document.querySelector(".header__popup");

var dialog = document.getElementsByClassName("dialog");
var titleDialog = document.querySelector('.dialog__content-header-label'); 

var delFormContent = document.getElementsByClassName("dialog__content")[1];
var delForm = document.getElementsByClassName("dialog__form")[1];
var dialogForm_startKm = document.getElementById("form__start-kilometer");
var dialogForm_endKm = document.getElementById("form__end-kilometer");
var dialogForm_product = document.getElementById("form__product");
var dialogForm_startDay = document.getElementById("form__start-day");
var dialogForm_endDay = document.getElementById("form__end-day");

var labelField_startKm = document.getElementById("start_km_info");
var labelField_endKm = document.getElementById("end_km_info");
var labelField_product = document.getElementById("product_info");


const currentUrl = window.location.pathname.toString();
const urlArray = currentUrl.split("/");

if (typeof(btnAddTransaction[0])!=='undefined') {
	btnAddTransaction[0].style.background  = "#6259ca";
}
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
function RetitleDialog(titleDialog,title,btnDisplays,btnHides){
	titleDialog.innerText = title;
	for(let btnDisplay of btnDisplays){
		btnDisplay.style.display = "";
	}
	for(let btnHide of btnHides){
		btnHide.style.display = "none";
	}
}

/*Viết function phân loại trạng thái hiển thị Good/Warning/Expired dựa vào số km */
function AssessmentStatuses (km){
	let status_noti = "good";
	if (km >= 1200 && km <= 1500) {
		status_noti = "warning";
	} else if (km >= 1500) {
		status_noti = "expired";
	}
	return status_noti;
}
/* Viết hàm tuỳ chỉnh nội dung popup thông báo thành công hay thất bạt*/
function PopupMessage(status,action,object){
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

/* Hai hàm thêm mã lỗi và xoá mã lỗi. Ý tưởng dùng mã lỗi để báo thông báo lỗi phù hợp */
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

/* Responsive modal nếu màn hình nhỏ */
function calculatePercentage(x, y)
{
	return (x/y)*100;
}

/* Ẩn Modal thêm bản ghi khi click vào dấu X */
btnCloseModal[0].addEventListener("click",()=>HideModal(dialog[0]));
/* Ẩn modal khi click vào button Cancel */
if (btnCancelAction) {
	btnCancelAction.addEventListener("click",()=>HideModal(dialog[1]));
}
/* Ẩn Modal thêm bản ghi khi click vào vị trí bất kỳ trên màn hình */
window.addEventListener("click",function(event){
	if (event.target == dialog[0]) {
		HideModal(dialog[0]);
	}
	if (event.target == dialog[1]) {
		HideModal(dialog[1]);
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

/* Viết hàm tối ưu lại code, thông báo lỗi nếu dữ liệu nhập vào không hợp lệ. 
   Bật button submit nếu tất cả dữ liệu nhập vào hợp lệ */
function ShowErrorNotification(pattern,value,errorLineNoti,submitBtn,errorCode,contentNoti){
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

/* Function call AJAX load thông tin sản phẩm */
function SendAjaxRequest(url,method,callback,data){
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
function ShowProductOption(data,output){
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
function ShowAddDialog(data){
	let curentDate = new Date().toJSON().slice(0, 10);
	var responseData = JSON.parse(data);
	dialogForm_startDay.value = responseData.end_day;
	dialogForm_endDay.value = curentDate;		
	dialogForm_startKm.value = responseData.end_km;
	dialogForm_endKm.value = null;
	dialogForm_product.value = null;
}

function AddNewRecord(data){
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
			templateFrag.querySelector(".rowContent td:nth-child(3)").innerText = responseData.end_day;
			templateFrag.querySelector(".rowContent td:nth-child(4)").innerText = responseData.total_days;
			templateFrag.querySelector(".rowContent td:nth-child(5)").innerText = responseData.total_km;
			templateFrag.querySelector(".rowContent td:nth-child(6)").innerText = responseData.product_price;
			templateFrag.querySelector(".rowContent td:nth-child(7)").innerText = AssessmentStatuses(responseData.total_km);
			templateFrag.querySelector(".rowContent td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+AssessmentStatuses(responseData.total_km));
			document.querySelector("tbody").appendChild(templateFrag);
			/*In ra câu thông báo thành công*/
			PopupMessage("success","add","record");
		} else {
			PopupMessage("failure","add","record");
		}
	} else {
		/*In ra câu thông báo thất bại*/
		PopupMessage("failure","add","record");
	}
}

function ShowEditDialog(){
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
	ShowModal(dialog[0]);
	labelField_startKm.innerText = "";
	labelField_endKm.innerText = "";
	labelField_product.innerText = "";
	RetitleDialog(titleDialog,'Edit transaction',[btnEditTransaction[0]],[btnAddTransaction[1]]);
	/* Gọi Ajax load dữ liệu của bản ghi tương ứng với số transactionId khi button Edit được click*/
	let id = JSON.stringify({"tranId":transactionId});
	let url = './Ajax/ShowRecordById';
	let method = "POST";
	SendAjaxRequest(url,method,LoadData_EditDialog,id);

	function LoadData_EditDialog(data) {
		responseData = JSON.parse(data);
		dialogForm_startDay.value = responseData.start_day;
		dialogForm_endDay.value = responseData.end_day;
		dialogForm_startKm.value = responseData.start_km;
		dialogForm_endKm.value = responseData.end_km;
		dialogForm_product.value = responseData.product_id;
		btnEditTransaction[0].setAttribute("transactionId",transactionId);
		/* Xoá ErrorCode trong mảng báo lỗi isCorrectInput. Vì dùng chung 1 dialog. Nếu trước đó 
		các chỉ mục label trong Add Form bị lỗi do nhập sai định dạng dữ liệu thì khi ấn vào btnEdit 
		sẽ phải xoá lỗi ở các chỉ mục label thì mới hợp logic*/
		let i = 0;
		while(i < isCorrectInput.length){
			isCorrectInput.pop();
		}		
	}		
}

function UpdateRecord(data){
	if (typeof(data)=== "string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			/* Update dòng dữ liệu đã được chỉnh sửa */
			let rowEdited = document.getElementById(btnEditTransaction[0].getAttribute("transactionId"));
			rowEdited.querySelector("td:nth-child(2)").innerText = responseData.product_name;
			rowEdited.querySelector("td:nth-child(3)").innerText = responseData.end_day;
			rowEdited.querySelector("td:nth-child(4)").innerText = responseData.total_days;
			rowEdited.querySelector("td:nth-child(5)").innerText = responseData.total_km;
			rowEdited.querySelector("td:nth-child(6)").innerText = responseData.product_price;
			rowEdited.querySelector("td:nth-child(7)").innerText = AssessmentStatuses(responseData.total_km);
			rowEdited.querySelector("td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+AssessmentStatuses(responseData.total_km));
			/*In ra câu thông báo thành công*/
			PopupMessage("success","edit","record");
		} else {
			PopupMessage("failure","edit","record");
		}
	} else {
		/*In ra câu thông báo thất bại*/
		PopupMessage("failure","edit","record");
	}
}

function ShowDeleteDialog(){
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
		ShowModal(dialog[1]);
		btnDeleteTransaction[0].setAttribute("transId",transactionId);
	}
}

function DeleteRecord(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if(responseData != "false"){
			/* Hàm rowIndex dùng để lấy ra vị trí của hàng có id = transId trong bảng*/
			let index = document.getElementById(transId).rowIndex;
			/* Hàm deleteRow dùng để xoá 1 hàng có vị trí index-1 trong bảng vì bảng bắt đầu bằng row 0*/
			document.querySelector('tbody').deleteRow(index-1);
			PopupMessage("success","delete","record");
		} else {
			/*In ra câu thông báo thất bại*/
			PopupMessage("failure","delete","record");
		}
	}
}

if (urlArray.indexOf("Oil") != -1) {
/*Tự động load ra thông tin sản phẩm dầu nhớt trong bảng tuỳ chọn thêm 1 bản ghi lịch sử thay dầu 
ngay khi trang được load. */
	let method = "GET";
	let url = './Ajax/ShowProductInfo';
	SendAjaxRequest(url,method,data => ShowProductOption(data,dialogForm_product));
/* data => ShowProductOption(data,dialogForm_product)) đóng vai trò là hàm callback 
được truyền trong hàm SendAjaxRequest(url,method,callback) */

/* Validate dữ liệu khi nhập form*/
	let pattern = /^[0-9]+$/;
	let contentNoti = "Invalid number format";
	let submitButton = document.querySelectorAll(".add__transaction-button");

	dialogForm_product.addEventListener("change",function(){
		let errorLineNotification = labelField_product;
		let contentNoti = "Please select an option";
		ShowErrorNotification(pattern,dialogForm_product.value,errorLineNotification,submitButton[1],"dialogForm_product",contentNoti);
		dialogForm_product[0].style.display = "none";
	})

	dialogForm_startKm.addEventListener('keyup',function(){
		let errorLineNotification = labelField_startKm;
		ShowErrorNotification(pattern,dialogForm_startKm.value,errorLineNotification,submitButton[1],"dialogForm_startKm",contentNoti);
	})

	dialogForm_endKm.addEventListener('keyup',function(){
		let errorLineNotification = labelField_endKm;
		ShowErrorNotification(pattern,dialogForm_endKm.value,errorLineNotification,submitButton[1],"dialogForm_endKm",contentNoti);
	})	

/* Hiện Modal thêm 1 bản ghi lịch sử thay dầu khi click vào nút "Add Transaction" */
	if (typeof(btnAddTransaction[0])!=='undefined') {
		btnAddTransaction[0].onclick = function(){
			/* Sửa lại Modal phù hợp trước khi hiển thị sau đó gọi modal ra */
			RetitleDialog(titleDialog,'Add a new transaction',[btnAddTransaction[1]],[btnEditTransaction[0]])
			ShowModal(dialog[0]);
			/* Reload lại các phần tử dùng để thông báo */
			headerPopup.setAttribute("class","header__popup");
			headerPopup.removeAttribute("style");
			labelField_endKm.innerText = "";
			labelField_product.innerText = "";
			/* Gọi Ajax */
			let url = ('./Ajax/ShowLastOption');
			let method = "GET";
			SendAjaxRequest(url,method,ShowAddDialog);
		};
	}

/* Validate dữ liệu nhập vào form Modal thêm 1 bản ghi lịch sử thay dầu 
Tạo ra 1 mảng chứa mã lỗi , nếu dữ liệu nhập vào hợp lệ sẽ xoá mã lỗi trong bảng và ngược lại */
	var isCorrectInput = ["dialogForm_product","dialogForm_endKm"];
 
/* Code tính năng thêm 1 bản ghi lịch sử thay dầu */
	let btnAddNewTrans = document.querySelectorAll(".add__transaction-button");
	if (typeof(btnAddNewTrans[1])!== 'undefined') {
		btnAddNewTrans[1].addEventListener("click",function(){
			if (isCorrectInput.length !== 0) {
				if (isCorrectInput.indexOf("dialogForm_startKm")!=-1) {
					labelField_startKm.innerText = "Invalid number format";
				}
				if (isCorrectInput.indexOf("dialogForm_endKm")!=-1) {
					labelField_endKm.innerText = "Invalid number format";
				}
				if (isCorrectInput.indexOf("dialogForm_product")!=-1) {
					labelField_product.innerText = "Please select an option";
				}
			} else{
				/* Gọi Ajax Add New Transaction */
				var data = {startDay:dialogForm_startDay.value,
					endDay:dialogForm_endDay.value,
					startKm:dialogForm_startKm.value,
					endKm:dialogForm_endKm.value,
					productId:dialogForm_product.value
				};
				let url = './Ajax/AddNewRecord';
				let method = "POST";		
				SendAjaxRequest(url,method,AddNewRecord,JSON.stringify(data));
				HideModal(dialog[0]);
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
Nếu có thì sẽ gọi hàm ShowEditDialog qua phương thức call { ShowEditDialog.call() }
Lưu ý : khi kiểm tra phần tử đang được tương tác (target) trong for thì phải tạo ra 1 biến selector để kiểm tra.
Nếu không sẽ chỉ lấy được phần tử button Edit đầu tiên trong TBODY
*/
	var oilTable = document.querySelector('table');
	oilTable.onclick = function(event){
		var btnEdits =  document.querySelectorAll('.oil__table-action-edit');
		var target = event.target; // Chỉ ra phần tử đang được tương tác
		btnEdits.forEach((btnEdit)=>{
			var selector = target; // bắt buộc phải có phần tử selector, không được so sánh trực tiếp phần tử target
			while(selector && selector !== oilTable){
				if (selector === btnEdit) {
					return ShowEditDialog.call();// Chỗ này mở ngoặc nhọn {} rồi viết funtion xử lí cũng được nhưng nên tách ra cho gọn
				} selector = selector.parentNode;	
			}
		})
	}
/* Code tính năng sửa đổi bản ghi lịch sử thay dầu */
	if (typeof(btnEditTransaction[0])!== 'undefined') {
		btnEditTransaction[0].addEventListener('click',function(){
			if (isCorrectInput.length !== 0) {
				ShowModal(dialog[0]);
				if (isCorrectInput.indexOf("dialogForm_startKm")!=-1) {
					labelField_startKm.innerText = "Invalid number format";
				}
				if (isCorrectInput.indexOf("dialogForm_endKm")!=-1) {
					labelField_endKm.innerText = "Invalid number format";
				}
				if (isCorrectInput.indexOf("dialogForm_product")!=-1) {
					labelField_product.innerText = "Please select an option";
				}	
			} else{
				var data = {transId:btnEditTransaction[0].getAttribute("transactionId"),
				startDay:dialogForm_startDay.value,
				endDay:dialogForm_endDay.value,
				startKm:dialogForm_startKm.value,
				endKm:dialogForm_endKm.value,
				productId:dialogForm_product.value};

				let xhr = new XMLHttpRequest();
				let url = './Ajax/UpdateRecord';
				let method = "POST";
				SendAjaxRequest(url,method,UpdateRecord,JSON.stringify(data));
				HideModal(dialog[0]);
			} 
		});
	}

/* Dùng hàm on() được viết lại từ cách sử dụng event delegation để áp dụng event cho các button delete được thêm sau khi load trang*/
	on('table','click','.oil__table-action-delete',ShowDeleteDialog);

/* Code tính năng xoá 1 bản ghi lịch sử thay dầu */
	if (typeof(btnDeleteTransaction[0])!== 'undefined') {
		btnDeleteTransaction[0].addEventListener('click',()=>{
			var transId = btnDeleteTransaction[0].getAttribute("transId");
			var data = JSON.stringify({transactionId:transId});
			let method = "POST";
			let url = './Ajax/DeleteRecord';
			SendAjaxRequest(url, method, DeleteRecord, data);	
			HideModal(dialog[1]);
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
/* Syntax exam : on('tbody', 'click', '.oil__table-action-edit', ShowEditDialog); */
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

function NumberOfRecord(start,display,totalEntries){
	let recordCounting = document.getElementById("count__record");
	recordCounting.innerHTML = "Showing "+start+" to "+display+" of "+totalEntries+" entries";
}

function DisableButton(button) {
	if (button.getAttribute("class") == "btn__enable") {
		button.removeAttribute("class");
	}
	button.setAttribute("disabled","disabled");
}

function EnableButton(button) {
	if (button.getAttribute("disabled") == "disabled") {
		button.removeAttribute("disabled");
	}
	button.setAttribute("class","btn__enable");
}

function DetermineTheIndex(){
	pagination.display = Number(entries.value);

	pagination.endIndex = pagination.startIndex + pagination.display - 1;
	if (pagination.endIndex > pagination.totalRecords) {
		pagination.endIndex = pagination.totalRecords;
	}

	pagination.pages = Math.ceil(pagination.totalRecords/pagination.display);

	return pagination.display,pagination.endIndex,pagination.pages;
}

function CustomizeViewTable(data){
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
				templ.querySelector(".rowContent td:nth-child(7)").innerText = AssessmentStatuses(responseData[i].total_km);
				templ.querySelector(".rowContent td:nth-child(7)").setAttribute("class","oil__table-status oil__table-status-"+AssessmentStatuses(responseData[i].total_km));
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

function InitializeView(data) {
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
	NumberOfRecord(pagination.startIndex,pagination.display,pagination.totalRecords);
	/* Nếu số trang lớn hơn 1 thì tiến hành phân trang */
	if (pagination.pages > 1) {
		pagination.currentPage = Number(btnCurrentPage.innerText);
		EnableButton(btnNextPage);
	}
}	

/* Khi load Page */
window.addEventListener("load",function(event){
	if (urlArray.indexOf("Oil") != -1){
		let initUrl = './Ajax/NumberOfRecord';
		let initMethod = "GET";
		SendAjaxRequest(initUrl,initMethod,InitializeView);
	} 
	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
		let initUrl = '../Ajax/TotalCategory';
		let initMethod = "GET";
		SendAjaxRequest(initUrl,initMethod,InitializeView);
	}
})
var paginationUrl = './Ajax/Pagination';
var paginationMethod = "POST";
if(entries,btnNextPage,btnPreviousPage){
	entries.addEventListener('change',function(){
		pagination.startIndex = 1;
		pagination.currentPage = 1;
		DisableButton(btnPreviousPage);
		btnCurrentPage.innerText = pagination.currentPage
		DetermineTheIndex();
		if (pagination.pages > 1) {
			EnableButton(btnNextPage);
		} else{
			DisableButton(btnNextPage);
		}
		if (urlArray.indexOf("Oil")!=-1) {
			let data = JSON.stringify({
				"start":pagination.startIndex,
				"display":entries.value,
				"pagi_for":"oil" });
			SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
		}
		if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
			let data = JSON.stringify({
				"start":pagination.startIndex,
				"display":entries.value,
				"pagi_for":"category" });
			let paginationUrl = "../Ajax/Pagination";
			SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
		}
		NumberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
	})
	/* Code khi click btnNextPage */
	btnNextPage.addEventListener("click",function(){
		if(pagination.currentPage < pagination.pages){
			/* Show current page index */
			pagination.currentPage++;
			btnCurrentPage.innerText = pagination.currentPage;
			pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
			DetermineTheIndex();
			if (pagination.currentPage == pagination.pages) {
				DisableButton(btnNextPage);
			}
			EnableButton(btnPreviousPage);
			if (urlArray.indexOf("Oil")!=-1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"oil" });
				SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
			}
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"category" });
				let paginationUrl = "../Ajax/Pagination";
				SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
			}
			NumberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
		}		
	})
	/* Code khi click btnNextPage */
	btnPreviousPage.addEventListener("click",function(){
		if(pagination.currentPage > 1){
			/* Show current page index */
			pagination.currentPage--;
			btnCurrentPage.innerText = pagination.currentPage;
			pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
			DetermineTheIndex();
			if (pagination.currentPage == 1) {
				DisableButton(btnPreviousPage);
			}
			EnableButton(btnNextPage);
			if (urlArray.indexOf("Oil")!=-1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"oil" });
				SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
			}
			if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1) {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"category" });
				let paginationUrl = "../Ajax/Pagination";
				SendAjaxRequest(paginationUrl,paginationMethod,CustomizeViewTable,data);
			}
			NumberOfRecord(pagination.startIndex,pagination.endIndex,pagination.totalRecords);
		}		
	})
}
/*==================================================================================================================*/

/*==================================================================================================================*/
/*                                        -- Code For Wallet/Category --           	         			  			*/
/*==================================================================================================================*/
var btnAddCategory = document.querySelectorAll('.add__category-button');
var btnEditCategory = document.querySelector('.edit__category-button');
var categoryType = document.getElementById('form__add-cat_type');
var categoryName = document.getElementById('form__add-cat_name');
var categoryColor = document.getElementById('form__add-cat_color');
var categoryIcons = document.getElementsByName("icon");
var catNameInfor = document.getElementById("category_name_info");
var catTypeInfor = document.getElementById("category_type_info");

window.onload = function(){
	if (urlArray.indexOf("Wallet") != -1 && urlArray.indexOf("Category") != -1){
		//console.log(urlArray);
		let url = '../Ajax/ShowListCategories';
		let method = "GET";
		SendAjaxRequest(url,method,ShowCategory);
	}
}

function ShowCategory(data){
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
			categoryTemp.querySelector("h1").innerText = responseData[i].category_type;
			categoryTemp.querySelector('.category__content-item-left-desc').innerText = responseData[i].category_name;
			categoryTemp.querySelector("i").setAttribute('class',"fa-solid fa-"+responseData[i].icon+" fa-sm");
			categoriesList.appendChild(categoryTemp);
		}
		
	}
}

function AddCategory(data){
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
			PopupMessage("success","add","category");
		} else {
			PopupMessage("failure","add","category");
		}
	}else {
		PopupMessage("failure","add","category");
	}
	HideModal(dialog[0]);
}

function ShowDialogUpdateCategory(event){
	ShowModal(dialog[0]);
	RetitleDialog(titleDialog,"Update Category",[btnEditCategory],[btnAddCategory[1]]);
	catTypeInfor.innerText = "";
	catNameInfor.innerText = "";
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
	SendAjaxRequest(url,method,LoadData_CategoryDialog,catId);

	function LoadData_CategoryDialog(data) {
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
			btnEditCategory.setAttribute("idC",categoryId);
		}
	}
}

function EditCategory(data){
	if (typeof(data)=="string") {
		responseData = JSON.parse(data);
		if(responseData != "false"){
			let rowEdited = document.getElementById(responseData[0].cat_id);
			rowEdited.querySelector("td:nth-child(2)").innerText = responseData[0].category_type;
			rowEdited.querySelector("td:nth-child(3) span").innerText = responseData[0].category_name;
			rowEdited.querySelector("td:nth-child(3) span").style.background = responseData[0].color;
			rowEdited.querySelector("i").setAttribute("class","fa-solid fa-"+responseData[0].icon+" fa-sm");
			PopupMessage('success','edit','category');
		} else {
			PopupMessage('failure','edit','category');
		}
	} else {
		PopupMessage('failure','edit','category');
	}
	HideModal(dialog[0]);
}

function ShowCategoryDeleteDialog(){
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
		ShowModal(dialog[1]);
		btnDeleteCategory.setAttribute("catId",catId);
	}
}

function DeleteCategory(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if(responseData != "false"){
			/* Hàm rowIndex dùng để lấy ra vị trí của hàng có id = transId trong bảng*/
			let index = document.getElementById(catid).rowIndex;
			/* Hàm deleteRow dùng để xoá 1 hàng có vị trí index-1 trong bảng vì bảng bắt đầu bằng row 0*/
			document.querySelector('tbody').deleteRow(index-1);
			PopupMessage("success","delete","category");
		} else {
			/*In ra câu thông báo thất bại*/
			PopupMessage("failure","delete","category");
		}
	}
}

if (urlArray.indexOf("Wallet")!=-1 && urlArray.indexOf("Category")!=-1) {
	if (typeof(btnAddCategory[0])!=='undefined') {
		btnAddCategory[0].style.background  = "#6259ca";
		btnAddCategory[0].addEventListener('click',function(){
			ShowModal(dialog[0]);
			catNameInfor.innerText = "";
			catTypeInfor.innerText = "";
			categoryType.value = "";
			categoryName.value = "";
			categoryColor.value = "#12D370";
			for(let categotyIcon of categoryIcons){
				if (categotyIcon.value == "sack-dollar") {
					categotyIcon.setAttribute("checked","checked");
				} else{
					categotyIcon.removeAttribute("checked");
				}
			}
			RetitleDialog(titleDialog,"Add a new category",[btnAddCategory[1]],[btnEditCategory]);
		})
	}

	if (categoryType) {
		categoryType.addEventListener('keyup',function(){
			let pattern = /^[a-zA-Z0-9 _-]+?$/;
			if(pattern.test(categoryType.value)){
				catTypeInfor.innerText = "";
			} else {
				catTypeInfor.innerText = "Category Type Invalid";
			}
		})
	}

	if (categoryName) {
		categoryName.addEventListener('keyup',function(){	
			let pattern = /^[a-zA-Z0-9 ]+?$/;
			if(pattern.test(categoryName.value)){
				catNameInfor.innerText = "";
			} else{
				catNameInfor.innerText = "Category Name Invalid";
			}
		})
	}

	if (typeof(btnAddCategory[1])!=='undefined') {
		btnAddCategory[1].addEventListener('click',function(){
			var categoryData = {"type":categoryType.value,
								"name":categoryName.value,
								"color":categoryColor.value};
			if (categoryType.value != "") {
				categoryData["type"] = categoryType.value;
			} else {
				catTypeInfor.innerText = "Category Type cannot be empty";
			}
			if (categoryType.value != "") {
				categoryData["name"] = categoryName.value;
			}else{
				catNameInfor.innerText = "Category Name cannot be empty";
			}
			for (var i = 0; i < categoryIcons.length; i++) {
				if (categoryIcons[i].checked) {
					categoryData["icon"] = categoryIcons[i].value;
				}
			}
			let url = '../Ajax/AddANewCategory';
			let method = "POST";
			SendAjaxRequest(url,method,AddCategory,JSON.stringify(categoryData));
		})
	}

	on('table', 'click', '.category__table-action-edit', ShowDialogUpdateCategory);

	if (btnEditCategory!== 'undefined') {
		btnEditCategory.addEventListener("click",function(){
			var data = {cat_id:btnEditCategory.getAttribute("idC"),
			cat_type:categoryType.value,
			cat_name:categoryName.value,
			cat_color:categoryColor.value};
			for (var i = 0; i < categoryIcons.length ; i++) {
				if (categoryIcons[i].checked) {
					data["cat_icon"] = categoryIcons[i].value;
				}
			}
			let url = "../Ajax/EditCategory";
			let method = "POST";
			SendAjaxRequest(url,method,EditCategory,JSON.stringify(data));
		})
	}

	on('table', 'click', '.category__table-action-delete',ShowCategoryDeleteDialog);
	var btnDeleteCategory = document.querySelector(".delete__category-button");

	if (typeof(btnDeleteCategory)!== 'undefined') {
		btnDeleteCategory.addEventListener('click',()=>{
			var catid = btnDeleteCategory.getAttribute("catid");
			var data = JSON.stringify({cat_id:catid});
			let method = "POST";
			let url = '../Ajax/DeleteCategory';
			SendAjaxRequest(url, method, DeleteCategory, data);		
			HideModal(dialog[1]);
		})
	}
}

/*End */

/*
Trong trang window.onload chỉ được gọi 1 lần, còn lại nên dùng window.addEventListener("load",function());
Khi dùng thẻ template thì trước khi thêm sửa xoá, phải dùng hàm cloneNode(true) để có thể sử dụng template đó nhiều lần
Khi
*/