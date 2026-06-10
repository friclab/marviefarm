<?php
/* Article Test cases generated on: 2011-02-10 00:09:57 : 1297292997*/
App::import('Model', 'Article');

class ArticleTestCase extends CakeTestCase {
	var $fixtures = array('app.article', 'app.modeltypes_sex', 'app.orderdetail', 'app.fabric', 'app.articles_fabric', 'app.project', 'app.articles_project');

	function startTest() {
		$this->Article =& ClassRegistry::init('Article');
	}

	function endTest() {
		unset($this->Article);
		ClassRegistry::flush();
	}

}
?>