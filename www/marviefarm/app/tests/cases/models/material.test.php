<?php
/* Material Test cases generated on: 2011-02-10 21:22:03 : 1297369323*/
App::import('Model', 'Material');

class MaterialTestCase extends CakeTestCase {
	var $fixtures = array('app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.materials_materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Material =& ClassRegistry::init('Material');
	}

	function endTest() {
		unset($this->Material);
		ClassRegistry::flush();
	}

}
?>