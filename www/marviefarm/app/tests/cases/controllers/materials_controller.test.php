<?php
/* Materials Test cases generated on: 2011-02-10 21:22:24 : 1297369344*/
App::import('Controller', 'Materials');

class TestMaterialsController extends MaterialsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class MaterialsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.materials_materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Materials =& new TestMaterialsController();
		$this->Materials->constructClasses();
	}

	function endTest() {
		unset($this->Materials);
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