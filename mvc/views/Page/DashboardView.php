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
      $data_list3 = json_decode($data['data3']);
      function vndCurrency($value)
      {
        return number_format($value,0,'.',',').' &#8363';
      }
      // echo "<pre>";
      // print_r($data_list);
      // echo "</pre>";
      
      $receipt = isset($data_list[0]->receipt) ? $data_list[0]->receipt : 0 ;
      $expenditure = isset($data_list[0]->expenditure) ? $data_list[0]->expenditure : 0;

      $lastmonth_receipt = isset($data_list[0]->lastmonth_receipt) ? $data_list[0]->lastmonth_receipt : 1;
      $lastmonth_expenditure = isset($data_list[0]->lastmonth_expenditure) ? $data_list[0]->lastmonth_expenditure : 1;

      $receipt_diff = abs(round($receipt/$lastmonth_receipt*100,2)-100);
      $expenditure_diff = abs(round($expenditure/$lastmonth_expenditure*100,2)-100);
      $saving_deposit = vndCurrency($data_list[0]->saving_deposit);
      $wallet_balance = vndCurrency($data_list3[0]->wallet_balance);

     

      $receipt >= $lastmonth_receipt ? $receipt_index='up' : $receipt_index='down';
      $expenditure>= $lastmonth_expenditure ? $expenditure_index='up' : $expenditure_index='down';
      
      ?> 
      <div class="dashboard__content">
       <div class="layout__content">
        <div class="layout__content-left">
         <h3 class="layout__content-left-title">Total Sales</h3>
         <h2 class="layout__content-left-number"><?php echo vndCurrency($receipt); ?></h2>
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
     <h2 class="layout__content-left-number"><?php echo vndCurrency($expenditure); ?></h2>
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
   <h2 class="layout__content-left-number"><?php echo $wallet_balance; ?></h2>
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
  <div class="layout__chart-title">
    <h2>Total Transactions</h2>
      <anchor class="table__body-dropdown chart-box">
        <div class="table__body-dropdown input-box input-chart"></div>
        <div class="table__body-dropdown option-list option-year-list">
          <!-- List of Year -->
        </div>  
        <template id="list-of-year">
          <input class="year-list" type="radio" name="year" id="y3">
          <label for="y3">2023</label>
        </template>
      </anchor>
  </div>
  
  
  <div class="layout__chart-index">
    <canvas id="myChart"></canvas>
  </div>
</div>
<div class="layout__content layout__chart">	
  <div class="layout__chart-header">
    <h2 class="layout__chart-title mini-chart">Most Expensive Transaction </h2>
    <label class="btn_toggle">
      <input type="checkbox" id="checkboxType">
      <span class="btn_toggle-slider"></span>
    </label>
  </div>
  <div class="layout__chart-items">
    <?php 
    if(!empty($data_list2)){
        for ($i=0; $i <count($data_list2) ; $i++) { 
          $color=["#6259ca","#09ad95","#f7b731","#f82649","#45aaf2"];
          echo '<div class="layout__chart-item">';
          echo '<div class="layout__chart-item-label">';
          echo '<div class="layout__chart-name">'.$data_list2[$i]->tran_name.'</div>';
          echo '<div class="layout__chart-percent-index">'.($data_list2[$i]->percent*100).'%</div>';
          echo '</div>';
          echo '<div class="layout__chart-item-chart_background tooltip">';
          echo '<span class ="tooltiptext">'.vndCurrency($data_list2[$i]->largest_amount).'</span>';
          echo '<div class="layout__chart-item-index" style="--percent:'.($data_list2[$i]->percent*100).'%;--chart__color:'.$color[$i].'"></div>';
          echo '</div>';
          echo '</div>';
        }
      } else {
        echo "<p>Hi Admin, Have a good month ^_^ !</p>";
      }
    ?>
  </div>
  <template id="chart-item">
    <div class="layout__chart-item">
      <div class="layout__chart-item-label">
        <div class="layout__chart-name">Salary</div>
        <div class="layout__chart-percent-index">60%</div>
      </div>
      <div class="layout__chart-item-chart_background">
        <div class="layout__chart-item-index" style="--percent:70%;--chart__color:#6259ca"></div>
      </div>
    </div>
  </template>
  <div class="loader"></div>
</div>
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