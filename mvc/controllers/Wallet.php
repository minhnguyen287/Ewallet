<?php 
	/**
	 * 
	 */
	class Wallet extends Controller
	{
		public function __construct()
			{
				$this->WalletModel = $this->model("WalletModel");
			}	

		public function Dashboard()
		{
			$this->view("MasterLayout",[
				"Page"=>"DashboardView",
				"Dhighlight"=>true]);
		}

		public function Category(){
			$list = $this->WalletModel->ShowLimitCategory(0,10);
			$this->view("MasterLayout",["Page"=>"CategoryView",
									   "CategoryList"=>$list]);
		}

		public function Transaction(){
			$yearInput = date("Y");
			$monthInput = date("m");
			$list = $this->WalletModel->ShowStatistical($yearInput,$monthInput);
			$this->view("MasterLayout",["Page"=>"TransactionView",
										"TransactionList"=>$list]);
		}

		public function Detail()
		{
			$param = explode('/', $_GET['url']);
			$date = $param[2];
			$list = $this->WalletModel->ShowDetailTransaction($date);
			$this->view("MasterLayout",["Page"=>"DetailView",
										"DetailList"=>$list]);
		}

	}
 ?>