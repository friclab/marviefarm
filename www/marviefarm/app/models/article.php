<?php
class Article extends AppModel {
	var $name = 'Article';
	//var $displayField = 'name';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";

	var $typeCheck = true;
	
	var $order = "Article.name";

	var $validate = array(
        'image' => array(
            'typeCheck' => array(
                'rule' => array( 'matchesTypeCheck'), // second value of array should match class member-name above
                'message' => "Only JPG accepted."
                )
                )
                );

                function matchesTypeCheck( $data  )           {                	 
                	if (!empty($this->typeCheck) && !in_array($this->typeCheck, array('image/jpeg','image/pjpeg'))){
                		    		return  false;;
                	}
                	return true;
                }

                function setTypeCheck( $type )      {  
                	$this->typeCheck = $type;
                	 
                }


                var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('name','description'),
        'pattern' => '%s - %s'
        ));

        var $belongsTo = array(
		'ModeltypesSex' => array(
			'className' => 'ModeltypesSex',
			'foreignKey' => 'modeltypes_sex_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
			)
			);

			var $hasMany = array(
		'Orderdetail' => array(
			'className' => 'Orderdetail',
			'foreignKey' => 'article_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
			),
			'Fabric' => array(
			'className' => 'Fabric',
			'foreignKey' => 'article_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
			),
			);


			var $hasAndBelongsToMany = array(
	/* 	'Fabric' => array(
			'className' => 'Fabric',
			'joinTable' => 'articles_fabrics',
			'foreignKey' => 'article_id',
			'associationForeignKey' => 'fabric_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
			),*/
		'Project' => array(
			'className' => 'Project',
			'joinTable' => 'articles_projects',
			'foreignKey' => 'article_id',
			'associationForeignKey' => 'project_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
			)
			);


}
?>