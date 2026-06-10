<?php
/* Orderdetails Test cases generated on: 2011-02-10 00:39:38 : 1297294778*/
App::import('Controller', 'Orderdetails');

class TestOrderdetailsController extends OrderdetailsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class OrderdetailsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->Orderdetails =& new TestOrderdetailsController();
		$this->Orderdetails->constructClasses();
	}

	function endTest() {
		unset($this->Orderdetails);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

}
?>