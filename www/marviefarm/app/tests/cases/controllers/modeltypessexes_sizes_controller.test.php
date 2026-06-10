<?php
/* ModeltypessexesSizes Test cases generated on: 2011-02-10 00:39:34 : 1297294774*/
App::import('Controller', 'ModeltypessexesSizes');

class TestModeltypessexesSizesController extends ModeltypessexesSizesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ModeltypessexesSizesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltypessexes_size', 'app.size', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.article', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.articles_project', 'app.collections_project', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric');

	function startTest() {
		$this->ModeltypessexesSizes =& new TestModeltypessexesSizesController();
		$this->ModeltypessexesSizes->constructClasses();
	}

	function endTest() {
		unset($this->ModeltypessexesSizes);
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