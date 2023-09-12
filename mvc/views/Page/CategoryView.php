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
						<div class="dialog__form-category-field-icon">
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon1" type="radio" value="utensils">
							<label class="dialog__form-category-field-icon-label" for="icon1">
								<i class="fa-solid fa-utensils fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon2" type="radio" value="sack-dollar">
							<label class="dialog__form-category-field-icon-label" for="icon2">
								<i class="fa-solid fa-sack-dollar fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon3" type="radio" value="piggy-bank">
							<label class="dialog__form-category-field-icon-label" for="icon3">
								<i class="fa-solid fa-piggy-bank fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="flie-invoice-dollar">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-file-invoice-dollar fa-sm"></i>
							</label>
						</div>	
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon5" type="radio" value="mug-hot">
							<label class="dialog__form-category-field-icon-label" for="icon5">
								<i class="fa-solid fa-mug-hot fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="cart-shopping">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-cart-shopping fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="gas-pump">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-gas-pump fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="house">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-house fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="briefcase-medical">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-briefcase-medical fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="gift">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-gift fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="motorcycle">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-motorcycle fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="mobile-screen">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-mobile-screen fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="screwdriver-wrench">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-screwdriver-wrench fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="money-bill-transfer">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-money-bill-transfer fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="gamepad">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-gamepad fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="heart">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-heart fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="earth-asia">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-earth-asia fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="lightbulb">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-lightbulb fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="graduation-cap">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-graduation-cap fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="skull">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-skull fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="handshake">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-handshake fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="droplet">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-droplet fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="money-bill-trend-up">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-money-bill-trend-up fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="hand-holding-dollar">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-hand-holding-dollar fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="person-walking-luggage">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-person-walking-luggage fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="dumbbell">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-dumbbell fa-sm"></i>
							</label>
						</div>
						<div class="dialog__form-category-field-icon">	
							<input class="dialog__form-category-field-icon-input" name="icon" id="icon4" type="radio" value="tv">
							<label class="dialog__form-category-field-icon-label" for="icon4">
								<i class="fa-solid fa-tv fa-sm"></i>
							</label>
						</div>
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