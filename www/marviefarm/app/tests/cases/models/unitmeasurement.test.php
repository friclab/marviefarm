<?php
/* Unitmeasurement Test cases generated on: 2011-02-10 00:31:39 : 1297294299*/
App::import('Model', 'Unitmeasurement');

class UnitmeasurementTestCase extends CakeTestCase {
	var $fixtures = array('app.unitmeasurement', 'app.material', 'app.supplier', 'app.materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Unitmeasurement =& ClassRegistry::init('Unitmeasurement');
	}

	function endTest() {
		unset($this->Unitmeasurement);
		ClassRegistry::flush();
	}

}
?>