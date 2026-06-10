<?php
/* Fixedcompositions Test cases generated on: 2011-02-10 00:38:44 : 1297294724*/
App::import('Controller', 'Fixedcompositions');

class TestFixedcompositionsController extends FixedcompositionsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class FixedcompositionsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.fixedcomposition', 'app.fabric', 'app.dynamiccomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->Fixedcompositions =& new TestFixedcompositionsController();
		$this->Fixedcompositions->constructClasses();
	}

	function endTest() {
		unset($this->Fixedcompositions);
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