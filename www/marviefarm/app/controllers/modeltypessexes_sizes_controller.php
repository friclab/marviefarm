<?php
class ModeltypessexesSizesController extends AppController {

	var $name = 'ModeltypessexesSizes';

	function index() {
		
		$this->ModeltypessexesSize->recursive = 2;		
		$this->set('modeltypessexesSizes', $this->paginate()); 
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid modeltypessexes size', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('modeltypessexesSize', $this->ModeltypessexesSize->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->ModeltypessexesSize->create();
			if ($this->ModeltypessexesSize->save($this->data)) {
				$this->Session->setFlash(__('The modeltypessexes size has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltypessexes size could not be saved. Please, try again.', true));
			}
		}
		$sizes = $this->ModeltypessexesSize->Size->find('list'); 
		
		$modeltypesSexesOptions = $this->ModeltypessexesSize->ModeltypesSex->find('all'); 
		$modeltypesSexes=array();
		foreach ($modeltypesSexesOptions as $mtsId=>$mtsContent){
			$modelTypeCode=$mtsContent['Modeltype']['code'];
			$sexCode=$mtsContent['Sex']['code'];
			$modeltypesSexes[$mtsContent['ModeltypesSex']['id']]=$modelTypeCode.' - '.$sexCode;
		}  
		$this->set(compact('sizes', 'modeltypesSexes'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid modeltypessexes size', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->ModeltypessexesSize->save($this->data)) {
				$this->Session->setFlash(__('The modeltypessexes size has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltypessexes size could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->ModeltypessexesSize->read(null, $id);
		}
		
		 
		
		$sizes = $this->ModeltypessexesSize->Size->find('list');
		$modeltypesSexesOptions = $this->ModeltypessexesSize->ModeltypesSex->find('all'); 
		
		$modeltypesSexes=array();
		foreach ($modeltypesSexesOptions as $mtsId=>$mtsContent){
			$modelTypeCode=$mtsContent['Modeltype']['code'];
			$sexCode=$mtsContent['Sex']['code'];
			$modeltypesSexes[$mtsContent['ModeltypesSex']['id']]=$modelTypeCode.' - '.$sexCode;
		}  
		 
		$this->set(compact('sizes', 'modeltypesSexes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for modeltypessexes size', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->ModeltypessexesSize->delete($id)) {
			$this->Session->setFlash(__('Modeltypessexes size deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Modeltypessexes size was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>