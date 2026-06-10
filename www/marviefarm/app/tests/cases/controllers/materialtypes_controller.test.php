<?php
/* Materialtypes Test cases generated on: 2011-02-10 21:23:46 : 1297369426*/
App::import('Controller', 'Materialtypes');

class TestMaterialtypesController extends MaterialtypesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class MaterialtypesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.materialtype', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materials_materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Materialtypes =& new TestMaterialtypesController();
		$this->Materialtypes->constructClasses();
	}

	function endTest() {
		unset($this->Materialtypes);
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