<?php
class ArticlesController extends AppController {

var $helpers = array('Html', 'Javascript'); 


	var $name = 'Articles';

	function beforeFilter() {
		$this->Auth->allow('show');
	}
 

	function index() {
		$this->Article->recursive = 0;
		$this->set('articles', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid article', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('article', $this->Article->read(null, $id));
	}

	function add() {

		if (!empty($this->data)) {
			$this->Article->create();
			if (is_uploaded_file($this->data['Article']['image']['tmp_name'])) {
				$this->Article->setTypeCheck( $this->data['Article']['image']['type'] );
					
					
				$fileData = fread(fopen($this->data['Article']['image']['tmp_name'], "r"),
				$this->data['Article']['image']['size']);
				$this->data['Article']['image']=$fileData;
			}else{
				$this->data['Article']['image']=null;
			}
			if ($this->Article->save($this->data)) {
				$this->Session->setFlash(__('The article has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The article could not be saved. Please, try again.', true));
				$validationErrors = $this->Article->invalidFields();
				if(!empty($validationErrors) && count($validationErrors)>0){
					$this->Session->setFlash(print_r($validationErrors,true));
				}

			}
		}
		$modeltypesSexesOptions = $this->Article->ModeltypesSex->find('all',array( 'recursive'=>0));
		$modeltypesSexes=array();
		foreach ($modeltypesSexesOptions as $mtsId=>$mtsContent){
			$modelTypeCode=$mtsContent['Modeltype']['code'];
			$sexCode=$mtsContent['Sex']['code'];
			$modeltypesSexes[$mtsContent['ModeltypesSex']['id']]=$modelTypeCode.' - '.$sexCode;
		}

		$fabrics = $this->Article->Fabric->find('list');
		$projects = $this->Article->Project->find('list');
			
		$this->set(compact( 'fabrics', 'projects','modeltypesSexes'));


	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid article', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {

			if (is_uploaded_file($this->data['Article']['image']['tmp_name'])) {
				$this->Article->setTypeCheck( $this->data['Article']['image']['type'] );
				$fileData = fread(fopen($this->data['Article']['image']['tmp_name'], "r"),
				$this->data['Article']['image']['size']);
				$this->data['Article']['image']=$this->sanitizeImage($fileData);

			}

			if ($this->Article->save($this->data)) {
				$this->Session->setFlash(__('The article has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The article could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Article->read(null, $id);
		}
		$modeltypesSexesOptions = $this->Article->ModeltypesSex->find('all',array( 'recursive'=>0));
		$modeltypesSexes=array();
		foreach ($modeltypesSexesOptions as $mtsId=>$mtsContent){
			$modelTypeCode=$mtsContent['Modeltype']['code'];
			$sexCode=$mtsContent['Sex']['code'];
			$modeltypesSexes[$mtsContent['ModeltypesSex']['id']]=$modelTypeCode.' - '.$sexCode;
		}
		$fabrics = $this->Article->Fabric->find('list');
		$projects = $this->Article->Project->find('list');
		$this->set(compact('modeltypesSexes', 'fabrics', 'projects'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for article', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Article->delete($id)) {
			$this->Session->setFlash(__('Article deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Article was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}


	function show($id) {
		//set up a variable, so the view well knwo to show it, not prompt to download
		$this->set('inpage',true);

		//in my actual controller i do some logic here to set up an array of ''allowed file ids''  but to kepp it simple, well assume everyone can see

		//IMPORTANT!  turn off debug output, will corrupt filestream.
		Configure::write('debug', 0);
		$this->Article->recursive=-1;
		$file = array();
		$item = $this->Article->findById($id);
		$file['data']=@$this->sanitizeImage($item['Article']['image']);
		$file['name']='item_'.$id.'.jpg';
		$file['type']='image/jpeg';
			
		//set the file variabl up for use in our view
		$this->set('file',$file);

		// we'll use our new layout, file,BUT well also use the same view, download
		$this->render('download','file');
	}


	function sanitizeImage($data){
		 
		$im = imagecreatefromstring($data);
		if ($im == false) {
			$data = file_get_contents('../webroot/img/not_avalaible.jpg');
		}
		return $data;
	}


}
?>