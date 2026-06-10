<?php
/* ArticlesFabric Test cases generated on: 2011-02-10 00:10:47 : 1297293047*/
App::import('Model', 'ArticlesFabric');

class ArticlesFabricTestCase extends CakeTestCase {
	var $fixtures = array('app.articles_fabric', 'app.fabric', 'app.article', 'app.modeltypes_sex', 'app.orderdetail', 'app.project', 'app.articles_project');

	function startTest() {
		$this->ArticlesFabric =& ClassRegistry::init('ArticlesFabric');
	}

	function endTest() {
		unset($this->ArticlesFabric);
		ClassRegistry::flush();
	}

}
?>