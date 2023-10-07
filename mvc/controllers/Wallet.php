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
			$list = $this->WalletModel->ShowTransaction();
			$this->view("MasterLayout",["Page"=>"TransactionView",
										"TransactionList"=>$list]);
		}
	}
 ?>