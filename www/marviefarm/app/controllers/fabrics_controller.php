<?php
class FabricsController extends AppController {

	var $name = 'Fabrics';

	var $uses = array('Fabric', 'Xcost','Xquery');


	function index() {
		$this->Fabric->recursive = 0;
		$this->set('fabrics', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid fabric', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('fabric', $this->Fabric->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Fabric->create();
			if ($this->Fabric->save($this->data)) {
				$this->Session->setFlash(__('The fabric has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fabric could not be saved. Please, try again.', true));
			}
		}
		$fixedcompositions = $this->Fabric->Fixedcomposition->find('list');
		$dynamiccompositions = $this->Fabric->Dynamiccomposition->find('list');
		$articles = $this->Fabric->Article->find('list');
		$this->set(compact('fixedcompositions', 'dynamiccompositions', 'articles'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid fabric', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Fabric->save($this->data)) {
				$this->Session->setFlash(__('The fabric has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fabric could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Fabric->read(null, $id);
		}
		$fixedcompositions = $this->Fabric->Fixedcomposition->find('list');
		$dynamiccompositions = $this->Fabric->Dynamiccomposition->find('list');
		$articles = $this->Fabric->Article->find('list');
		$this->set(compact('fixedcompositions', 'dynamiccompositions', 'articles'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for fabric', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Fabric->delete($id)) {
			$this->Session->setFlash(__('Fabric deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Fabric was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}

	function calculateCost()      {

		if (!empty($this->data)) {
			//var_dump($this->data);
			$multiplier = $this->data['Fabric']['multiply'];
			$showDetails = $this->data['Fabric']['show_details'];
			Configure::write('debug',0); // Otherwise we cannot use this method while developing

			$query = $this->Xcost->query("
		select art_name, art_desc, var_code, var_desc, compo, compo_id, mat_code, mat_desc, qta, price, um, cost  FROM 
(SELECT
     a.name as art_name ,a.description as art_desc,
    f.code as var_code ,f.description as var_desc,
    mf.code as mat_code, mf.description as mat_desc, 'F' as compo,fcm.id as compo_id, fcm.qta  , mf.price, um.code as um, mf.price*fcm.qta as cost
FROM
    articles a, 
    fabrics f,
    fixedcompositions_materials fcm, 
    materials mf,
    unitmeasurements um
where 
a.id =     f.article_id
and f.fixedcomposition_id = fcm.fixedcomposition_id  
and fcm.material_id = mf.id
and mf.unitmeasurement_id = um.id
UNION ALL
SELECT
   a.name as art_name ,a.description as art_desc,
    f.code as var_code ,f.description as var_desc,
    md.code as mat_code , md.description as mat_desc, 'D' as compo, dcm.id as compo_id, dcm.qta, md.price, um.code as um, md.price*dcm.qta as cost
FROM
    articles a, 
    fabrics f, 
    dynamiccompositions_materials dcm, 
    materials md,
    unitmeasurements um
where 
a.id =f.article_id 
and f.dynamiccomposition_id =  dcm.dynamiccomposition_id
and dcm.material_id = md.id 
and md.unitmeasurement_id = um.id
)tt

order by art_name, var_code, compo DESC, compo_id
			
			");

			$costs = array();
			foreach($query as $i=>$item){
				$compo = array(
					'compo'=>$item['tt']['compo'],
					'compo_id'=>$item['tt']['compo_id'],
					'mat_code'=>$item['tt']['mat_code'],
				 						 	'mat_desc'=>$item['tt']['mat_desc'],
											'qta'=>$item['tt']['qta'],
											'price'=>$item['tt']['price'],
											'um'=>$item['tt']['um'],
											'cost'=>$item['tt']['cost']
					
				);

				$costs[$item['tt']['art_name'].' - '.$item['tt']['art_desc']][$item['tt']['var_code'].' - '.$item['tt']['var_desc']][]=$compo;

			}


			//var_dump($costs);
			$this->set('costs',$costs);
			$this->set('showDetails',$showDetails);

			$this->set('multiplier',$multiplier);

			//$this->set('filename','costX'.$multiplier.'.pdf');
			//$this->layout = 'pdf';
			//$this->render('calculate_cost_pdf','pdf');

			$this->set('file', array('name'=>'costX'.$multiplier.'.csv' , 'type'=>'text/plain'));
			$this->layout = 'file';
			$this->render('calculate_cost_txt','file');
		}
	}



	function articlesList()      {

		Configure::write('debug',0); // Otherwise we cannot use this method while developing

		$query = $this->Xquery->query("
SELECT
    a.name        AS item ,
    f.code        AS fabric_code,
    f.description AS fabric_description,
    a.id          AS id,
    f.price,
    p.name,
    s.code as sex
FROM
    articles a,
    fabrics f,
    projects p,
    articles_projects ap,
    modeltypes_sexes mts,
    sexes s
WHERE
    1=1
AND mts.id = a.modeltypes_sex_id
AND a. id = f.article_id
AND a.id = ap.article_id
AND ap.project_id = p.id
AND mts.sex_id = s.id
ORDER BY
    p.name ,
    a.name ,
    f.code
			");

		
		$articles= array();
		foreach($query as $i=>$item){
			 
			$vars = array(
					'fab_code'=>$item['f']['fabric_code'],
					'fab_desc'=>$item['f']['fabric_description'],
					'price'=>$item['f']['price']				
			);

			$articles[$item['p']['name']][$item['a']['id']]['vars'][]=$vars;
			$articles[$item['p']['name']][$item['a']['id']]['name']=$item['a']['item'];
			$articles[$item['p']['name']][$item['a']['id']]['sex']=$item['s']['sex'];

		} 

		//var_dump($costs);
		$this->set('articles',$articles);  

		$this->set('filename', 'articles_list.pdf');
		$this->layout = 'pdf';
		$this->render('articles_list_pdf','pdf');
	}



}
?>