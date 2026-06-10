<?php
/* Orderdetail Test cases generated on: 2011-02-10 00:28:55 : 1297294135*/
App::import('Model', 'Orderdetail');

class OrderdetailTestCase extends CakeTestCase {
	var $fixtures = array('app.orderdetail', 'app.orderheader', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.project', 'app.articles_project');

	function startTest() {
		$this->Orderdetail =& ClassRegistry::init('Orderdetail');
	}

	function endTest() {
		unset($this->Orderdetail);
		ClassRegistry::flush();
	}

}
?>