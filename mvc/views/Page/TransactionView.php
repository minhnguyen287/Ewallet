<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span> 
			<span class="header__container-left-link">Transaction</span>
		</div>
		<div class="header__container-right">>
			<button class="export-button">
				<i class="fa-solid fa-file-export"></i> Export
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
					<table>
						<thead class="table__transaction-label" align="center">
							<tr>
								<th class="table__label">
									<h2 class="table__label-text">DATE</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">RECEIPTS</h2>
								</th>
								<th class="table__label">
									<h2 class="table__label-text">EXPENDITURES</h2>
								</th>
							</tr>
						</thead>
						<tbody class="table__transaction">
							<tr class="table__transaction-row">
								<td class="table__transaction-column" data-cell="date">14.05.2023</td>
								<td data-cell="Receipts" class=" table__transaction-column oil__table-status oil__table-status-good">100.000</td>
								<td data-cell="Expenditurese" class="table__transaction-column oil__table-status oil__table-status-expired">200.000</td>
							</tr>
							<tr class="table__transaction-row">
								<td class="table__transaction-column" data-cell="date">14.05.2023</td>
								<td data-cell="Receipts" class=" table__transaction-column oil__table-status oil__table-status-good">100.000</td>
								<td data-cell="Expenditurese" class="table__transaction-column oil__table-status oil__table-status-expired">200.000</td>
							</tr>
							<tr class="table__transaction-row">
								<td class="table__transaction-column" data-cell="date">14.05.2023</td>
								<td data-cell="Receipts" class=" table__transaction-column oil__table-status oil__table-status-good">100.000</td>
								<td data-cell="Expenditurese" class="table__transaction-column oil__table-status oil__table-status-expired">200.000</td>
							</tr>
							<tr class="table__transaction-row">
								<td class="table__transaction-column" data-cell="date">14.05.2023</td>
								<td data-cell="Receipts" class=" table__transaction-column oil__table-status oil__table-status-good">100.000</td>
								<td data-cell="Expenditurese" class="table__transaction-column oil__table-status oil__table-status-expired">200.000</td>
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
			<template>
				<tr class="table__transaction-row">
					<td class="table__transaction-column" data-cell="date">14.05.2023</td>
					<td data-cell="Receipts" class=" table__transaction-column oil__table-status oil__table-status-good">100.000</td>
					<td data-cell="Expenditurese" class="table__transaction-column oil__table-status oil__table-status-expired">200.000</td>
				</tr>
			</template>
		</main>
	</div>
</div>

	