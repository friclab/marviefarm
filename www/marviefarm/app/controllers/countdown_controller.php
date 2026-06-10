<?php

class CountdownController extends AppController {

    var $name = 'Countdown';
    var $uses = array('Xquery');
    var $initialQty = array(
        'je_ec' => 6.9,
        'je_bl' => 26,
        'je_gr' => 13,
        'co_li' => 9,
        'co_li_si' => 20,
        'linen' => 38,
        'co' => 41);
    var $txt_keys = array();

    public function __construct() {
        parent::__construct();
        foreach (array_keys($this->initialQty) as $k) {
            $this->txt_keys[] = substr($k, 0, strrpos($k, '_'));
        }
        //var_dump($this->txt_keys);
    }

    function initialQty() {
        return $this->initialQty;
    }

    function index() {

        $sql = "SELECT
		m.code,
		sum( od.qta*dcm.qta) as qty
		FROM
		orderdetails od,
		fabrics f,
		dynamiccompositions d,
		dynamiccompositions_materials dcm,
		materials m
		WHERE
		od.fabric_id = f.id
		AND f.dynamiccomposition_id = d.id
		AND dcm.dynamiccomposition_id = d.id
		AND m.id = dcm.material_id
		group by m.code
		";

        $rows = $this->Xquery->query($sql);

        $data = $this->initialQty;
  
            
        foreach ($rows as $k => $row) {
            $index = substr($row['m']['code'], 0, strrpos($row['m']['code'], '_'));
            
            if(array_key_exists($index, $this->initialQty)){
            $data[$index] = $data[$index] - $row[0]['qty'];
            }
        } 

        return $data;
    }

}

?>