<div class="fabrics form">
<?php echo $this->Form->create('Fabric');?>
	<fieldset>
 		<legend><?php __('Edit Fabric'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('price');
		 if($this -> Session -> read("Auth.User.perm")==="admin"){	 
			  echo $this->Form->input('cost');
		 }
		echo $this->Form->input('description');
		echo $this->Form->input('fixedcomposition_id');
		echo $this->Form->input('dynamiccomposition_id');		
		echo $this->Form->input('article_id');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Fabric.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Fabric.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions', true), array('controller' => 'fixedcompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('controller' => 'dynamiccompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?> </li>
	</ul>
</div>