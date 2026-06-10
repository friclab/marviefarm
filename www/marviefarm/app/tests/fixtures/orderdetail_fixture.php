<?php
/* Orderdetail Fixture generated on: 2011-02-10 00:28:55 : 1297294135 */
class OrderdetailFixture extends CakeTestFixture {
	var $name = 'Orderdetail';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'orderheader_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'article_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'fabric_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'modeltypessexessize_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'qta' => array('type' => 'integer', 'null' => false, 'default' => NULL),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_ord_dett_ord_dssti' => array('column' => 'orderheader_id', 'unique' => 0), 'fk_ord_dearticles' => array('column' => 'article_id', 'unique' => 0), 'fk_ord_dett_ord_testi' => array('column' => 'fabric_id', 'unique' => 0), 'fk_ord_test_mod_comp' => array('column' => 'modeltypessexessize_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'orderheader_id' => 1,
			'article_id' => 1,
			'fabric_id' => 1,
			'modeltypessexessize_id' => 1,
			'qta' => 1
		),
	);
}
?>