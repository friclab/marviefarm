<?php
/* DynamiccompositionsMaterial Fixture generated on: 2011-02-10 00:14:04 : 1297293244 */
class DynamiccompositionsMaterialFixture extends CakeTestFixture {
	var $name = 'DynamiccompositionsMaterial';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'material_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'dynamiccomposition_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'qta' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_comp_var_mat_comp_var' => array('column' => 'material_id', 'unique' => 0), 'fksdfsdfsd' => array('column' => 'dynamiccomposition_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'material_id' => 1,
			'dynamiccomposition_id' => 1,
			'qta' => 1
		),
	);
}
?>