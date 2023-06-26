<?php 
	/**
	 * 
	 */
	class App
	{	
		//http://localhost/wallet_mvc/Home/ac/1/2/2
		protected $controller = "Home";
		protected $action = "ac";
		protected $param = [];
		
		function __construct()
		{
			//Array ( [0] => Home )
			$arr = $this->UrlProcess();
			//print_r($arr);
			//Xu li controller
			if (file_exists("./mvc/controllers/".$arr[0].".php")) {
				$this->controller = $arr[0];
			}
			require_once("./mvc/controllers/".$this->controller.".php");
			
			
		}
		function UrlProcess(){
			//Home/ac/1/2/2
			if (isset($_GET["url"])) {
				return explode("/", filter_var(trim($_GET["url"],"/")));	         
			}
				
		}
	}
 ?>