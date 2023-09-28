<div class="container">
	<div class="header__container">
		<div class="header__container-left">
			<h2 class="header__container-left-title">My Wallet</h2>
			<span class="header__container-left-link">Home /</span> 
			<span class="header__container-left-link">My Wallet /</span>
			<span class="header__container-left-link">Category</span>
		</div>
		<div class="header__container-right">
			<button class="add__category-button">
				<i class="fa-solid fa-plus"></i> Add Category
			</button>
			<button class="changeview-button" value="list view">
				<i class="fa-solid fa-table-list"></i> <span>List View</span>
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
		<div id="list__content" style="display: none;">
			<main class="layout-content">
				<section class="layout_content table__header">
					<h2>List of My category</h2>
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
										<h2 class="table__label-text">CATEGORY TYPE</h2>
										<div class="table__label-icon">
											<i class="fa-solid fa-arrow-up-long"></i>
											<i class="fa-solid fa-arrow-down-long"></i>
										</div>
									</td>
									<td class="table__label">
										<h2 class="table__label-text">CATEGORY NAME</h2>
										<div class="table__label-icon">
											<i class="fa-solid fa-arrow-up-long"></i>
											<i class="fa-solid fa-arrow-down-long"></i>
										</div>
									</td>
									<td class="table__label">
										<h2 class="table__label-text">ICON</h2>
									</td>
									<td class="table__label">
										<h2 class="table__label-text">ACTION</h2>
									</td>
								</tr>
							</thead>
							<tbody>
								<?php 
								$row = json_decode($data["CategoryList"]);
								for ($i=0; $i < count($row) ; $i++) {
									$row[$i]->cat_id < 10 ? $row_id = '0'.$row[$i]->cat_id : $row_id = $row[$i]->cat_id;
									echo'<tr class = "rowContent" id ="'.$row[$i]->cat_id.'">';
									echo'<td data-cell="no">'.$row_id.'.</td>';
									echo'<td data-cell="category type">'.$row[$i]->category_type.'</td>';
									echo'<td data-cell="category name"><span style="border-radius:20px;padding:10px;padding-left:20px;padding-right:20px;background:'.$row[$i]->color.'">'.$row[$i]->category_name.'</span></td>';
									echo'<td data-cell="icon"><i style="font-size:2rem;" class="fa-solid fa-'.$row[$i]->icon.' fa-sm"></i></td>';
									echo '<td data-cell="Action">
									<div class="category__table-action">
									<button class="category__table-action-edit">
									<i class="fa-solid fa-pen fa-sm"></i>
									</button>
									<button class="category__table-action-delete">
									<i class="fa-solid fa-trash fa-sm"></i>
									</button>
									</div>
									</td>';
									echo'</tr>';
								}
								?>						
							</tbody>
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
		<template id="newRow">
			<tr class="rowContent">
				<td data-cell="no">01.</td>
				<td data-cell="category type">Salary</td>
				<td data-cell="category name">
					<span style="border-radius:20px;padding:10px;padding-left:20px;padding-right:20px;
					background:#6259ca">
						Salary of FRT
					</span>
				</td>
				<td data-cell="icon">
					<i style="font-size:2rem;" class="fa-solid fa-sack-dollar fa-sm"></i>
				</td>
				<td data-cell="Action">
					<div class="oil__table-action">
						<button class="category__table-action-edit">
							<i class="fa-solid fa-pen fa-sm"></i>
						</button>
						<button class="category__table-action-delete">
							<i class="fa-solid fa-trash fa-sm"></i>
						</button>
					</div>
				</td>
			</tr>
		</template>

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
		<div class="dialog__content dialog__category">
			<div class="dialog__content-header">
				<h2 class="dialog__content-header-label">Add a new category</h2>
				<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
			</div>
			<div class="dialog__content-body">
				<form action="#" class="dialog__form-category">
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catname">Type of Category
							<span class="input_infor" id="category_type_info"></span>
						</label>
						<input class="dialog__form-category-field-input" type="text" name="cattype" id="form__add-cat_type" placeholder="Type of Category">
					</div>					
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catdesc">Category Name
							<span class="input_infor" id="category_name_info"></span>
						</label>
						<input class="dialog__form-category-field-input" type="text" name="catname" id="form__add-cat_name" placeholder="Category Name">
					</div>					
					<div class="dialog__form-category-field">
						<label class="dialog__form-category-field-label" for="catcolor">Color of Category</label>
						<input class="dialog__form-category-field-input" name="catcolor" type="color" id="form__add-cat_color" value="#45aaf2" >
					</div>	
					<div class="dialog__form-category-field">
						<?php 
							$icon_array = ["sack-dollar","money-bill-transfer","money-bill-trend-up","hand-holding-dollar","piggy-bank","file-invoice-dollar","house","lightbulb","faucet-drip","fire","earth-asia","tv","mobile-screen","utensils","bowl-rice","mug-hot","cart-shopping","gas-pump","motorcycle","screwdriver-wrench","gift","envelope","heart","skull","hand-holding-heart","capsules","briefcase-medical","hospital","tooth","gamepad","graduation-cap","handshake","person-walking-luggage","hotel","dumbbell","circle-plus"];
							for ($i=0; $i < count($icon_array) ; $i++) { 
								echo '<div class="dialog__form-category-field-icon">';
								if ($i == 0) {
									echo '<input class="dialog__form-category-field-icon-input" checked="checked" name="icon" id="icon'.$i.'" type="radio" value="'.$icon_array[$i].'">';
								} else {
									echo '<input class="dialog__form-category-field-icon-input" name="icon" id="icon'.$i.'" type="radio" value="'.$icon_array[$i].'">';
								}
								echo '<label class="dialog__form-category-field-icon-label" for="icon'.$i.'">';
								echo '<i class="fa-solid fa-'.$icon_array[$i].' fa-sm"></i>';
								echo '</label>';
								echo '</div>';
							}
						?>	
					</div>		
				</form>
			</div>
			<div class="dialog__content-footer">
				<button class="add__category-button">
					<i class="fa-solid fa-plus"></i> Add Category
				</button>
				<button class="edit__category-button" name="editCatBtn">
					<i class="fa-solid fa-pen fa-sm"></i> Update Category
				</button>
			</div>
		</div>
	</div>
	
	<div class="dialog">
		<form id="DeleteCategory" action="" method="POST">
			<div class="dialog__content">
				<div class="dialog__content-header">
					<h2 class="dialog__content-header-label">Delete category</h2>
					<a href="#" class="dialog__content-header-close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></a>
				</div>
				<div class="dialog__content-body">
					<div class="dialog__form">
						<div class="dialog__form-field">
							<span>Are you sure delete record of this category ?</span>
						</div>				
						
					</div>
				</div>
				<div class="dialog__content-footer">
					<button type="button" class="delete__category-button" name="delCatBtn">
						<i class="fa-solid fa-trash fa-sm"></i> Delete
					</button>
					<button type="button" class="cancel__action-button" name="cancelActBtn">
						<i class="fa-solid fa-ban fa-sm"></i> Cancel
					</button>
				</div>
			</div>
		</form>
	</div>