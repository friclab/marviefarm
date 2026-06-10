<?php
/* Dynamiccompositions Test cases generated on: 2011-02-10 00:38:22 : 1297294702*/
App::import('Controller', 'Dynamiccompositions');

class TestDynamiccompositionsController extends DynamiccompositionsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class DynamiccompositionsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->Dynamiccompositions =& new TestDynamiccompositionsController();
		$this->Dynamiccompositions->constructClasses();
	}

	function endTest() {
		unset($this->Dynamiccompositions);
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