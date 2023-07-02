<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">Statistical 01</h2>
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Oil Change History</span>
		</div>
		<div class="header__container-right">
			<button class="add__account-button">
				<i class="fa-solid fa-plus"></i> Add Transaction
			</button>
			<button class="export-button">
				<i class="fa-solid fa-file-export"></i> Export
			</button>
		</div>
	</div>
	<div class="main__content">
		<!-- Code something -->
		<main class="layout-content">
			<section class="layout_content table__header">
				<h2>Product Sales</h2>
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
						<span>entries</span>
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
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
									</div>
								</td>
								<td class="table__label">
									<h2 class="table__label-text">CHANGE DATE</h2>
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
									</div>
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
									<div class="table__label-icon">
										<i class="fa-solid fa-arrow-up-long"></i>
										<i class="fa-solid fa-arrow-down-long"></i>
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
										<div class="table__label-icon">
											<i class="fa-solid fa-arrow-up fa-sm"></i>
											<i class="fa-solid fa-arrow-down fa-sm"></i>
										</div>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<?php 
										$Statistical1 = json_decode($data["DataRow"])[0];
										$id = $Statistical1->och_id;
										$product_id = $Statistical1->product_id;
										$start_day = $Statistical1->start_day;
										$end_day = $Statistical1->end_day;
										$day = floor( abs( strtotime($end_day) - strtotime($start_day) ) / (24*60*60));
										$start_km = $Statistical1->start_km;
										$end_km = $Statistical1->end_km;
										$price = $Statistical1->price;
										$status = "good";
										if( ($end_km-$start_km) >= 1200 ){
											$status = "expired";
										}
									 ?>
									<td data-cell="no"><?php echo "0".$id."." ?></td>
									<td data-cell="product name"><?php echo $product_id ?></td>
									<td data-cell="change date"><?php echo $end_day ?></td>
									<td data-cell="days"><?php echo $day ?></td>
									<td data-cell="total km"><?php echo $end_km - $start_km ?></td>
									<td data-cell="amount"><?php echo $price ?></td>
									<td data-cell="status" <?php echo "class='oil__table-status oil__table-status-".$status."'>".$status;?></td>
									<td data-cell="Action">
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
								<tr>
									<td data-cell="no">01.</td>
									<td data-cell="product name">MOTUL SILVER</td>
									<td data-cell="change date">15.05.2023</td>
									<td data-cell="days">45</td>
									<td data-cell="total km">1000</td>
									<td data-cell="amount">80.000</td>
									<td data-cell="status" class="oil__table-status oil__table-status-good">Good</td>
									<td data-cell="Action">
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
								<tr>
									<td data-cell="no">01.</td>
									<td data-cell="product name">MOTUL SILVER</td>
									<td data-cell="change date">15.05.2023</td>
									<td data-cell="days">45</td>
									<td data-cell="total km">1000</td>
									<td data-cell="amount">80.000</td>
									<td data-cell="status" class="oil__table-status oil__table-status-good">Good</td>
									<td data-cell="Action">
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
								<tr>
									<td data-cell="no">01.</td>
									<td data-cell="product name">MOTUL SILVER</td>
									<td data-cell="change date">15.05.2023</td>
									<td data-cell="days">45</td>
									<td data-cell="total km">1000</td>
									<td data-cell="amount">80.000</td>
									<td data-cell="status" class="oil__table-status oil__table-status-good">Good</td>
									<td data-cell="Action">
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
								<tr>
									<td data-cell="no">01.</td>
									<td data-cell="product name">MOTUL SILVER</td>
									<td data-cell="change date">15.05.2023</td>
									<td data-cell="days">45</td>
									<td data-cell="total km">1000</td>
									<td data-cell="amount">80.000</td>
									<td data-cell="status" class="oil__table-status oil__table-status-good">Good</td>
									<td data-cell="Action">
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
							</tbody>
						</table>
					</div>
					<div class="table__body-footer">
						<div class="table__body-footer-show">
							<span>Showing 1 to 5 of 5 entries</span>
						</div>
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
		<form action="./Oil/AddNewTransaction" method="POST">
			<div class="dialog__content">
				<div class="dialog__content-header">
					<h2 class="dialog__content-header-label">Add a new transaction</h2>
					<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
				</div>
				<div class="dialog__content-body">
					<div class="dialog__form">
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-start_day">Start Day</label>
							<input class="dialog__form-input" type="date" name="startday" id="form__add-start_day" placeholder="Start day">
						</div>				
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-end_day">End Day</label>
							<input class="dialog__form-input" type="date" name="endday" id="form__add-end_day" placeholder="End day">
						</div>				
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-start_kilometer">Start Kilometer</label>
							<input class="dialog__form-input" name="startkilometer" type="text" id="form__add-start_kilometer" placeholder="Start kilometer">
						</div>				
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-end_kilometer">End Kilometer</label>
							<input class="dialog__form-input" name="endkilometer" type="text" id="form__add-end_kilometer" placeholder="End kilometer">
						</div>				
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-oil_product-name">Oil Product</label>
							<select class="dialog__form-input" name="product" id="form__add-oil_product-name">
								<option value="#" selected="selected">-- Choose one --</option>
								<option value="1">Motul Silver</option>
								<option value="2">Idemitsu</option>
							</select>
						</div>
						<div class="dialog__form-field">
							<label class="dialog__form-label" for="form__add-price">Price</label>
							<input class="dialog__form-input" name="price" type="number" id="form__add-price" min="70000" step="1000" placeholder="Price">
						</div>
					</div>
				</div>
				<div class="dialog__content-footer">
					<button class="add__transaction-button" name="addTrBtn">
						<i class="fa-solid fa-plus"></i> Add Transaction
					</button>
				</div>
			</div>
		</form>
	</div>	