<?php
/* ArticlesFabrics Test cases generated on: 2011-02-10 00:37:39 : 1297294659*/
App::import('Controller', 'ArticlesFabrics');

class TestArticlesFabricsController extends ArticlesFabricsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ArticlesFabricsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.articles_fabric', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_project', 'app.collections_project');

	function startTest() {
		$this->ArticlesFabrics =& new TestArticlesFabricsController();
		$this->ArticlesFabrics->constructClasses();
	}

	function endTest() {
		unset($this->ArticlesFabrics);
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