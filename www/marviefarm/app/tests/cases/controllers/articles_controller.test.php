<?php
/* Articles Test cases generated on: 2011-02-10 00:35:47 : 1297294547*/
App::import('Controller', 'Articles');

class TestArticlesController extends ArticlesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ArticlesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.articles_project', 'app.collections_project', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric');

	function startTest() {
		$this->Articles =& new TestArticlesController();
		$this->Articles->constructClasses();
	}

	function endTest() {
		unset($this->Articles);
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