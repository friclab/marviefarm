<?php
/* Collection Test cases generated on: 2011-02-10 00:11:37 : 1297293097*/
App::import('Model', 'Collection');

class CollectionTestCase extends CakeTestCase {
	var $fixtures = array('app.collection', 'app.orderheader', 'app.project', 'app.collections_project');

	function startTest() {
		$this->Collection =& ClassRegistry::init('Collection');
	}

	function endTest() {
		unset($this->Collection);
		ClassRegistry::flush();
	}

}
?>