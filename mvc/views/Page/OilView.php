<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">Statistical 01</h2>
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Oil Change History</span>
		</div>
		<div class="header__container-right">
			<button class="btn btn-add">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
			<button class="btn btn-export">
				<i class="fa-solid fa-file-export"></i> Export
			</button>
		</div>
	</div>
	<div class="main__content">
		<!-- Code something -->
		<main class="layout-content">
			<section class="layout_content table__header">
				<h2>Records of History oil changed</h2>
			</section>
			<section class="layout_content table__body">
				<div class="table__body-header">
					<div class="table__body-header-show">
						<span>Show</span>
						<select name="table_record" id="table_record">
							<option value="5">5</option>
							<option value="10" selected>10</option>
							<option value="20">20</option>
						</select>
						<span> entries</span>
					</div>
					<div class="table__body-header-search">
						<input type="text" placeholder="Search...">
					</div>
				</div>
				<div class="table__body-content">
					<table>
						<thead>
							<tr>
								<td class="table__label">
									<h2 class="table__label-text">NO</h2>
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
									</div>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">PRODUCT NAME</h2>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">CHANGE DATE</h2>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">DAYS</h2>
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
									</div>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">TOTAL KM</h2>
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
									</div>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">AMOUNT</h2>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">STATUS</h2>
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up fa-sm"></i>
										<i class="fa-solid fa-arrow-down fa-sm"></i>
									</div>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">ACTION</h2>
								</td>
							</tr>
						</thead>
						<tbody>
							<?php 
								$row = json_decode($data["DataRow"]);
								for ($i=0; $i < count($row) ; $i++) { 
									if ($row[$i]->total_km >= 2000) {
										$status = "expired";
										$textColor = "#f8264a";
									} elseif ($row[$i]->total_km <= 1500) {
										$status = "good";
										$textColor = "#0dad95";
									} else{
										$status = "warning";
										$textColor = "#313db6";
									}
									$id = $i+1;
									$id < 10 ? $id = "0".$id : $id;
									echo'<tr class = "rowContent" id ="'.$row[$i]->och_id.'">';
									echo'<td data-cell="no">'.$id.'.</td>';
									echo'<td data-cell="product name">'.$row[$i]->product_name.'</td>';
									echo'<td data-cell="change date">'.$row[$i]->end_day.'</td>';
									echo'<td data-cell="days">'.$row[$i]->total_days.'</td>';
									echo'<td data-cell="total km">'.number_format($row[$i]->total_km,0,'.',',').'</td>';
									echo'<td data-cell="amount">'.number_format($row[$i]->product_price,0,'.',',').' &#8363'.'</td>';
									echo'<td data-cell="status" class="table__status" style="color:'.$textColor.'">'.$status.'</td>';
									echo '<td data-cell="Action">
										<div class="table__action">
										<button class="btn-edit">
										<i class="fa-solid fa-pen fa-sm"></i>
										</button>
										<button class="btn-remove">
										<i class="fa-solid fa-trash fa-sm"></i>
										</button>
										</div>
										</td>';
									echo'</tr>';
								}
							?>						
						</tbody>
						<template id="newRow">
								<tr class="rowContent">
									<td data-cell="no">01.</td>
									<td data-cell="product name">MOTUL SILVER</td>
									<td data-cell="change date">15.05.2023</td>
									<td data-cell="days">45</td>
									<td data-cell="total km">1,000</td>
									<td data-cell="amount">80,000</td>
									<td data-cell="status" class="table__status">Good</td>
									<td data-cell="Action">
										<div class="table__action">
											<button class="edit__button">
												<i class="fa-solid fa-pen fa-sm"></i>
											</button>
											<button class="remove__button">
												<i class="fa-solid fa-trash fa-sm"></i>
											</button>
										</div>
									</td>
								</tr>
							</template>
					</table>
				</div>
				<div class="table__body-footer">
					<div class="table__body-footer-show">
						<span id="count__record">Showing {{start}} to {{display}} of {{totals}} entries</span>
					</div>
					<div class="table__body-footer-list">
						<button id = "previous_page">Previous</button>
						<button id = "current_page">1</button>
						<button id = "next_page">Next</button>
					</div>
				</div>
			</section>
		</main>
	</div>
	<div class="dialog" id="dialog-1">
		<form id="form-add-record" action="" method="POST">
			<div class="dialog-content">
				<div class="dialog-content-header">
					<div class="dialog-content-header-label">
						<h2>Add a new transaction</h2>
						<span class="input_infor" id="transDialog_info"></span>
					</div>					
					<a href="#" class="btn-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
				</div>
				<div class="dialog-content-body">
					<div class="form-content">
						<div class="form-group">
							<label class="form-group-label" for="form__start-day">Start Day
								<span class="input_infor" id="start_day_info"></span>
							</label>
							<input class="form-group-input" type="date" name="startday" id="form__start-day" placeholder="Start day">
						</div>				
						<div class="form-group">
							<label class="form-group-label" for="form__end-day">End Day
								<span class="input_infor" id="end_day_info"></span>
							</label>
							<input class="form-group-input" type="date" name="endday" id="form__end-day" placeholder="End day">
						</div>				
						<div class="form-group">
							<label class="form-group-label" for="form__start-kilometer">Start Kilometer
								<span class="input_infor" id="start_km_info"></span>
							</label>
							<input class="form-group-input" name="startkilometer" type="number" step="1" id="form__start-kilometer" placeholder="Start kilometer">
						</div>				
						<div class="form-group">
							<label class="form-group-label" for="form__end-kilometer">End Kilometer
								<span class="input_infor" id="end_km_info"></span>
							</label>
							<input class="form-group-input" name="endkilometer" type="number" step="1" id="form__end-kilometer" placeholder="End kilometer">
						</div>				
						<div class="form-group">
							<label class="form-group-label" for="form__product">Oil Product
								<span class="input_infor" id="product_info"></span>
							</label>
							<select class="form-group-input" name="product" id="form__product">
								<option value="null" selected="selected">-- Choose one --</option>
								<template id="product-option">
									<option value="{{value}}">{{name}}</option>
								</template>
							</select>
						</div>
					</div>
				</div>
				<div class="dialog-content-footer">
					<button type="button" class="btn btn-create" name="addOchBtn">
						<i class="fa-solid fa-plus"></i> Add Transaction
					</button>
					<button type="button" class="btn btn-update" name="editOchBtn">
						<i class="fa-solid fa-pen fa-sm"></i> Update Transaction
					</button>
				</div>
			</div>
		</form>
	</div>	

	<div class="dialog" id="dialog-2">
		<form id="DeleteTransaction" action="" method="POST">
			<div class="dialog-content" style="min-height: initial;min-width: initial;">
				<div class="dialog-content-header">
					<h2 class="dialog-content-header-label">Delete transaction</h2>
					<a href="#" class="btn-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
				</div>
				<div class="dialog-content-body">
					<div class="dialog__form">
						<div class="dialog__form-field">
							<span>Are you sure delete record of this transaction ?</span>
						</div>				
						
					</div>
				</div>
				<div class="dialog-content-footer">
					<button type="button" class="btn btn-delete" name="delOchBtn">
						<i class="fa-solid fa-trash fa-sm"></i> Delete
					</button>
					<button type="button" class="btn btn-cancel" name="cancleActBtn">
						<i class="fa-solid fa-ban fa-sm"></i> Cancel
					</button>
				</div>
			</div>
		</form>
	</div>	