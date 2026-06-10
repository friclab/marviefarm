<?php
/* ModeltypesSex Fixture generated on: 2011-02-10 00:25:35 : 1297293935 */
class ModeltypesSexFixture extends CakeTestFixture {
	var $name = 'ModeltypesSex';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'modeltype_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'sex_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_mod_tip_sess_mod_tipo' => array('column' => 'modeltype_id', 'unique' => 0), 'fk_mod_tip_sess_sess' => array('column' => 'sex_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'modeltype_id' => 1,
			'sex_id' => 1
		),
	);
}
?>