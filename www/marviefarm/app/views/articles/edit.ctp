<div class="articles form">
<?php echo $this->Form->create('Article', array('action' => 'add', 'type' => 'file'));?>
	<fieldset>
 		<legend><?php __('Edit Article'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('description');
		echo $this->Form->input('modeltypes_sex_id');
	  	
		echo $this->Html->image(array('controller'=>'articles','action'=>'show',$this->Form->value('Article.id')),
		array('title'=>'image', 'width'=>'300px'));
 
		echo $this->Form->file('image');
		//echo $this->Form->input('image');
		echo $this->Form->input('Fabric');
		echo $this->Form->input('Project');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Article.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Article.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Projects', true), array('controller' => 'projects', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Project', true), array('controller' => 'projects', 'action' => 'add')); ?> </li>
	</ul>
</div>