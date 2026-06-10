<?php
/* Fabrics Test cases generated on: 2011-02-10 00:38:39 : 1297294719*/
App::import('Controller', 'Fabrics');

class TestFabricsController extends FabricsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class FabricsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->Fabrics =& new TestFabricsController();
		$this->Fabrics->constructClasses();
	}

	function endTest() {
		unset($this->Fabrics);
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