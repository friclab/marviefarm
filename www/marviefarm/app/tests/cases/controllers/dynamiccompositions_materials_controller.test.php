<?php
/* DynamiccompositionsMaterials Test cases generated on: 2011-02-10 00:38:33 : 1297294713*/
App::import('Controller', 'DynamiccompositionsMaterials');

class TestDynamiccompositionsMaterialsController extends DynamiccompositionsMaterialsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class DynamiccompositionsMaterialsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.dynamiccompositions_material', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->DynamiccompositionsMaterials =& new TestDynamiccompositionsMaterialsController();
		$this->DynamiccompositionsMaterials->constructClasses();
	}

	function endTest() {
		unset($this->DynamiccompositionsMaterials);
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