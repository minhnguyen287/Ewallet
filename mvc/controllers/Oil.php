<?php 
	/**
	 * 
	 */
	class Oil extends Controller
	{
		
		public function Dashboard()
		{
			//Goi model
			$oil1 = $this->model("OilModel");
			//Goi view
			$this->view("MasterLayout",[
				"Page"=>"OilView"
			]);

		}
		
	}
 ?>