<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Transaction</span>
		</div>
		<div class="header__container-right">
			<button class="add__transaction-button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
		</div>
	</div>
	<div class="main__content">
		<!-- Code something -->
		<main class="layout-content">
			<section class="layout_content table__header">
				<h2>Wallet</h2>
			</section>
			<section class="layout_content table__body">
				<div class="table__body-header">
					<div class="table__body-header-show">
						<span>Show</span>
						<select name="table_record" id="table_record">
							<option value="week">Week</option>
							<option value="month" selected>Month</option>
							<option value="quarter">Quarter.</option>
						</select>
					</div>
					<div class="table__body-header-search">
						<input type="text" placeholder="Search...">
					</div>
				</div>
				<div class="table__body-content">
					<table class="statistical">
						<thead align="center">
							<tr>
								<th class="table__label">
									<h2 class="table__label-text">NO</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">DATE</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">RECEIPTS</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">EXPENDITURES</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">DIFFERENCE</h2>
								</th>
							</tr>
						</thead>
						<tbody>
							<?php 
								$data_list = json_decode($data["TransactionList"]);
								for ($i=0; $i < count($data_list); $i++) { 
									$status_noti = "good";
									$operator = "+";
									$difference = $data_list[$i]->receipt - $data_list[$i]->expenditures;
									if ($data_list[$i]->receipt < $data_list[$i]->expenditures) {
										$status_noti = "expired";
										$operator = "-";
										$difference = $data_list[$i]->expenditures - $data_list[$i]->receipt;
									}
									$id = $i + 1;
									$id < 10 ? $id = "0".$id : $id;
									echo "<tr>";
									echo '<td data-cell="no">'.$id.'.</td>';
									echo '<td data-cell="date"><a href="Detail/'.$data_list[$i]->date.'">'.$data_list[$i]->date.'</a></td>';
									echo '<td data-cell="Receipts">'.$data_list[$i]->receipt.'</td>';
									echo '<td data-cell="Expenditure">'.$data_list[$i]->expenditures.'</td>';
									echo '<td data-cell="Difference" class="table__status table__status-'.$status_noti.'">'.$operator.$difference.'</td>';
									echo '</tr>';
								}
							 ?>
							<template id="statistical__list">
							 	<tr>
							 		<td data-cell="no">01.</td>
							 		<td data-cell="date"><a href="Detail/">14.05.2023</a></td>
							 		<td data-cell="Receipts">100.000</td>
							 		<td data-cell="Expenditurese">200.000</td>
							 		<td data-cell="Difference" class="table__status table__status-expired">-100.000</td>
							 	</tr>
							</template>
						</tbody>
					</table>
				</div>
				<div class="table__body-footer">
					<div class="table__body-footer-list">
						<button>Previous</button>
						<button>1</button>
						<button>Next</button>
					</div>
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