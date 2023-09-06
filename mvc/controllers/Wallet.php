<?php 
	/**
	 * 
	 */
	class Wallet extends Controller
	{
		
		function Dashboard()
		{
			$this->view("MasterLayout",[
				"Page"=>"DashboardView",
				"Dhighlight"=>true]);
		}

		function Category(){
			echo "Category";
		}

		function Transaction(){
			echo "Transaction";
		}
	}
 ?>