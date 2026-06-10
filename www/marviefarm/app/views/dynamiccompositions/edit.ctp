<div class="dynamiccompositions form">
<?php echo $this->Form->create('Dynamiccomposition');?>
	<fieldset>
 		<legend><?php __('Edit Dynamiccomposition'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('description');
		echo $this->Form->input('Material');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Dynamiccomposition.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Dynamiccomposition.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>