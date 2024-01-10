<?php 
$data_list = json_decode($data["TransactionList"]);
//$transaction_list = json_decode($data["TransactionList"]);
if (empty($data_list)) {
	$new_record = "<tr><td colspan='5'><center>No records</center></td></tr>";
} else {
	$new_record = "";
	$total_sales = 0;
	$total_cost = 0;
	for ($i=0; $i < count($data_list); $i++) { 
		$status_noti = "good";
		$operator = "+ ";
		$difference = $data_list[$i]->receipt - $data_list[$i]->expenditure;
		if ($data_list[$i]->receipt < $data_list[$i]->expenditure) {
			$status_noti = "expired";
			$operator = "- ";
			$difference = $data_list[$i]->expenditure - $data_list[$i]->receipt;
		}
		$total_sales = $total_sales + $data_list[$i]->receipt;
		$total_cost = $total_cost + $data_list[$i]->expenditure;
		$id = $i + 1;
		$id < 10 ? $id = "0".$id : $id;
		$new_record .= "<tr>";
		$new_record .= '<td data-cell="no">'.$id.'.</td>';
		$new_record .= '<td data-cell="date"><a href="Detail/'.$data_list[$i]->date.'">'.$data_list[$i]->date.'</a></td>';
		//number_format( $output , 0 , '.' , ',' )
		$new_record .= '<td data-cell="Receipts">'.number_format($data_list[$i]->receipt,0,'.',',').' &#8363'.'</td>';
		$new_record .= '<td data-cell="Expenditure">'.number_format($data_list[$i]->expenditure,0,'.',',').' &#8363'.'</td>';
		$new_record .= '<td data-cell="Difference" class="table__status table__status-'.$status_noti.'">'.$operator.number_format($difference,0,'.',',').' &#8363'.'</td>';
		$new_record .= '</tr>';
	}
}	
?>
<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Transaction</span>
		</div>
		<div class="header__container-right">
			<button class="add__button">
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
					<div class="table__body-dropdown time-list">
						<div class="table__body-dropdown">
							<div class="table__body-dropdown input-box year-box"></div>
							<div class="table__body-dropdown option-list option-year-list">
								<!-- List of Year -->
							</div>	
							<template id="list-of-year">
								<input class="year-list" type="radio" name="year" id="y3">
								<label for="y3">2023</label>
							</template>
						</div>
						<div class="table__body-dropdown">
							<div class="table__body-dropdown input-box month-box"></div>
							<div class="table__body-dropdown option-list option-month-list">
								<div class="default-list">
									<!-- List of Month -->	
								</div>
							</div>
							<template id="list-of-month">
								<input class="month-list" type="radio" name="month" id="m3">
								<label for="m3">Tháng 4</label>
							</template>
						</div>
					</div>
					<div class="table__body-general">
						<span class="table__body-general-receipt"><?php echo number_format($total_sales,0,'.',',').' &#8363';?></span>
						<span class="table__body-general-expenditure"><?php echo number_format($total_cost,0,'.',',').' &#8363'; ?></span>
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
								echo $new_record;
								// $data_list = json_decode($data["TransactionList"]);
								// //$transaction_list = json_decode($data["TransactionList"]);
								// if (empty($data_list)) {
								// 	echo "<tr><td colspan='5'><center>No records</center></td></tr>";
								// } else {
								// 	// if (isset($transaction_list->action)) {
								// 	// 	unset($transaction_list->action);
								// 	// }
								// 	// $data_list = (array) $transaction_list;
								// 	for ($i=0; $i < count($data_list); $i++) { 
								// 		$status_noti = "good";
								// 		$operator = "+ ";
								// 		$difference = $data_list[$i]->receipt - $data_list[$i]->expenditure;
								// 		if ($data_list[$i]->receipt < $data_list[$i]->expenditure) {
								// 			$status_noti = "expired";
								// 			$operator = "- ";
								// 			$difference = $data_list[$i]->expenditure - $data_list[$i]->receipt;
								// 		}
								// 		$id = $i + 1;
								// 		$id < 10 ? $id = "0".$id : $id;
								// 		echo "<tr>";
								// 		echo '<td data-cell="no">'.$id.'.</td>';
								// 		echo '<td data-cell="date"><a href="Detail/'.$data_list[$i]->date.'">'.$data_list[$i]->date.'</a></td>';
								// 		//number_format( $output , 0 , '.' , ',' )
								// 		echo '<td data-cell="Receipts">'.number_format($data_list[$i]->receipt,0,'.',',').' &#8363'.'</td>';
								// 		echo '<td data-cell="Expenditure">'.number_format($data_list[$i]->expenditure,0,'.',',').' &#8363'.'</td>';
								// 		echo '<td data-cell="Difference" class="table__status table__status-'.$status_noti.'">'.$operator.number_format($difference,0,'.',',').' &#8363'.'</td>';
								// 		echo '</tr>';
								// 	}
								// }	
							 ?>
						</tbody>
						<template id="statistical__list">
							<tr>
								<td data-cell="no">{{no}}</td>
								<td data-cell="date"><a href="Detail/">{{date}}</a></td>
								<td data-cell="Receipts">{{receipt}}</td>
								<td data-cell="Expenditurese">{{expenditure}}</td>
								<td data-cell="Difference" class="table__status table__status-expired">{{difference}}</td>
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

				<div class="dialog__form-field">
					<label class="dialog__form-label" for="date">Date
						<span class="input_infor" id="transdate_info"></span>
					</label>
					<input class="dialog__form-input" name="date" type="date" id="form__add-transaction-date">
				</div>
			</form>
		</div>
		<div class="dialog__content-footer">
			<button class="create__button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
		</div>
	</div>
</div>