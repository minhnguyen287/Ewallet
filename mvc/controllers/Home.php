<?php 
	/**
	 * 
	 */
	class Home extends Controller
	{
		//This is function call default page // function trong controller dong vai tro action o trang dia chi
		public function Dashboard()
		{
			//$dash1 = $this->model("DashboardModel");
			$this->view("MasterLayout",[
				"Page"=>"DashboardView",
				"Dhighlight"=>true]);
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