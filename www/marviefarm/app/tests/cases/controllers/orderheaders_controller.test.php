<?php
/* Orderheaders Test cases generated on: 2011-02-10 00:39:41 : 1297294781*/
App::import('Controller', 'Orderheaders');

class TestOrderheadersController extends OrderheadersController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class OrderheadersControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.orderdetail', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->Orderheaders =& new TestOrderheadersController();
		$this->Orderheaders->constructClasses();
	}

	function endTest() {
		unset($this->Orderheaders);
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