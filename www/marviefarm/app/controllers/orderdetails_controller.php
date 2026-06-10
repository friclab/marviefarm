<?php
class OrderdetailsController extends AppController {

	var $name = 'Orderdetails';

	var $helpers = array('Js' => array('Jquery'));

	function index() {
		$this->Orderdetail->recursive = 0;
		$this->set('orderdetails', $this->paginate());
	}


	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid orderdetail', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('orderdetail', $this->Orderdetail->read(null, $id));
	}

	function add2() {  
		if (!empty($this->data)) {

			$this->Orderdetail->begin();
			$saved=true;
			
			foreach($this->params['form'] as $name=>$value){

				if(preg_match('/qta_(\d+)$/', $name, $matches)){
					if($value>0){
						$this->data['Orderdetail']['modeltypessexessize_id']=$matches[1];
						$this->data['Orderdetail']['qta']=$value;
						$this->Orderdetail->create();
						if ($this->Orderdetail->save($this->data)) {

						} else {
							$this->Session->setFlash(__('The orderdetail could not be saved. Please, try again.', true));
							$this->Orderdetail->rollback();
							$saved=false;
							break;
						}
					}
				}
			}
			if($saved){
				$this->Orderdetail->commit();
				$this->redirect(array('controller' => 'orderheaders', 'action' => 'view' ,$this->data['Orderdetail']['orderheader_id']) );;
				
			}
		}
		if(!empty($this->params['named']) && $this->params['named']['id']){
			$orderheaders = $this->Orderdetail->Orderheader->find('list', array('fields'=>array('Orderheader.id'), 'conditions' => array('Orderheader.id' => $this->params['named']['id'])));
		}else{
			$orderheaders = $this->Orderdetail->Orderheader->find('list');
		}
		//TODO: modificare per vare progetto nella select list
		$articles = $this->Orderdetail->Article->find('list',array('order'=>array('Article.name')));
		$fabrics = array();
		//$this->Orderdetail->Fabric->find('list');

		$modeltypessexesSizes=array();

		$this->set(compact('orderheaders', 'articles', 'fabrics', 'modeltypessexesSizes'));

	}

	function edit($id = null) {
		$this->Orderdetail->recursive = 1;
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid orderdetail', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			 
			if ($this->Orderdetail->save($this->data)) {
				$this->Session->setFlash(__('The orderdetail has been saved', true));
				//$this->redirect(array('action' => 'index'));
				$this->redirect(array('controller' => 'orderheaders', 'action' => 'view' ,$this->data['Orderdetail']['orderheader_id']) );;
			} else {
				$this->Session->setFlash(__('The orderdetail could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Orderdetail->read(null, $id);
		}
		$orderheaders = $this->Orderdetail->Orderheader->find('list');
		//TODO: modificare per vare progetto nella select list
		$articles = $this->Orderdetail->Article->find('list',array('order'=>array('Article.name')));
		$fabrics = $this->Orderdetail->Fabric->find('list');			 		
		$article_id = $this->data['Orderdetail']['article_id'];		
		$modeltypessexesSizesOptions = $this->Orderdetail->ModeltypessexesSize->find('all',array(
				'conditions'=>array('Articles.id'=>$article_id),
				'joins' => array(
						array(
								'table' => 'modeltypes_sexes',
								'alias' => 'ModeltypesSexz',
								'type' => 'inner',
								'foreignKey' => false,
								'conditions'=> array('ModeltypesSexz.id = ModeltypessexesSize.modeltypessex_id')
						),
						array(
								'table' => 'articles',
								'alias' => 'Articles',
								'type' => 'inner',
								'foreignKey' => false,
								'conditions'=> array('ModeltypesSexz.id = Articles.modeltypes_sex_id')
						),
						array(
								'table' => 'sexes',
								'alias' => 'Sexes',
								'type' => 'inner',
								'foreignKey' => false,
								'conditions'=> array('Sexes.id = ModeltypesSexz.sex_id')
						),
						array(
								'table' => 'sizes',
								'alias' => 'Sizes',
								'type' => 'inner',
								'foreignKey' => false,
								'conditions'=> array('Sizes.id = ModeltypessexesSize.size_id')
						)
				),
		
				'fields' => array('ModeltypessexesSize.id', 'Sizes.code'),
				'order' => array('Sizes.code'),
		));
		$modeltypessexessizes = array();
		foreach ($modeltypessexesSizesOptions as $k => $v){
			$modeltypessexessizes[$v['ModeltypessexesSize']['id']]=$v['Sizes']['code'];
		} 
		$this->set(compact('orderheaders', 'articles', 'fabrics', 'modeltypessexessizes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for orderdetail', true));
			$this->redirect(array('action'=>'index'));
		}
		$orderDetail = $this->Orderdetail->read(null, $id);

		$orderheaderId= $orderDetail['Orderdetail']['orderheader_id'];

		if ($this->Orderdetail->delete($id)) {
			$this->Session->setFlash(__('Orderdetail deleted', true));
			$this->redirect(array('controller' => 'orderheaders', 'action' => 'view' ,$orderheaderId) );;
		}
		$this->Session->setFlash(__('Orderdetail was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}


	function getFabricOptions() {
		$this->layout="ajax";
		$article_id = $this->data['Orderdetail']['article_id'];

		$fabricOptions = $this->Orderdetail->Fabric->find('all',array(
		'conditions'=>array('Article.id'=>$article_id),
		/*	'joins' => array(

		array(
		'table' => 'articles',
		'alias' => 'Articles',
		'type' => 'inner',
		'foreignKey' => false,
		'conditions'=> array('Fabric.article_id = Articles.id')
		),

		),*/

		'fields' => array('Fabric.id', 'Fabric.code','Fabric.description','Fabric.price'), 
		'order' => array('Fabric.code'), 
		));
		$options = array();
		foreach ($fabricOptions as $k => $v){
			$options[$v['Fabric']['id']]=$v['Fabric']['code'].' - '.$v['Fabric']['description'].' (€: '.number_format($v['Fabric']['price'],2).')';
		}
			
		$this->set('options',$options);
	}

	function getModeltypessexessizeOptions2() {
		$this->getModeltypessexessizeOptions();
	}

	function getModeltypessexessizeOptions() {
		$this->layout="ajax";
		$article_id = $this->data['Orderdetail']['article_id'];

		$modeltypessexesSizesOptions = $this->Orderdetail->ModeltypessexesSize->find('all',array(
		'conditions'=>array('Articles.id'=>$article_id),
		'joins' => array(
		array(
											            'table' => 'modeltypes_sexes',
											            'alias' => 'ModeltypesSexz',
											            'type' => 'inner',
											            'foreignKey' => false,
											            'conditions'=> array('ModeltypesSexz.id = ModeltypessexesSize.modeltypessex_id')
		),
		array(
											            'table' => 'articles',
											            'alias' => 'Articles',
											            'type' => 'inner',
											            'foreignKey' => false,
											            'conditions'=> array('ModeltypesSexz.id = Articles.modeltypes_sex_id')
		),
		array(
											            'table' => 'sexes',
											            'alias' => 'Sexes',
											            'type' => 'inner',
											            'foreignKey' => false,
											            'conditions'=> array('Sexes.id = ModeltypesSexz.sex_id')
		),
		array(
											            'table' => 'sizes',
											            'alias' => 'Sizes',
											            'type' => 'inner',
											            'foreignKey' => false,
											            'conditions'=> array('Sizes.id = ModeltypessexesSize.size_id')
		)
		),

		'fields' => array('ModeltypessexesSize.id', 'Sizes.code'), 
		'order' => array('Sizes.code'), 
		));
		$options = array();
		foreach ($modeltypessexesSizesOptions as $k => $v){
			$options[$v['ModeltypessexesSize']['id']]=$v['Sizes']['code'];
		}
		$this->set('options',$options);
	}


	function getArticleInfo(){
		$this->layout="ajax";
		$article_id = $this->data['Orderdetail']['article_id'];

		$info = $this->Orderdetail->query("SELECT
   p.name,
   s.code,
   a.description
FROM
    modeltypes_sexes ms,
    articles a,
    modeltypes mt ,
    sexes s,
    projects p,
    articles_projects ap
WHERE
    a.modeltypes_sex_id = ms.id
AND ms.sex_id = s.id
AND ms.modeltype_id = mt.id
and a.id = ap.article_id
and ap.project_id = p.id and a.id=".$article_id);
                if(!empty($info)){
		$info = '<span>Project: '.$info[0]['p']['name'].
		' - Sex: '.$info[0]['s']['code'].' - Description: '.$info[0]['a']['description'].'</span>';
                }
		$this->set('info', $info);
	}
}
?>