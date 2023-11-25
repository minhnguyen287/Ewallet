<?php 
	/**
	 * 
	 */
	class Home extends Controller
	{
		public function __construct()
		{
			$this->DashboardModel = $this->model("DashboardModel");
		}
		//This is function call default page // function trong controller dong vai tro action o trang dia chi
		public function Dashboard()
		{
			$yearInput = date("Y");
			$monthInput = date("m");
			$dash1 = $this->DashboardModel->ShowDashboard($yearInput,$monthInput);
			$this->view("MasterLayout",[
				"Page"=>"DashboardView",
				"data"=>$dash1,
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