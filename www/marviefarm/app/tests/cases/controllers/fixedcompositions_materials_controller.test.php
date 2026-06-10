<?php
/* FixedcompositionsMaterials Test cases generated on: 2011-02-10 00:38:49 : 1297294729*/
App::import('Controller', 'FixedcompositionsMaterials');

class TestFixedcompositionsMaterialsController extends FixedcompositionsMaterialsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class FixedcompositionsMaterialsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.fixedcompositions_material', 'app.fixedcomposition', 'app.fabric', 'app.dynamiccomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->FixedcompositionsMaterials =& new TestFixedcompositionsMaterialsController();
		$this->FixedcompositionsMaterials->constructClasses();
	}

	function endTest() {
		unset($this->FixedcompositionsMaterials);
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