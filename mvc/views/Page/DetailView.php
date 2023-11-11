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
			<button class="add__transaction-button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
		</div>
	</div>
	<div class="main__content">
		<!-- Code something -->
		<main class="layout-content">
			<section class="detail__table-header">
				<h2><a href='/ewallet/Wallet/Transaction'><i class="fa-solid fa-arrow-left-long fa-sm"></i> Back</a></h2>
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
										$data_list[$i]->tran_type == 'receipt'? $status_noti = "good":$status_noti = "expired";
										$id = $i + 1;
										$id < 10 ? $id = "0".$id : $id;
										echo '<tr class="table__detail-row">';
										echo '<td class="table__detail-column" data-cell="no">'.$id.'.</td>';
										echo '<td class="table__detail-column table__status table__status-'.$status_noti.'" data-cell="trans type">'.$data_list[$i]->tran_type.'</td>';
										echo '<td class="table__detail-column" data-cell="trans name">'.$data_list[$i]->tran_name.'</td>';
										echo '<td class="table__detail-column" data-cell="category">'.$data_list[$i]->cat.'</td>';
										echo '<td class="table__detail-column" data-cell="description">'.$data_list[$i]->tran_desc.'</td>';
										echo '<td class="table__detail-column table__status table__status-'.$status_noti.'" data-cell="amount">'.$data_list[$i]->tran_amount.'</td>';
										echo '<td class="table__detail-column" data-cell="Action">
												<div class="oil__table-action">
													<button class="oil__table-action-edit">
														<i class="fa-solid fa-pen fa-sm"></i>
													</button>
													<button class="oil__table-action-delete">
														<i class="fa-solid fa-trash fa-sm"></i>
													</button>
												</div>
											</td>';
										echo '</tr>';
									}
								}
							 ?>
						</tbody>
						<template>
							<tr  class="table__detail-row">
								<td class="table__detail-column" data-cell="no">01.</td>
								<td class="table__detail-column table__status table__status-good" data-cell="trans type">reject</td>
								<td class="table__detail-column" data-cell="trans name">salary of 10th frt</td>
								<td class="table__detail-column" data-cell="category">Salary</td>
								<td class="table__detail-column" data-cell="description">No comment</td>
								<td class="table__detail-column table__status table__status-good" data-cell="amount">1.000.000</td>
								<td class="table__detail-column" data-cell="Action">
									<div class="oil__table-action">
										<button class="oil__table-action-edit">
											<i class="fa-solid fa-pen fa-sm"></i>
										</button>
										<button class="oil__table-action-delete">
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
			<h2 class="dialog__content-header-label">Add a new transaction
				<span class="input_infor" id="transDialog_info"></span>
			</h2>
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
						<option value="expenditures">Expenses</option>
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
					<input class="dialog__form-input" name="amount" type="number" id="form__add-transaction-amount" min="1000" step="1000" placeholder="Amount">
				</div>				

				<div class="dialog__form-field">
					<label class="dialog__form-label" for="date">Date</label>
					<input class="dialog__form-input" name="date" type="date" id="form__add-transaction-date">
				</div>
			</form>
		</div>
		<div class="dialog__content-footer">
			<button class="add__transaction-button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
		</div>
	</div>
</div>