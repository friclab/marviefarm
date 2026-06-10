<?php
/* Suppliers Test cases generated on: 2011-02-10 00:39:58 : 1297294798*/
App::import('Controller', 'Suppliers');

class TestSuppliersController extends SuppliersController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class SuppliersControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.supplier', 'app.material', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Suppliers =& new TestSuppliersController();
		$this->Suppliers->constructClasses();
	}

	function endTest() {
		unset($this->Suppliers);
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