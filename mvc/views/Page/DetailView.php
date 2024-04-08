<div class="detail__container">
	<div class="detail__container-header">
		<div class="detail__container-header-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Transaction /</span>
			<span class="header__container-left-link">Detail</span>
		</div>
		<div class="detail__container-header-right">
			<button class="add__button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
		</div>
	</div>
	<div class="main__content">
		<!-- Code something -->
		<main class="layout-content">
			<section class="detail__table-header">
				<h2><a href='/ewallet/Wallet/Transaction' class="go-to-back"><i class="fa-solid fa-arrow-left-long fa-sm"></i> Back</a></h2>
			</section>
			<section class="detail__table-body">
				<div class="detail__table-body-content">
					<table class="table__detail">
						<thead align="center">
							<tr class="table__detail-header">
								<th class="table__detail-label">
									<h2 class="table__detail-abel-text">NO</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">TRANS TYPE</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">TRANS NAME</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">CATEGORY</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">DESCRIPTION</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">AMOUNT</h2>
								</th>
								<th class="table__detail-label">
									<h2 class="table__detail-label-text">ACTION</h2>
								</th>
							</tr>
						</thead>
						<tbody class="table__detail-body">
							<?php 
								$data_list = json_decode($data['DetailList']);
								if (empty($data_list)) {
									echo "<tr><td colspan='5'><center>No records</center></td></tr>";
								} else {
									for ($i=0; $i < count($data_list); $i++) {
										if($data_list[$i]->cat_type ==1){
											$color_style = "background:".$data_list[$i]->cat_color;
										} else if($data_list[$i]->cat_type ==2){
											$color_style = "background-image:linear-gradient(".$data_list[$i]->cat_direction.",".$data_list[$i]->cat_color.')';
										} else {
											$arr = explode(",",$data_list[$i]->cat_color);
											$color1 = $arr[0];
											$color2 = $arr[1];
											$color3 = $arr[2];
											$color_style = "background-image:linear-gradient(".$data_list[$i]->cat_direction.",".$color1." 0%,".$color1." 32%,".$color2." 33%,".$color2." 66%,".$color3." 67%,".$color3." 100%)";
										}
										$data_list[$i]->tran_type == 'receipt'? $textColor = "#0dad95":$textColor = "#f8264a";
										$id = $i + 1;
										$id < 10 ? $id = "0".$id : $id;
										echo '<tr class="table__detail-row" id="'.$data_list[$i]->tran_id.'">';
										echo '<td class="table__detail-column" data-cell="no">'.$id.'.</td>';
										echo '<td class="table__detail-column table__status" style="color:'.$textColor.'" data-cell="trans type" value='.$data_list[$i]->tran_type.'>'.$data_list[$i]->tran_type.'</td>';
										echo '<td class="table__detail-column" data-cell="trans name">'.$data_list[$i]->tran_name.'</td>';
										echo '<td class="table__detail-column" data-cell="category" value='.$data_list[$i]->cat_id.'><center>
										<div class="cat__list" style="'.$color_style.';"><i class="fa-solid fa-'.$data_list[$i]->cat_icon.' fa-lg"></i></center></div></td>';
										echo '<td class="table__detail-column" data-cell="description">'.$data_list[$i]->tran_desc.'</td>';
										echo '<td class="table__detail-column table__status" style="color:'.$textColor.'" data-cell="amount" value='.$data_list[$i]->tran_amount.'>'.number_format($data_list[$i]->tran_amount,0,'.',',').' &#8363'.'</td>';
										echo '<td class="table__detail-column" data-cell="Action">
												<div class="table__action">
													<button class="edit__button">
														<i class="fa-solid fa-pen fa-sm"></i>
													</button>
													<button class="remove__button">
														<i class="fa-solid fa-trash fa-sm"></i>
													</button>
												</div>
											</td>';
										echo '</tr>';
									}
								}
							 ?>
						</tbody>
						<template id="transaction-list">
							<tr class="table__detail-row">
								<td class="table__detail-column" data-cell="no">01.</td>
								<td class="table__detail-column table__status table__status-good" data-cell="trans type">reject</td>
								<td class="table__detail-column" data-cell="trans name">salary of 10th frt</td>
								<td class="table__detail-column" data-cell="category">
									<center><div class="cat__list" style="background:red;">
										<i class="fa-solid fa-sack-dollar fa-lg"></i>
									</div></center>
								</td>
								<td class="table__detail-column" data-cell="description">No comment</td>
								<td class="table__detail-column table__status" data-cell="amount">1.000.000</td>
								<td class="table__detail-column" data-cell="Action">
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
			</section>
		</main>
	</div>
</div>

<div class="dialog">
	<div class="dialog__content">
		<div class="dialog__content-header">
			<div class="dialog__content-header-label">
				<h2>Add a new transaction</h2>
				<span class="input_infor" id="transDialog_info"></span>
			</div>
			<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
		</div>
		<div class="dialog__content-body">
			<form action="#" class="dialog__form">
				<div class="dialog__form-field">
					<label class="dialog__form-label" for="type">Transaction Type
						<span class="input_infor" id="transtype_info"></span>
					</label>
					<select class="dialog__form-input" name="type" id="form__add-transaction-type">
						<option value=null selected="selected">-- Choose one --</option>
						<option value="receipt">Receipt</option>
						<option value="expenditure">Expenses</option>
					</select>
				</div>			
				<div class="dialog__form-field">
					<label class="dialog__form-label" for="category">Category
						<span class="input_infor" id="category_info"></span>
					</label>
					<select class="dialog__form-input" name="category" id="form__add-transaction-category">
						<option value=null selected="selected">-- Choose one --</option>
						<template id="category-list">
							<option value="{{value}}">{{name}}</option>
						</template>
					</select>
				</div>						
				<div class="dialog__form-field">
					<label class="dialog__form-label" for="name">Transaction Name
						<span class="input_infor" id="transname_info"></span>
					</label>
					<input class="dialog__form-input" type="text" name="name" id="form__add-transaction-name" placeholder="Name">
				</div>			
				<div class="dialog__form-field">
					<label class="dialog__form-label" for="description">Description
						<span class="input_infor" id="transdesc_info"></span>
					</label>
					<input class="dialog__form-input" name="description" type="text" id="form__add-transaction-desc" placeholder="Description">
				</div>				
				<div class="dialog__form-field">
					<label class="dialog__form-label" for="amount">Amount
						<span class="input_infor" id="transamount_info"></span>
					</label>
					<input class="dialog__form-input" name="amount" type="text" id="form__add-transaction-amount" data-type="currency" placeholder="Amount">
				</div>		
			</form>
		</div>
		<div class="dialog__content-footer">
			<button type="button" class="create__button" name="addTrBtn">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
			<button type="button" class="update__button" name="editTrBtn">
				<i class="fa-solid fa-pen fa-sm"></i> Update Transaction
			</button>
		</div>
	</div>
</div>

<div class="dialog">
	<form id="DeleteTransaction" action="" method="POST">
		<div class="dialog__content dialog__content-del">
			<div class="dialog__content-header">
				<h2 class="dialog__content-header-label">Delete transaction</h2>
				<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
			</div>
			<div class="dialog__content-body">
				<div class="dialog__form">
					<div class="dialog__form-field">
						<span>Are you sure delete record of this transaction ?</span>
					</div>					
				</div>
			</div>
			<div class="dialog__content-footer">
				<button type="button" class="delete__button" name="delTrBtn">
					<i class="fa-solid fa-trash fa-sm"></i> Delete
				</button>
				<button type="button" class="cancel__button" name="cancleActBtn">
					<i class="fa-solid fa-ban fa-sm"></i> Cancel
				</button>
			</div>
		</div>
	</form>
</div>