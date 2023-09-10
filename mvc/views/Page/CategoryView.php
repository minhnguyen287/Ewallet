<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span>
			<span class="header__container-left-link">Category</span>
		</div>
		<div class="header__container-right">
			<button class="add__account-button">
				<i class="fa-solid fa-plus"></i> Add Category
			</button>
			<button class="export-button">
				<i class="fa-solid fa-file-export"></i> Export
			</button>
		</div>
	</div>
	<div class="main__content">
		<div class="category__content">
			<!-- <div class="category__content-item" style="background: {{color}}">
				<div class="category__content-item-left">
					<div class="category__content-item-left-header"><h1>{{type}}</h1></div>
					<div class="category__content-item-left-desc">{{name}}</div>
				</div>
				<div class="category__content-item-right">
					<div class="category__content-item-right-icon">
						<i class="{{icon}}"></i>
					</div>
					<div class="category__content-item-right-icon"></div>
					<div class="category__content-item-right-icon"></div>
				</div>
			</div> -->	
		</div>
		<template id="category__template">
			<div class="category__content-item">
				<div class="category__content-item-left">
					<div class="category__content-item-left-header"><h1>Salary</h1></div>
					<div class="category__content-item-left-desc">Salary of FRT</div>
				</div>
				<div class="category__content-item-right">
					<div class="category__content-item-right-icon">
						<i class="fa-solid fa-sack-dollar fa-sm"></i>
					</div>
					<div class="category__content-item-right-icon"></div>
					<div class="category__content-item-right-icon"></div>
				</div>
			</div>
		</template>
	</div>

	<div class="dialog">
		<div class="dialog__content">
			<div class="dialog__content-header">
				<h2 class="dialog__content-header-label">Add a new category</h2>
				<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
			</div>
			<div class="dialog__content-body">
				<form action="#" class="dialog__form-category">
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catname">Type of Category</label>
						<input class="dialog__form-category-field-input" type="text" name="cattype" id="form__add-cat_type" placeholder="Type of Category">
					</div>					
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catdesc">Category Name</label>
						<input class="dialog__form-category-field-input" type="text" name="catname" id="form__add-cat_name" placeholder="Category Name">
					</div>					
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catcolor">Color of Category</label>
						<input class="dialog__form-category-field-input" name="catcolor" type="color" id="form__add-cat_color" value="#45aaf2" >
					</div>		
					<div class="dialog__form-category-field">
						<table class="dialog__form-category-field-table">
							<tr name="caticon" id="form__add-cat_icon">
								<td colspan="2" style="font-size: 0.8rem;text-align: center;font-weight: bold;">
									<label class="dialog__form-category-field-label" for="caticon">Category Icon</label>
								</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-file-invoice-dollar fa-sm">&#xf571;</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
							</tr>
							<tr name="caticon" id="form__add-cat_icon">
								<td value="fa-solid fa-file-invoice-dollar fa-sm">&#xf571;</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-file-invoice-dollar fa-sm">&#xf571;</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
							</tr>
							<tr name="caticon" id="form__add-cat_icon">
								<td value="fa-solid fa-file-invoice-dollar fa-sm">&#xf571;</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-file-invoice-dollar fa-sm">&#xf571;</td>
								<td value="fa-solid fa-utensils fa-sm">&#xf2e7;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
								<td value="fa-solid fa-sack-dollar fa-sm">&#xf81d;</td>
								<td value="fa-solid fa-piggy-bank fa-sm">&#xf4d3;</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
			<div class="dialog__content-footer">
				<button class="add__transaction-button">
					<i class="fa-solid fa-plus"></i> Add Category
				</button>
			</div>
		</div>
	</div>
	<div class="dialog">
		<form id="DeleteTransaction" action="" method="POST">
			<div class="dialog__content">
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
					<button type="button" class="delete__transaction-button" name="delTrBtn">
						<i class="fa-solid fa-trash fa-sm"></i> Delete
					</button>
					<button type="button" class="cancelAction__transaction-button" name="cancleActBtn">
						<i class="fa-solid fa-file-export fa-sm"></i> Cancel
					</button>
				</div>
			</div>
		</form>
	</div>