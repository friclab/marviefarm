<?php
/* Unitmeasurements Test cases generated on: 2011-02-10 00:40:02 : 1297294802*/
App::import('Controller', 'Unitmeasurements');

class TestUnitmeasurementsController extends UnitmeasurementsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class UnitmeasurementsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.unitmeasurement', 'app.material', 'app.supplier', 'app.materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Unitmeasurements =& new TestUnitmeasurementsController();
		$this->Unitmeasurements->constructClasses();
	}

	function endTest() {
		unset($this->Unitmeasurements);
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