var headerPopup = document.querySelector(".header__popup");
var dialog = document.getElementsByClassName("dialog");
var titleDialog = document.querySelector('.dialog-content-header-label h2'); 
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
var currentPage;
function definePage(){
	var currentPage;
	var filteredUrl = urlArray.filter(function (url) {
		return url != '';
	});
	filteredUrl.splice(filteredUrl.indexOf('ewallet'),1);
	if (filteredUrl.length == 0 || filteredUrl.indexOf('Dashboard')!=1) {
		currentPage = "dashboard";
	}

	if (filteredUrl.indexOf("Oil") != -1) {
		currentPage = "oil";
	}

	if (filteredUrl.indexOf("Wallet")!=-1 && filteredUrl.indexOf("Category")!=-1) {
		currentPage = "category";
	}

	if (filteredUrl.indexOf("Wallet")!=-1 && filteredUrl.indexOf("Transaction")!=-1) {
		currentPage = "transaction";
	}

	if (filteredUrl.indexOf("Wallet")!=-1 && filteredUrl.indexOf("Detail")!=-1) {
		currentPage = "detail";
	}
	return currentPage;
}
currentPage = definePage();
function showModal(modal){
	modal.style.opacity = "1";
	modal.style.visibility = "visible";
}
function hideModal(modal) {
	modal.style.opacity = "0";
	modal.style.visibility = "hidden";
}
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
function calculatePercentage(x, y){
	return (x/y)*100;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function vndCurrency(x) {
   return x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" ₫";
}
function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function formatCurrency(input, blur) {
	var input_val = input.value;
	if (input_val === "") { return; }
	var original_len = input_val.length;
	var caret_pos = input.getAttribute("selectionStart");
	input_val = formatNumber(input_val);
	input_val = input_val;
	original_val = input_val.replaceAll(',','');
	if (blur === "blur") {
		input_val += " ₫";
		input.setAttribute("real_val",original_val);
	}
	input.value = input_val;
}
if (document.querySelector("input[data-type='currency']")) {
	document.querySelector("input[data-type='currency']").addEventListener('keyup',()=>{
		formatCurrency(dialogForm_TransAmount);
	});
	document.querySelector("input[data-type='currency']").addEventListener('blur',()=>{ 
		formatCurrency(dialogForm_TransAmount, "blur");
	});

	document.querySelector("input[data-type='currency']").addEventListener('click',()=>{ 
		if (dialogForm_TransAmount.value.indexOf('₫')!==-1) {
			dialogForm_TransAmount.value = dialogForm_TransAmount.value.substring(0,dialogForm_TransAmount.value.length-2);
		}	
	});
}
function dateFormat(date){
	return date.split('-').reverse().join('-')
}

// console.log(btnClose)
btnCloses.forEach(function(btnClose){
	btnClose.addEventListener('click',function(){
		element = btnClose;
		while(element.parentNode){
			if(element.parentNode.matches('.dialog')){
				hideModal(element.parentNode)
				break;
			}
			element = element.parentNode;
		}
	})
})

// btnCloseModal[0].addEventListener("click",()=>hideModal(dialog[0]));
// if (btnCloseModal[1]) {
// 	btnCloseModal[1].addEventListener("click",()=>hideModal(dialog[1]));
// }
// if (btnCancel) {
// 	btnCancel.addEventListener("click",()=>hideModal(dialog[1]));
// }
window.addEventListener("click",function(event){
	if (event.target == dialog[0]) {
		hideModal(dialog[0]);
	}
	if (event.target == dialog[1]) {
		hideModal(dialog[1]);
	}
	if (currentPage == "category") {
		if (event.target != document.querySelector('#form__add-cat_type')){
			document.querySelector('.cat-type-arrow').classList.remove("show-list");
		}
	}
});
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
	retitleDialog(titleDialog,'Add a new transaction',btnCreate,btnUpdate);
	retitleLabel('oil');
	showModal(dialog[0]);
	headerPopup.setAttribute("class","header__popup");
	headerPopup.removeAttribute("style");
	let curentDate = new Date().toJSON().slice(0, 10);
	var responseData = JSON.parse(data);
	if (responseData == null) {
		dialogForm_startDay.value = curentDate;
		dialogForm_startKm.value = null;
	}else {
		dialogForm_startDay.value = responseData.end_day;
		dialogForm_startKm.value = responseData.end_km;
	}
	dialogForm_endDay.value = curentDate;		
	dialogForm_endKm.value = null;
	dialogForm_product.value = null;
}
function addNewRecord(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			if (responseData.total_km <= 1500) {
				status = "good";
				textColor = "#0dad95";
			} else if (responseData.total_km >= 2000){
				status = "expired";
				textColor = "#f8264a";
			} else{
				status = "warning";
				textColor = "#313db6";
			}
			let templateFragRoot = document.querySelector("#newRow").content;
			var templateFrag = templateFragRoot.cloneNode(true);
			let id = document.querySelectorAll('tr').length;
			let newRow = templateFrag.querySelector("tr");
			let newColumn = templateFrag.querySelectorAll("td");
			newRow.setAttribute('id',responseData.och_id);
			newColumn[0].innerText = id < 10 ? id = "0"+id+'.' : id +'.';
			newColumn[1].innerText = responseData.product_name;
			newColumn[2].innerText = dateFormat(responseData.end_day);
			newColumn[3].innerText = responseData.total_days;
			newColumn[4].innerText = numberWithCommas(responseData.total_km);
			newColumn[5].innerText = vndCurrency(responseData.product_price);
			newColumn[6].innerText = status;
			newColumn[6].style.color = textColor;
			document.querySelector("tbody").appendChild(templateFrag);
			popupMessage("success","add","record");
		} else {
			popupMessage("failure","add","record");
		}
	} else {
		popupMessage("failure","add","record");
	}
}
function showModal_editDialog(){
	var target = event.target;
	var transactionId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			transactionId = target.getAttribute("id");
		}
		target = target.parentNode;
	}
	headerPopup.setAttribute("class","header__popup");
	headerPopup.removeAttribute("style");
	showModal(dialog[0]);
	retitleDialog(titleDialog,'Edit transaction',btnUpdate,btnCreate);
	retitleLabel('oil');
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
			if (responseData.total_km <= 1500) {
				status = "good";
				textColor = "#0dad95";
			} else if (responseData.total_km >= 2000){
				status = "expired";
				textColor = "#f8264a";
			} else{
				status = "warning";
				textColor = "#313db6";
			}
			let rowEdited = document.getElementById(btnUpdate.getAttribute("transactionId"));
			let colEdited = rowEdited.querySelectorAll('td');
			colEdited[1].innerText = responseData.product_name;
			colEdited[2].innerText = dateFormat(responseData.end_day);
			colEdited[3].innerText = responseData.total_days;
			colEdited[4].innerText = numberWithCommas(responseData.total_km);
			colEdited[5].innerText = vndCurrency(responseData.product_price);
			colEdited[6].innerText = status;
			colEdited[6].style.color = textColor;
			popupMessage("success","edit","record");
		} else {
			popupMessage("failure","edit","record");
		}
	} else {
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
		headerPopup.setAttribute("class","header__popup");
		headerPopup.removeAttribute("style");
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
			let index = document.getElementById(responseData.transactionId).rowIndex;
			document.querySelector('tbody').deleteRow(index-1);
			popupMessage("success","delete","record");
		} else {
			popupMessage("failure","delete","record");
		}
	}
}
function validateInput(page){
	var data = new Object;
	switch(page){
		case 'oil':
			if(dialogForm_startDay.getAttribute("type") == "date" && dialogForm_startDay.value != ''){
				data["startDay"] = dialogForm_startDay.value;
			} else {
				labelField_startDay.innerText = "Invalid date forrmat";
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
				if(categoryType.value == 1) {
					if (categoryColor.value != "") {
						data["color"] = categoryColor.value;
					} else {
						catColorInfor.innerText = "cannot be empty";
					}
					data['direction'] = null;
				}
				if(categoryType.value == 2){
					if (categoryColor2.value != "") {
						data["color"] = categoryColor.value+","+categoryColor2.value;
					} else {
						catColorInfor.innerText = "2 cannot be empty";
					}
					if(data['direction']==null){
						data['direction'] = '90deg';
					} 
				}
				if(categoryType.value == 3){
					if (categoryColor3.value != "") {
						data["color"] = categoryColor.value+","+categoryColor2.value+","+categoryColor3.value;
					} else {
						catColorInfor.innerText = "cannot be empty";
					}
					if(data['direction']==null){
						data['direction'] = '90deg';
					}
				} 
			} else {
				catTypeInfor.innerText = "cannot be empty";
			}
			if (categoryName.value != "") {
				data["name"] = categoryName.value;
			}else{
				catNameInfor.innerText = "cannot be empty";
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
				data["transAmount"] = dialogForm_TransAmount.getAttribute('real_val');
			} else {
				labelField_transAmount.innerText = "Amount field can't be empty";
			}
			break;    
	}
	return data;
}
if (currentPage == 'oil') {
	let method = "GET";
	let url = './Ajax/ShowProductInfo';
	sendAjaxRequest(url,method,data => loadProductList(data,dialogForm_product));
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
	if (typeof(btnAdd)!=='undefined') {
		btnAdd.onclick = function(){
			let url = ('./Ajax/ShowLastOption');
			let method = "GET";
			sendAjaxRequest(url,method,showModal_addDialog);
		};
	}
	if (typeof(btnCreate)!== 'undefined') {
		btnCreate.addEventListener("click",function(){
			var data = validateInput('oil');
			if (Object.keys(data).length != 5) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let url = './Ajax/addNewRecord';
				let method = "POST";		
				sendAjaxRequest(url,method,addNewRecord,JSON.stringify(data));
				let initUrl = './Ajax/numberOfRecord';
				let initMethod = "GET";
				sendAjaxRequest(initUrl,initMethod,initializeView);
				hideModal(dialog[0]);
			}
		})
	}
	var oilTable = document.querySelector('table');
	oilTable.onclick = function(event){
		var btnEdits =  document.querySelectorAll('.btn-edit');
		var target = event.target;
		btnEdits.forEach((btnEdit)=>{
			var selector = target;
			while(selector && selector !== oilTable){
				if (selector === btnEdit) {
					return showModal_editDialog.call();
				} selector = selector.parentNode;	
			}
		})
	}
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
	on('table','click','.btn-remove',showModal_deleteDialog);
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
function fillColor(type,color,direction,row) {
	if (type == 1 ) {
		row.style.background = color;
	}
	if(type == 2){
		row.style.backgroundImage = "linear-gradient("+direction+","+color;
	}
	if(type == 3){
		let colorArr = color.split(',');
		color1 = colorArr[0];
		color2 = colorArr[1];
		color3 = colorArr[2];
		row.style.backgroundImage = "linear-gradient("+direction+","+color1+" 0%,"+color1+" 32%,"+color2+" 33%,"+color2+" 66%,"+color3+" 67%,"+color3+" 100%)";
	}
}
function customizeView(data){
	if (typeof(data)==="string") {
		responseData = JSON.parse(data);
		let new_tbody = document.createElement('tbody');
		let templateFrag = document.querySelector("#newRow").content;
		if (urlArray.indexOf("Oil")!=-1) {
			for (var i = 0 ; i < responseData.length ;i++){
				if (responseData[i].total_km <= 1200) {
					status = "good";
					textColor = "#0dad95";
				} else if (responseData[i].total_km >= 1500){
					status = "expired";
					textColor = "#f8264a";
				} else{
					status = "warning";
					textColor = "#313db6";
				}
				var templ = templateFrag.cloneNode(true);
				responseData[i].och_id < 10 ? rowId = '0' + responseData[i].och_id : rowId = responseData[i].och_id;
				let newRow = templ.querySelector(".rowContent");
				let newColumn = templ.querySelectorAll("td");
				newRow.setAttribute("id",responseData[i].och_id);
				newColumn[0].innerText = rowId+".";
				newColumn[1].innerText = responseData[i].product_name;
				newColumn[2].innerText = responseData[i].end_day;
				newColumn[3].innerText = responseData[i].total_days;
				newColumn[4].innerText = responseData[i].total_km;
				newColumn[5].innerText = responseData[i].product_price;
				newColumn[6].innerText = status;
				newColumn[6].style.color = textColor;
				new_tbody.appendChild(templ);
			}
		} else if(urlArray.indexOf("Wallet")!=-1 && urlArray.indexOf("Category")!=-1){
			for (var i = 0 ; i < responseData.length ;i++){
				var templ = templateFrag.cloneNode(true);
				let newRow = templ.querySelector(".rowContent");
				let newColumn = templ.querySelectorAll("td");
				let newSpan = templ.querySelector("span");
				let newIcon = templ.querySelector("i");
				responseData[i].cat_id < 10 ? rowId = '0' + responseData[i].cat_id : rowId = responseData[i].cat_id;
				newRow.setAttribute("id",responseData[i].cat_id);
				newColumn[0].innerText = rowId+".";
				newSpan.innerText = responseData[i].category_name;
				fillColor(responseData[i].category_type,responseData[i].color,responseData[i].direction,newSpan);
				newIcon.setAttribute("class","fa-solid fa-"+responseData[i].icon+" fa-sm");
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
	if (pagination.pages > 1) {
		pagination.currentPage = Number(btnCurrentPage.innerText);
		enableButton(btnNextPage);
	}
}	
window.addEventListener("load",function(event){
	if (currentPage == 'oil'){
		let initUrl = './Ajax/numberOfRecord';
		let initMethod = "GET";
		sendAjaxRequest(initUrl,initMethod,initializeView);
	} 
	if (currentPage == 'category'){
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
	btnNextPage.addEventListener("click",function(){
		if(pagination.currentPage < pagination.pages){
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
	btnPreviousPage.addEventListener("click",function(){
		if(pagination.currentPage > 1){
			pagination.currentPage--;
			btnCurrentPage.innerText = pagination.currentPage;
			pagination.startIndex = ((pagination.currentPage - 1) * pagination.display) + 1;
			determineTheIndex();
			if (pagination.currentPage == 1) {
				disableButton(btnPreviousPage);
			}
			enableButton(btnNextPage);
			if (currentPage == 'oil') {
				let data = JSON.stringify({
					"start":pagination.startIndex,
					"display":pagination.display,
					"pagi_for":"oil" });
				sendAjaxRequest(paginationUrl,paginationMethod,customizeView,data);
			}
			if (currentPage == 'category') {
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
var categoryType = document.getElementById('form__add-cat_type');
var categoryName = document.getElementById('form__add-cat_name');
var categoryColor = document.getElementById('form__add-cat_color');
var categoryColor2 = document.getElementById('form__add-cat_color2');
var categoryColor3 = document.getElementById('form__add-cat_color3');
var colorBox = document.querySelectorAll('.color-box');
colorBox1 = colorBox[0];
colorBox2 = colorBox[1];
colorBox3 = colorBox[2];
var categoryIcons = document.getElementsByName("icon");
var colorDirections = document.getElementsByName("direction");
var catNameInfor = document.getElementById("category_name_info");
var catTypeInfor = document.getElementById("category_type_info");
var catColorInfor = document.getElementById("category_color_info");
var colorDirectionInfor = document.getElementById("direction_color_info");
var btnChange = document.querySelector(".change__button"); 
window.onload = function(){
	if (currentPage == 'category'){
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
			let newCard = categoryTemp.querySelector(".category__content-item");
			let newTitle = categoryTemp.querySelector("h1");
			let newIcon = categoryTemp.querySelector("i");
			newCard.setAttribute('id','category'+responseData[i].cat_id)
			fillColor(responseData[i].category_type,responseData[i].color,responseData[i].direction,newCard);
			newTitle.innerText = responseData[i].category_name;
			newIcon.setAttribute('class',"fa-solid fa-"+responseData[i].icon+" fa-sm");
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
		var id;
		for (let i = 0; i < responseData.length; i++) {
			id = i +1 ;
			var newRow = templateFrag.cloneNode(true);
			let newLine = newRow.querySelector("tr");
			let newColumn = newRow.querySelectorAll("td");
			let newSpan = newRow.querySelector("span");
			let newIcon = newRow.querySelector("i");
			newLine.setAttribute("id",responseData[i].cat_id);
			newColumn[0].innerText = id < 10 ? id = "0"+id+'.' : id +'.';
			newSpan.innerText = responseData[i].category_name;
			fillColor(responseData[i].category_type,responseData[i].color,responseData[i].direction,newSpan);
			newIcon.setAttribute("class","fa-solid fa-"+responseData[i].icon+" fa-sm");
			new_tbody.appendChild(newRow);
		}
		old_tbody.parentNode.replaceChild(new_tbody,old_tbody);
	}
}
function addCategory(data){
	if (typeof('data')==="string") {
		let responseData = JSON.parse(data);
		if (responseData != "false") {
			console.log(responseData);
			let templateFragRoot = document.querySelector("#category__template").content;
			let templateFrag = templateFragRoot.cloneNode(true);
			let newCard = templateFrag.querySelector(".category__content-item");
			let newTitle = templateFrag.querySelector("h1");
			let newIcon = templateFrag.querySelector("i");
			fillColor(responseData.type,responseData.color,responseData.direction,newCard);
			newTitle.innerText = responseData.name;
			newIcon.setAttribute("class","fa-solid fa-"+responseData.icon+" fa-sm");
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
			showColorPanel(responseData[0].category_type);
			if (responseData[0].category_type == 1 ) {
				categoryColor.value = responseData[0].color;
				colorBox1.style.color = responseData[0].color;
			}
			if(responseData[0].category_type == 2){
				let colorArr = responseData[0].color.split(',');
				color1 = colorArr[0];
				color2 = colorArr[1];
				categoryColor.value = color1;
				colorBox1.style.color = color1;
				categoryColor2.value = color2;
				colorBox2.style.color = color2;
			}
			if(responseData[0].category_type == 3){
				let colorArr = responseData[0].color.split(',');
				color1 = colorArr[0];
				color2 = colorArr[1];
				color3 = colorArr[2];
				categoryColor.value = color1;
				colorBox1.style.color = color1;
				categoryColor2.value = color2;
				colorBox2.style.color = color2;
				categoryColor3.value = color3;
				colorBox3.style.color = color3;
			}
			for(let categotyIcon of categoryIcons){
				if (categotyIcon.value == responseData[0].icon) {
					categotyIcon.setAttribute("checked","checked");
				} else{
					categotyIcon.removeAttribute("checked");
				}
			}
			for(let colorDirection of colorDirections){
				if (colorDirection.value == responseData[0].direction) {
					colorDirection.setAttribute("checked","checked");
				} else{
					colorDirection.removeAttribute("checked");
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
			let contentEdited = rowEdited.querySelector("span")
			let iconEdited = rowEdited.querySelector("i");
			contentEdited.innerText = responseData[0].category_name;
			fillColor(responseData[0].category_type,responseData[0].color,responseData[0].direction,contentEdited);
			iconEdited.setAttribute("class","fa-solid fa-"+responseData[0].icon+" fa-sm");
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
		headerPopup.setAttribute("class","header__popup");
		headerPopup.removeAttribute("style");
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
			let index = document.getElementById(responseData.cat_id).rowIndex;
			document.querySelector('tbody').deleteRow(index-1);
			popupMessage("success","delete","category");
		} else {
			popupMessage("failure","delete","category");
		}
	}
}
function showColorPanel(value) {
	directionFrame = document.querySelector('.direction-frame');
	colorFrame = document.querySelector('.color-frame');
	colorPanel = document.querySelector('.color-panel');
	switch(value){
		case "2":{
			colorBox2.style.opacity = "1";
			colorBox2.style.visibility = "visible";
			colorBox2.style.height = "auto";
			colorBox2.style.transition = "height 1.5s ease-out, visibility 1.5s ease-out,opacity 1.5s ease-out";
			colorBox3.style.opacity = "0";
			colorBox3.style.visibility = "hidden";
			colorBox3.style.height = "0";
			colorBox3.style.transition = "height .0s ease-out, visibility .0s ease-out,opacity .0s ease-out";
			directionFrame.style.opacity = 1;
			directionFrame.style.visibility = "visible";
			directionFrame.style.height = "auto";
			directionFrame.style.width = "100%";
			directionFrame.style.transition = "height 1.5s ease-out, visibility 1.5s ease-out,opacity 1.5s ease-out";
			colorFrame.style.width = "70%";
			colorPanel.style.gridTemplateColumns = "1fr 1fr";
			colorDirections[4].setAttribute("checked","checked");
			break
		}
		case "3":{
			colorBox2.style.opacity = 1;
			colorBox2.style.visibility = "visible";
			colorBox2.style.height = "auto";
			colorBox3.style.opacity = 1;
			colorBox3.style.visibility = "visible";
			colorBox3.style.height = "auto";
			colorBox3.style.transition = "height 1.5s ease-out, visibility 1.5s ease-out,opacity 1.5s ease-out";
			directionFrame.style.opacity = 1;
			directionFrame.style.visibility = "visible";
			directionFrame.style.height = "auto";
			directionFrame.style.width = "100%";
			directionFrame.style.transition = "height 1.5s ease-out, visibility 1.5s ease-out,opacity 1.5s ease-out";
			colorFrame.style.width = "100%";
			colorPanel.style.gridTemplateColumns = "1fr 1fr 1fr";
			colorDirections[4].setAttribute("checked","checked");
			break;
		}
		default:{
			colorBox2.style.opacity = 0;
			colorBox2.style.visibility = "hidden";
			colorBox2.style.height = 0;
			colorBox2.style.transition = "unset";
			colorBox3.style.opacity = 0;
			colorBox3.style.visibility = "hidden";
			colorBox3.style.height = 0;
			colorBox3.style.transition = "unset";
			directionFrame.style.opacity = 0;
			directionFrame.style.visibility = "hidden";
			directionFrame.style.height = 0;
			directionFrame.style.width = 0;
			directionFrame.style.transition = "height 0s ease-out, visibility 0s ease-out,opacity 0s ease-out";
			colorFrame.style.width = "60%";
			colorPanel.style.gridTemplateColumns = "1fr";
			colorDirections[4].removeAttribute("checked");
			// colorPanel.style.gridGap = "0";
		}
	}
}
if (currentPage == 'category') {
	categoryType.addEventListener('change',()=>{
		showColorPanel(categoryType.value);
	})
	categoryType.addEventListener('click',()=>{
		document.querySelector('.cat-type-arrow').classList.toggle("show-list");
	})
	categoryColor.addEventListener('change',()=>{
		colorBox1.style.color = categoryColor.value;
	})
	categoryColor2.addEventListener('change',()=>{
		colorBox2.style.color = categoryColor2.value;
	})
	categoryColor3.addEventListener('change',()=>{
		colorBox3.style.color = categoryColor3.value;
	})
	if (typeof(btnAdd)!=='undefined') {
		btnAdd.addEventListener('click',function(){
			showModal(dialog[0]);
			retitleDialog(titleDialog,"Add a new category",btnCreate,btnUpdate);
			retitleLabel('category');
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
			for (var i = 0; i < colorDirections.length; i++) {
				if (colorDirections[i].checked) {
					categoryData['direction'] = colorDirections[i].value;
				}
			}
			if (!categoryData.hasOwnProperty('icon')) {
				categoryData["icon"] = 'sack-dollar';
			}
			if (!categoryData.hasOwnProperty('direction')) {
				categoryData["direction"] = null;
			}
			if(Object.keys(categoryData).length != 5){
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			}else {
				let url = '../Ajax/AddANewCategory';
				let method = "POST";
				sendAjaxRequest(url,method,addCategory,JSON.stringify(categoryData));

				let initUrl = '../Ajax/TotalCategory';
				let initMethod = "GET";
				sendAjaxRequest(initUrl,initMethod,initializeView);
				categoryName.value = "";
				categoryType.value = 1;
				categoryColor.value = "#024fa0";
				categoryColor2.value = "#f2721e";
				categoryColor3.value = "#50b846";
				categoryIcons[0].setAttribute("checked","checked");
				showColorPanel(categoryType.value);
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
			for (var i = 0; i < colorDirections.length; i++) {
				if (colorDirections[i].checked) {
					categoryData["direction"] = colorDirections[i].value;
				}
			}
			if (!categoryData.hasOwnProperty('icon')) {
				categoryData["icon"] = 'sack-dollar';
			}
			if(Object.keys(categoryData).length != 6){
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
function showStatistical(data){
	if (typeof(data) == 'string') {
		responseData = JSON.parse(data);
		let new_tbody = document.createElement('tbody');
		let templateFragRoot = document.querySelector("#statistical__list").content;
		var status_noti;
		var operator;
		var id;
		var difference = new Number;
		var total_sales = 0;
		var total_cost = 0;
		for (var i = 0; i < responseData.length; i++) {
			total_sales += parseInt(responseData[i].receipt);
			total_cost += parseInt(responseData[i].expenditure);
			if (parseInt(responseData[i].receipt) < parseInt(responseData[i].expenditure)) {
				textColor = "#f8264a";
				operator = "- ";
				difference = parseInt(responseData[i].expenditure) - parseInt(responseData[i].receipt);
			} else {
				textColor = "#0dad95";
				operator = "+ ";
				difference = parseInt(responseData[i].receipt) - parseInt(responseData[i].expenditure);
			}
			let templateFrag = templateFragRoot.cloneNode(true);
			let templateColumn = templateFrag.querySelectorAll("td");
			let templateLink = templateFrag.querySelector("a");
			id = i + 1;
			templateColumn[0].innerText = id < 10 ? id = "0"+id+'.' : id +'.';
			templateLink.innerText = responseData[i].date;
			templateLink.href = 'Detail/'+ responseData[i].date;
			templateColumn[2].innerText = vndCurrency(responseData[i].receipt);
			templateColumn[3].innerText = vndCurrency(responseData[i].expenditure);
			templateColumn[4].innerText = operator + vndCurrency(difference);
			templateColumn[4].style.color = textColor;
			new_tbody.appendChild(templateFrag);
		}
		document.querySelector('tbody').parentNode.replaceChild(new_tbody,document.querySelector('tbody'));
		document.querySelector('.table__body-general-receipt').innerText = numberWithCommas(total_sales);
		document.querySelector('.table__body-general-expenditure').innerText = numberWithCommas(total_cost);
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
			let newRow = templateFrag.querySelector('tr');
			let newColumn = templateFrag.querySelectorAll('td');
			let newCard = templateFrag.querySelector('.cat__list');
			let newIcon = templateFrag.querySelector('i');
			var id = document.querySelectorAll('tr').length;
			var textColor = responseData.transType == 'receipt' ? "#0dad95" : "#f8264a";
			newRow.setAttribute('id',responseData.tranId)
			newColumn[0].innerText = id < 10 ? id = "0"+id+'.' : id +'.';
			newColumn[1].innerText = responseData.transType;
			newColumn[1].setAttribute("value",responseData.transType);
			newColumn[1].style.color = textColor;
			newColumn[2].innerText = responseData.transName;
			fillColor(responseData.transCategoryType,responseData.transColor,responseData.transDirection,newCard);
			newColumn[3].setAttribute("value",responseData.transCategory);
			newIcon.setAttribute('class',"fa-solid fa-"+responseData.transIcon+" fa-lg");
			newColumn[4].innerText = responseData.transDesc;
			newColumn[5].innerText = vndCurrency(responseData.transAmount);
			newColumn[5].setAttribute("value",responseData.transAmount);
			newColumn[5].style.color = textColor;
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
		 		document.querySelector(".input-box").innerText = arr[i].year;
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
			 	document.querySelector(".month-box").innerText = "Tháng "+arr[i].month;}
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
var realtimeClock = document.querySelector('.realtime_clock');
function showRealtimeClock(){
	var currentDate = new Date();
	var currentHours = currentDate.getHours() < 10 ? '0'+currentDate.getHours() : currentDate.getHours(); 
	var currentMinutes = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes() : currentDate.getMinutes();
	var currentSeconds = currentDate.getSeconds() < 10 ? '0'+currentDate.getSeconds() : currentDate.getSeconds();
	// realtimeClock.textContent = currentHours+":"+currentMinutes+":"+currentSeconds+" - "+currentDay+"/"+currentMonth+"/"+currentYear;
	realtimeClock.textContent = currentDate.toLocaleTimeString();
}
window.addEventListener("load",function(){
	setInterval(showRealtimeClock,1000);
	if (currentPage == 'transaction'){
		let catUrl = '../Ajax/ShowListCategories';
		let method = "GET";
		sendAjaxRequest(catUrl,method,data => loadModal_categoryList(data,dialogForm_Category));
		btnAdd.addEventListener("click",function(){
			showModal(dialog[0]);
			retitleLabel('transaction');	
			labelField_transDate.innerText = "";
			dialogForm_TransType.value = "null";
			dialogForm_Category.value = "null";
			dialogForm_TransDate.value = today;
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
			if (dialogForm_TransDate.getAttribute("type") == "date" && dialogForm_TransDate.value != '') {
				transData["transDate"] = dialogForm_TransDate.value;
			} else {
				labelField_transDate.innerText = "Date field can't be empty";
			}
			if (Object.keys(transData).length != 6) {
				labelField_Dialog.innerText = "Please complete all Field before submit Form !";
			} else {
				let method = "POST";
				let url = "../Ajax/AddANewTransaction";
				sendAjaxRequest(url,method,addTransaction_showStatistical,JSON.stringify(transData))
				hideModal(dialog[0]);
			}
		})
		let yearUrl = "../Ajax/GetYearStatistical";
		sendAjaxRequest(yearUrl,method,showSelectBox_yearList);
		let monthUrl = "../Ajax/GetMonthStatistical";
		sendAjaxRequest(monthUrl,method,showSelectBox_monthList);
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
	if (currentPage == 'detail'){
		let catUrl = '/ewallet/Ajax/ShowListCategories';
		let method = "GET";
		sendAjaxRequest(catUrl,method,data => loadModal_categoryList(data,dialogForm_Category));
		btnAdd.addEventListener("click",function(){
			showModal(dialog[0]);
			retitleDialog(titleDialog,"Add a new transaction",btnCreate,btnUpdate);
			retitleLabel('transaction');
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
		})
		on('table', 'click', '.remove__button', showModal_deleteTransaction);
		btnDelete.addEventListener('click',()=>{
			var transId = btnDelete.getAttribute("transId");
			var data = JSON.stringify({transactionId:transId});
			let method = "POST";
			let url = '/ewallet/Ajax/DeleteTransaction';
			sendAjaxRequest(url, method, deleteTransaction, data);	
			hideModal(dialog[1]);
		})

		var urlDate = urlArray.pop().toString().split('-');
		var urlYear = urlDate.pop();
		var urlMonth = urlDate.pop();
		var gotoBack = document.querySelector('.go-to-back');
		// gotoBack.addEventListener('click',(e)=>{
		// 	localStorage.setItem('previousYear',urlYear);
		// 	localStorage.setItem('previousMonth',urlMonth);
		// })
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
function showModal_editTransaction(){
	showModal(dialog[0]);
	retitleDialog(titleDialog,"Update Transaction",btnUpdate,btnCreate);
	retitleLabel('transaction');
	var target = event.target;
	var rowEdited;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			rowEdited = target;
		}
		target = target.parentNode;
	}
	let columnEdit = rowEdited.querySelectorAll("td");
	var data = {};
	data["id"] = rowEdited.getAttribute('id');
	data["transType"] = columnEdit[1].getAttribute('value');
	data["transName"] = columnEdit[2].innerText;
	data["transCat"] = columnEdit[3].getAttribute('value');
	data["transDesc"] = columnEdit[4].innerText;
	data["transAmount"] = columnEdit[5].getAttribute('value');
	dialogForm_TransType.value = data["transType"];
	dialogForm_Category.value = data["transCat"];
	dialogForm_TransName.value = data["transName"];
	dialogForm_Description.value = data["transDesc"];
	dialogForm_TransAmount.value = vndCurrency(data["transAmount"]);
	dialogForm_TransAmount.setAttribute('real_val',data["transAmount"]);
	btnUpdate.setAttribute('idT',data["id"]);
}
function updateTransaction(data) {
	let responseData = JSON.parse(data);
	if (responseData != "false") {
		textColor = responseData.transType == 'expenditure' ? '#f8264a' : '#0dad95';
		let category = JSON.parse(responseData.category);
		let transCategoryType = category[0].category_type;
		let transCategory = category[0].category_name;
		let transIcon = category[0].icon;
		let transDirection = category[0].direction;
		let transColor = category[0].color;
		let rowEdited = document.getElementById(btnUpdate.getAttribute("idT"));
		let columnEdited = rowEdited.querySelectorAll("td");
		let cardEdited = rowEdited.querySelector('.cat__list');
		let iconEdited = rowEdited.querySelector("i");
		columnEdited[1].style.color = textColor;
		columnEdited[1].setAttribute("value",responseData.transType);
		columnEdited[1].innerText = responseData.transType;
		columnEdited[2].innerText = responseData.transName;
		columnEdited[3].setAttribute("value",responseData.transCategory);
		fillColor(transCategoryType,transColor,transDirection,cardEdited);
		iconEdited.setAttribute("class","fa-solid fa-" + transIcon + " fa-lg");
		columnEdited[4].innerText = responseData.transDesc;
		columnEdited[5].innerText = vndCurrency(responseData.transAmount);
		columnEdited[5].setAttribute("value",responseData.transAmount);
		columnEdited[5].style.color = textColor;
		popupMessage("success","edit","transaction");
	} else {
		popupMessage("failure","edit","transaction");
	}
}
function showModal_deleteTransaction(){
	var target = event.target;
	var transactionId;
	while(target && target !== document.querySelector('tbody')){
		if(target.tagName == "TR"){
			transactionId = target.getAttribute("id");
		}
		target = target.parentNode;
		headerPopup.setAttribute("class","header__popup");
		headerPopup.removeAttribute("style");
		delFormContent.style.minHeight = "initial";
		delForm.style.gridTemplateColumns = "1fr";
		showModal(dialog[1]);
		btnDelete.setAttribute("transId",transactionId);
	}
}
function deleteTransaction(data){
	if (typeof(data)==="string") {
		let responseData = JSON.parse(data);
		if(responseData.status != "false"){
			let index = document.getElementById(responseData.transactionId).rowIndex;
			document.querySelector('tbody').deleteRow(index-1);
			popupMessage("success","delete","transaction");
		} else {
			popupMessage("failure","delete","transaction");
		}
	}
}
if (currentPage == 'dashboard'){
		const labels = [];
		const data = {
			labels:labels,
			datasets:[
			{
				label:' Receipt',
				borderColor:'#6259ca',
				data:[],
				tension:0.4,
			},
			{
				label:' Expenditure',
				borderColor:'#f99433',
				data:[],
				segment : {
					borderDash : [6,6]
				},
				tension:0.6,
			}
			],
		}
		const config = {
			type: 'line',
			data: data,
			responsive:true,
   			maintainAspectRatio: false,
			options: {
				plugins:{
					legend: {
						labels: {
							usePointStyle: true,
							boxWidth: 6,
							pointStyle:'circle'
						}
					}
				}
			}
		};
		
		const canvas = document.getElementById('myChart').getContext('2d');
		const chart = new Chart(canvas,config);

		function updateChart(data){
			responseData = JSON.parse(data);
			chart.data.labels = [];
			chart.data.datasets[0].data = [];
			chart.data.datasets[1].data = [];
			for (var i = 0; i < responseData.length; i++) {
				chart.data.labels.push(responseData[i].month);
				chart.data.datasets[0].data.push(responseData[i].receipt);
				chart.data.datasets[1].data.push(responseData[i].expenditure);
			}
			chart.update();
		}
		var dashUrl = "./Ajax/DrawChart";
		sendAjaxRequest(dashUrl,"GET",updateChart);
		
		let yearUrl = "./Ajax/GetYearStatistical";
		sendAjaxRequest(yearUrl,"GET",showSelectBox_yearList);
		var inputBox = document.querySelector(".input-box");
		inputBox.addEventListener("click",function(e){
			e.stopImmediatePropagation();
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
		document.addEventListener('click',function(){
			hiddenBox(inputBox);
			if (inputBox.classList.contains('show-list')) {
				inputBox.classList.remove('show-list')
			}
		})
		on(".option-year-list",'click','.year-list',selectYearDrawChart);
		function selectYearDrawChart(){
			var yearList = document.querySelectorAll(".year-list");
			yearList.forEach((year)=>{
				year.addEventListener("change",(e)=>{
					inputBox.innerText = year.nextElementSibling.innerText;
					let data = JSON.stringify({"y":year.nextElementSibling.innerText});
					let chartUrl = "./Ajax/DrawChart";
					sendAjaxRequest(chartUrl,"POST",updateChart,data);
				})
			})
		}
	
	let catUrl = './Ajax/ShowListCategories';
	let method = "GET";
	sendAjaxRequest(catUrl,method,data => loadModal_categoryList(data,dialogForm_Category));
	btnAdd.addEventListener("click",function(){
		showModal(dialog[0]);	
		retitleLabel('transaction');
		labelField_transDate.innerText = "";
		dialogForm_TransType.value = "null";
		dialogForm_Category.value = "null";
		dialogForm_TransDate.value = today;
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
		if (dialogForm_TransDate.getAttribute("type") == "date" && dialogForm_TransDate.value != '') {
			transData["transDate"] = dialogForm_TransDate.value;
		} else {
			labelField_transDate.innerText = "Date field can't be empty";
		}
		if (Object.keys(transData).length != 6) {
			labelField_Dialog.innerText = "Please complete all Field before submit Form !";
		} else {
			let method = "POST";
			let url = "./Ajax/AddANewTransaction";
			sendAjaxRequest(url,method,addTransaction_showDashboard,JSON.stringify(transData))
			hideModal(dialog[0]);
		}
	})
	var checkboxType = document.querySelector('#checkboxType');
	checkboxType.addEventListener('change',changeType_showMiniChart);
	const loader = document.querySelector('.loader');
	loader.classList.add('loader-hidden');
	checkboxType.addEventListener('click',()=>{
		loader.classList.remove('loader-hidden');
	})
	loader.addEventListener('transitionend',()=>{
		loader.classList.add('loader-hidden');
	})
}
function addTransaction_showDashboard(data){
	if (typeof(data) == 'string') {
		responseData = JSON.parse(data);
		if (responseData != "false" && responseData.status == 'success') {
			popupMessage("success","add","transaction");
			setTimeout(()=>{
				location.reload();
			},2500);
		} else {
			popupMessage("failure","add","transaction");
		}
	}
}
function changeType_showMiniChart(){
	if (document.querySelector('#checkboxType').checked) {
		var contentType = getComputedStyle(document.querySelector('.btn_toggle-slider'), ':before').getPropertyValue('content');
		if (contentType = 'sale') {
			data = JSON.stringify({type:'receipt'});
			var url = './Ajax/Show5LargestAmount';
			sendAjaxRequest(url,'POST',drawMiniChart,data);
		} 
	} else {
		data = JSON.stringify({type:'expenditure'});
		var url = './Ajax/Show5LargestAmount';
		sendAjaxRequest(url,'POST',drawMiniChart,data);
	}
}
function drawMiniChart(data){
	var responseData = JSON.parse(data);
	let templateFragRoot = document.querySelector('#chart-item').content;
	let newItemsList = document.createElement('div');
		newItemsList.setAttribute("class","layout__chart-items");
	var color=["#6259ca","#09ad95","#f7b731","#f82649","#45aaf2"];
	if (responseData.length!=0) {
		for (var i = 0; i < responseData.length; i++) {
			let templateFrag = templateFragRoot.cloneNode(true);
			templateFrag.querySelector('.layout__chart-name').innerText = responseData[i].tran_name;
			templateFrag.querySelector('.layout__chart-percent-index').innerText = (responseData[i].percent*100).toFixed(2)+'%';
			templateFrag.querySelector('.layout__chart-item-index').style.setProperty('--percent',responseData[i].percent*100+'%');
			templateFrag.querySelector('.layout__chart-item-index').style.setProperty('--chart__color',color[i]);
			newItemsList.appendChild(templateFrag);
		}
	} else{
		let para = document.createElement('p');
		para.innerText = 'Hi Admin, Have a good month ^_^ !';
		newItemsList.appendChild(para);
	}
	document.querySelector('.layout__chart-items').parentNode.replaceChild(newItemsList,document.querySelector('.layout__chart-items'));
}