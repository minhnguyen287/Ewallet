<?php 
	/**
	 * 
	 */
	class App
	{	
		//http://localhost/Ewallet/Home/dashboard/1/2/2
		protected $controller = "Home";
		protected $action = "Dashboard";
		protected $param = [];

		
		function __construct()
		{
			//Array ( [0] => Home )
			$arr = $this->UrlProcess();
			//rint_r($arr)."<br/>";

			//Xu li controller
			if (!is_null($arr) && file_exists("./mvc/controllers/".$arr[0].".php")) {
				$this->controller = $arr[0];
				unset($arr[0]);
			}
			//echo $this->controller;
			require_once("./mvc/controllers/".$this->controller.".php");
			//Home = new Home;       khoi tao 1 doi tuong Home
			$this->controller = new $this->controller;

			
			//Xu li action
			if (isset($arr[1])) {
				if (method_exists($this->controller, $arr[1])) {
					$this->action = $arr[1];
				}
				unset($arr[1]);
			}
			//echo $this->action;
			//Xu li param
			$this->param = $arr? array_values($arr) : [];

			// echo $this->controller."<br/>";
			// echo $this->action."<br/>";
			// print_r($this->param);
			call_user_func_array([$this->controller,$this->action], $this->param);
		}
		function UrlProcess(){
			//Home/ac/1/2/2
			if (isset($_GET["url"])) {
				return explode("/", filter_var(trim($_GET["url"],"/")));	         
			}
				
		}
	}
 ?>