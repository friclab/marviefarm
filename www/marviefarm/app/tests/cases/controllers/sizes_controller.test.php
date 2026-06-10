<?php
/* Sizes Test cases generated on: 2011-02-10 00:39:55 : 1297294795*/
App::import('Controller', 'Sizes');

class TestSizesController extends SizesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class SizesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.size', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.article', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.articles_project', 'app.collections_project', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.modeltypessexes_size');

	function startTest() {
		$this->Sizes =& new TestSizesController();
		$this->Sizes->constructClasses();
	}

	function endTest() {
		unset($this->Sizes);
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