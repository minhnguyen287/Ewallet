<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Mint Wallet</title>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;600&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
	<!-- <base href="/ewallet/" /> -->
	<link rel="stylesheet" href="/ewallet/public/css/reset.css">
	<link rel="stylesheet" href="/ewallet/public/css/style.css">
</head>
<body>
	<div class="wrapper">
		<header class="header">
			<div class="header__popup">Thêm bản ghi</div>
			<div class="header__logo">
				<a href="/ewallet/" class="logo__container">
					<span class="logo__container__icon"><i class="fa-solid fa-wallet fa-xl"></i></span> Mint Wallet 
				</a>
			</div>
			<nav class="header__menu">
				<ul class="header__menu-left">
					<li class="header__menu-left-item">
						<input type="checkbox" class="header__menu-left-item-checkbox" id="nav__checkbox">
						<label for="nav__checkbox" class="nav__toggle">
							<i class="fa-solid fa-bars-staggered fa-lg nav__toggle-menu"></i>
							<i class="fa-solid fa-xmark fa-lg nav__toggle-close"></i>
						</label>
						<ul class="nav__categories">
							<li class="nav__categories-list"><h2>MAIN</h2>
								<ul class="nav__categories-list-menu">
									<li class="nav__categories-list-menu-item">
										<a href="/ewallet/" class="nav__categories-link list__item-active">
											<i class="fa-solid fa-house fa-sm categories__list-icon"></i>Dashboard 
										</a> 
									</li>
								</ul>
							</li>
							<li class="nav__categories-list">ADDITIONAL
								<ul class="nav__categories-list-menu">
									<li class="nav__categories-list-menu-item">
										<a href="/ewallet/Oil" class="nav__categories-link">
											<i class="fa-solid fa-gas-pump fa-sm categories__list-icon"></i>Oil Change History
										</a> 
									</li>
									<li class="categories__list-menu-item">
										<input type="checkbox" class="categories__list-show-hide" id="categories__list-show-hide">
										<label for="categories__list-show-hide" style="color:#fff" class="categories__label">
											<i class="fa-solid fa-money-check-dollar fa-sm categories__list-icon"></i>My Wallet
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
					</li>
					<li class="header__menu-item-search">
						<input type="text" class="search__text" placeholder="Search for anything...">
						<button class="search__button">
							<span class="search__icon"><i class="fa-solid fa-magnifying-glass fa-lg"></i></span>
						</button>
					</li>
				</ul>
				<ul class="header__menu-right">
					<li class="header__menu-items">
						<input type="checkbox" class="header__menu-item-toggle" id="item__toggle">
						<label for="item__toggle" class="header__menu-item right__show">
							<i class="fa-solid fa-bars fa-lg menu__show-toggle"></i>
							<i class="fa-solid fa-chevron-up menu__hide-toggle"></i>
						</label>
						
						<ul class="header__menu-right-bars">
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-lightbulb fa-lg"></i>
								</a>
							</li>
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-minimize fa-lg"></i>
								</a>
							</li>
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-bell fa-lg"></i>
								</a>
							</li>
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-message fa-lg"></i>
								</a>
							</li>
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-user-tie fa-lg"></i>
								</a>
							</li>
							<li class="header__menu-item">
								<a href="#" class="header__menu-link">
									<i class="fa-solid fa-gear fa-lg"></i>
								</a>
							</li>
						</ul>	
						
					</li>
				</ul>
			</nav>
		</header>