  <div class="container">
  	<div class="header__container">
  		<div class="header__container-left">
  			<h2 class="header__container-left-title">Dashboard 01</h2>
  			<span class="header__container-left-link">Home /</span> 
  			<span class="header__container-left-link">Dashboard 01</span>
  		</div>
  		<div class="header__container-right">
  			<button class="add__button">
  				<i class="fa-solid fa-plus"></i> Add Transaction
  			</button>
  			<button class="export__button">
  				<i class="fa-solid fa-file-export"></i> Export
  			</button>
  		</div>
  	</div>
  	<div class="main__content">
      <?php 
          $data_list = json_decode($data['data']);
          $data_list2 = json_decode($data['data2']);

          for ($i=0; $i<count($data_list) ; $i++) { 
            $data_list[$i]->receipt>$data_list[$i]->lastmonth_receipt ? $receipt_index='up' : $receipt_index='down';
            $data_list[$i]->expenditure>$data_list[$i]->lastmonth_expenditure ? $expenditure_index='up' : $expenditure_index='down';
            $receipt_diff = round($data_list[$i]->receipt/$data_list[$i]->lastmonth_receipt, 2)*100;
            $expenditure_diff = round($data_list[$i]->expenditure/$data_list[$i]->lastmonth_expenditure ,2)*100;
            $receipt = $data_list[$i]->receipt;
            $expenditure = $data_list[$i]->expenditure;
            $difference = number_format($data_list[$i]->receipt-$data_list[$i]->expenditure,0,'.',',').' &#8363';
            $saving_deposit = number_format($data_list[$i]->saving_deposit,0,'.',',').' &#8363';
          }
          $most = array();
          for($i=0; $i<count($data_list2);$i++){
            if ($data_list2[$i]->tran_type == 'receipt') {
                $data_list2[$i]->percent = round($data_list2[$i]->largest_amount/$receipt,4)*100;
            } else {
                $data_list2[$i]->percent = round($data_list2[$i]->largest_amount/$expenditure,4)*100;
            }    
            $most[] = (object) ['name'=>$data_list2[$i]->tran_name,
                                'percent'=>$data_list2[$i]->percent];
          }
         ?> 
  		<div class="dashboard__content">
  			<div class="layout__content">
  				<div class="layout__content-left">
  					<h3 class="layout__content-left-title">Total Sales</h3>
  					<h2 class="layout__content-left-number"><?php echo number_format($receipt,0,'.',',').' &#8363'; ?></h2>
  					<div class="layout__content-left-growth">
  						<span class="layout__content-left-growth-icon">
  							<i class="fa-solid fa-circle-chevron-<?php echo $receipt_index; ?>"></i>
  						</span>
  						<span class="layout__content-left-growth-index"><?php echo $receipt_diff; ?>%</span>
  						<span class="layout__content-left-growth-time">last month</span>
  					</div>
  				</div>
  				<div class="layout__content-right">
  					<div class="layout__content-right-icon">
  						<i class="fa-solid fa-arrow-trend-up fa-2xl"></i>
  					</div>
  				</div>
  			</div>

  			<div class="layout__content">
  				<div class="layout__content-left">
  					<h3 class="layout__content-left-title">Total Cost</h3>
  					<h2 class="layout__content-left-number"><?php echo number_format($expenditure,0,'.',',').' &#8363'; ?></h2>
  					<div class="layout__content-left-growth">
  						<span class="layout__content-left-growth-icon">
  							<i class="fa-solid fa-circle-chevron-<?php echo $expenditure_index; ?>"></i>
  						</span>
  						<span class="layout__content-left-growth-index"><?php echo $expenditure_diff; ?>%</span>
  						<span class="layout__content-left-growth-time">last month</span>
  					</div>
  				</div>
  				<div class="layout__content-right">
  					<div class="layout__content-right-icon">
              <i class="fa-solid fa-cart-shopping fa-2xl"></i>
  						<!-- <i class="fa-solid fa-rocket fa-2xl"></i> -->
  					</div>
  				</div>
  			</div>
  			<div class="layout__content">
  				<div class="layout__content-left">
  					<h3 class="layout__content-left-title">Wallet Balance</h3>
  					<h2 class="layout__content-left-number"><?php echo $difference; ?></h2>
  				</div>
  				<div class="layout__content-right">
  					<div class="layout__content-right-icon">
  						<i class="fa-solid fa-dollar-sign fa-2xl"></i>
  					</div>
  				</div>
  			</div>
  			<div class="layout__content">
  				<div class="layout__content-left">
  					<h3 class="layout__content-left-title">Savings Deposit</h3>
  					<h2 class="layout__content-left-number"><?php echo $saving_deposit; ?></h2>
  				</div>
  				<div class="layout__content-right">
  					<div class="layout__content-right-icon">
  						<i class="fa-solid fa-piggy-bank fa-2xl"></i>
  					</div>
  				</div>
  			</div>
  			<div class="layout__content layout__chart">
  				<h2 class="layout__chart-title">Total Transactions</h2>
  				<div class="layout__chart-index">
            <canvas id="myChart"></canvas>
  				</div>
  			</div>
  			<div class="layout__content layout__chart">	
  				<h2 class="layout__chart-title">Most Expensive Transaction </h2>
  				<div class="layout__chart-items">
            <?php 
              for ($i=0; $i <count($most) ; $i++) { 
                $color=["#6259ca","#09ad95","#f7b731","#f82649","#45aaf2"];
                echo '<div class="layout__chart-item">';
                echo '<div class="layout__chart-item-label">';
                echo '<div class="layout__chart-name">'.$most[$i]->name.'</div>';
                echo '<div class="layout__chart-percent-index">'.$most[$i]->percent.'%</div>';
                echo '</div>';
                echo '<div class="layout__chart-item-chart_background">';
                echo '<div class="layout__chart-item-index" style="--percent:'.$most[$i]->percent.'%;--chart__color:'.$color[$i].'"></div>';
                echo '</div>';
                echo '</div>';
              }
             ?>
  				</div>
  			</div>
  		</div>
  	</div>