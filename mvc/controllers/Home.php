<?php 
	/**
	 * 
	 */
	class Home extends Controller
	{
		//This is function call default page
		public function Dashboard()
		{

			$dash1 = $this->model("DashboardModel");
			echo $dash1->ShowDashboard();
		}

		public function Show($a , $b)
		{

			// require_once "./mvc/models/DashboardModel.php";
			// $dash2 = new DashboardModel;
			$dash2=$this->model("DashboardModel"); // 2 dong tren duoc thay the bang dong nay
			echo $dash2->ShowTong($a,$b);
		}
		
		
	}

 ?>