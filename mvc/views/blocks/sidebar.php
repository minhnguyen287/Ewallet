<div class="sidebar">
	<ul class="categories">
		<li class="categories__list"><h2>MAIN</h2>
			<ul class="categories__list-menu">
				<li class="categories__list-menu-item">
					<a href="/ewallet/" class= <?php echo '"categories__link '; echo isset($data["Dhighlight"])?'list__item-active"':'"'; ?> >
						<i class="fa-solid fa-house fa-sm categories__list-icon"></i>Dashboard 
					</a> 
				</li>
			</ul>
		</li>
		<li class="categories__list">ADDITIONAL
			<ul class="categories__list-menu">
				<li class="categories__list-menu-item">
					<a href="/ewallet/Oil" class=<?php echo '"categories__link '; echo isset($data["Ohighlight"])?'list__item-active"':'"'; ?> >
						<i class="fa-solid fa-oil-can fa-sm categories__list-icon"></i>Oil Change History
					</a> 
				</li>
				<li class="categories__list-menu-item">
					<input type="checkbox" class="categories__list-show-hide" id="categories__list-show-hide-2nd">
					<label for="categories__list-show-hide-2nd" class=<?php echo '"categories__label '; echo isset($data["Whighlight"])?'list__item-active"':'"'; ?> >
						<i class="bx bxs-wallet-alt categories__list-icon"></i>My Wallet
						<div class="categories__list-submenu">
							<i class="fa-solid fa-chevron-right show__submenu"></i>
							<i class="fa-solid fa-chevron-down hide__submenu"></i>
						</div>
					</label>
					<ul class="component__submenu">
						<li class="component__submenu-list">
							<a href="/ewallet/Wallet/Category" class="component__submenu-list-link">Category</a>
						</li>
						<li class="component__submenu-list">
							<a href="/ewallet/Wallet/Transaction" class="component__submenu-list-link">Transaction</a>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</div>
