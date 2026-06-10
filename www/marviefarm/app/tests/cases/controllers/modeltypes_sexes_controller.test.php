<?php
/* ModeltypesSexes Test cases generated on: 2011-02-10 00:39:28 : 1297294768*/
App::import('Controller', 'ModeltypesSexes');

class TestModeltypesSexesController extends ModeltypesSexesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ModeltypesSexesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.article', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.articles_project', 'app.collections_project', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.modeltypessexes_size', 'app.size');

	function startTest() {
		$this->ModeltypesSexes =& new TestModeltypesSexesController();
		$this->ModeltypesSexes->constructClasses();
	}

	function endTest() {
		unset($this->ModeltypesSexes);
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